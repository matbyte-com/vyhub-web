<template>
  <div class="d-flex flex-grow-1 flex-column">
    <!-- Smartphone navigation -->
    <v-navigation-drawer app
                         location="bottom" v-if="$vuetify.breakpoint.smAndDown" v-model="navigationDrawer">
      <v-card-title class="pb-0 mb-0 d-block">
        {{ $t('categories') }}
        <v-divider />
      </v-card-title>
      <v-list nav>
        <transition-group enter-active-class="animate__fadeIn"
                          leave-active-class="animate__fadeOut">
          <v-list-item v-for="c in categories" :key="c.id" class="animate__animated"
                       @click="$router.push({ params: { categoryId: c.id } }); fetchPackets()">
            <v-list-item-title>
              {{ c.name }}
            </v-list-item-title>
          </v-list-item>
        </transition-group>
        <v-skeleton-loader v-if="categories == null" type="list-item@4" />
      </v-list>
    </v-navigation-drawer>
    <v-card color="primary" flat class="no-bottom-border-radius card-rounded-top"
            @click="navigationDrawer = true"
            v-if="$vuetify.breakpoint.smAndDown && selectedCategory">
      <v-card-title class="text-white">
        <div style="width: 24px"/>
        <v-spacer />
          <strong>{{ selectedCategory.name }}</strong>
        <v-spacer />
        <v-icon color="white">mdi-unfold-more-horizontal</v-icon>
      </v-card-title>
    </v-card>
    <!-- Full Size Screens -->
    <PageTitleFlat v-if="$vuetify.breakpoint.mdAndUp && selectedCategory"
                   :title="`${selectedCategory.name} ${$t('packets')}`" />
    <v-card flat class="card-rounded-bottom vh-cart-category flex-grow-1"
            :class="{ 'mt-4 card-rounded-top':!$vuetify.breakpoint.smAndDown,
            'no-top-border-radius': $vuetify.breakpoint.smAndDown }">
      <v-card-text>
        <v-tabs v-model="tab" v-if="$vuetify.breakpoint.mdAndUp">
          <v-tab v-for="c in categories" :key="c.id" class="animate__animated"
                 @click="$router.push({ params: { categoryId: c.name } }); fetchPackets();">
            {{ c.name }}
          </v-tab>
          <v-skeleton-loader v-if="!categories" type="button" />
        </v-tabs>
        <div v-if="subcategories != null" class="mt-3">
          <div v-for="(_packets, subcat) in subcategories" :key="subcat">
            <div v-if="subcat" class="d-flex align-center mt-5 mb-1">
              <h2>{{ subcat }}</h2>
              <v-divider class="ml-3" />
            </div>
            <div>
              <div v-if="$store.getters.shopConfig.packet_list_view">
                <PacketListEntry class="mt-2"
                                 :packet="packet" v-for="packet in _packets" :key="packet.id" />
              </div>
              <v-row v-else>
                <v-col cols="12" sm="6" md="6" lg="4" xl="3"
                       v-for="packet in _packets" :key="packet.id"
                       class="">
                  <PacketCard :packet="packet" />
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
        <div v-else>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="4" xl="3">
              <v-skeleton-loader type="card" />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4" xl="3">
              <v-skeleton-loader type="card" />
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import PacketCard from '@/components/ShopComponents/PacketCard.vue';
import openapiCached from '@/api/openapiCached';
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import PacketListEntry from '@/components/ShopComponents/PacketListEntry.vue';
import openapi from '../../api/openapi';

export default {
  components: { PacketListEntry, PageTitleFlat, PacketCard },
  data() {
    return {
      tab: null,
      packets: null,
      categories: null,
      navigationDrawer: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchPackets() {
      const packetsData = { category_id: this.$route.params.categoryId };
      if (this.$store.getters.address != null) {
        packetsData.country_code = this.$store.getters.address.country.code;
      }

      (await openapiCached).shop_getPackets(packetsData).then((rsp) => {
        this.packets = rsp.data;
      });
    },
    async fetchCategories() {
      (await openapi).packet_getCategories()
        .then((rsp) => {
          this.categories = rsp.data.filter((cat) => cat.enabled);
          this.tab = rsp.data.findIndex((cat) => cat.id === this.$route.params.categoryId
            || cat.name === this.$route.params.categoryId);
        });
    },
    insertCategoryIntoArray(sourceArray, index) {
      // Cool thing but currently not in use
      if (index >= sourceArray.length) { return; }
      this.categories.push(sourceArray[index]);
      setTimeout(() => {
        this.insertCategoryIntoArray(sourceArray, index + 1);
      }, 50);
    },
    fetchData() {
      this.fetchPackets();
      this.fetchCategories();
    },
  },
  computed: {
    selectedCategory() {
      if (this.categories == null) {
        return '';
      }
      let category = null;
      category = this.categories.find((cat) => cat.name === this.$route.params.categoryId);
      if (!category) {
        category = this.categories.find((cat) => cat.id === this.$route.params.categoryId);
      }
      return category;
    },
    subcategories() {
      const cats = {};
      if (this.packets == null) {
        return null;
      }

      this.packets.forEach((packet) => {
        const subcat = packet.subcategory || '';

        cats[subcat] = cats[subcat] || [];
        cats[subcat].push(packet);
      });

      const ordered_cats = Object.keys(cats).sort().reduce(
        (obj, key) => {
          const newobj = obj;
          newobj[key] = cats[key];
          return newobj;
        },
        {},
      );

      return ordered_cats;
    },
  },
};
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
}
</style>
