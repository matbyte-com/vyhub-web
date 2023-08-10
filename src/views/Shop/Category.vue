<template>
  <div>
    <v-navigation-drawer app
                         bottom v-if="$vuetify.breakpoint.smAndDown" v-model="navigationDrawer">
      <v-list nav>
        <transition-group enter-active-class="animate__fadeIn"
                          leave-active-class="animate__fadeOut">
          <v-list-item v-for="c in categories" :key="c.id" class="animate__animated"
                       :class="{ 'shop-navigation-active': c.name === selectedCategory.name }"
                       @click="$router.push({ params: { categoryId: c.id } }); fetchPackets()">
            <v-list-item-title>
              {{ c.name }}
            </v-list-item-title>
          </v-list-item>
        </transition-group>
        <v-skeleton-loader v-if="categories == null" type="list-item@4" />
      </v-list>
    </v-navigation-drawer>
    <v-card color="primary"
            class="mb-3" @click="navigationDrawer = true"
            v-if="$vuetify.breakpoint.smAndDown && selectedCategory">
      <v-card-title>
        <div style="width: 24px"/>
        <v-spacer />
        <strong>{{ selectedCategory.name }}</strong>
        <v-spacer />
        <v-icon>mdi-unfold-more-horizontal</v-icon>
      </v-card-title>
    </v-card>
    <v-row>
      <v-col cols="4" md="3" lg="3" v-if="$vuetify.breakpoint.mdAndUp">
        <v-card>
          <v-list nav>
            <transition-group enter-active-class="animate__fadeIn"
                              leave-active-class="animate__fadeOut">
              <v-list-item v-for="c in categories" :key="c.id" class="animate__animated"
                           :class="{ 'shop-navigation-active': c.name === selectedCategory.name }"
                           @click="$router.push({ params: { categoryId: c.id } }); fetchPackets()">
                <v-list-item-title>
                  {{ c.name }}
                </v-list-item-title>
              </v-list-item>
            </transition-group>
            <v-skeleton-loader v-if="categories == null" type="list-item@4" />
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <div v-if="subcategories != null">
          <div v-for="(_packets, subcat) in subcategories" :key="subcat">
            <v-row v-if="subcat">
              <v-col>
                <v-chip label color="primary" class="mt-4 text-h6">
                  <v-icon left>mdi-star</v-icon>
                  {{ subcat }}
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col xl="3" lg="4" md="6" sm="6" xs="12"
                     v-for="packet in _packets" :key="packet.id"
                     class="d-flex align-content-space-between">
                <v-fade-transition>
                  <PacketCard :packet="packet" />
                </v-fade-transition>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PacketCard from '@/components/ShopComponents/PacketCard.vue';
import openapiCached from '@/api/openapiCached';
import PageTitle from '../../components/PageTitle.vue';
import openapi from '../../api/openapi';

export default {
  components: { PacketCard },
  data() {
    return {
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
          this.categories = [];
          this.insertCategoryIntoArray(rsp.data, 0);
        });
    },
    insertCategoryIntoArray(sourceArray, index) {
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
      return this.categories.find((cat) => cat.id === this.$route.params.categoryId);
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
.shop-navigation-active {
  background-color: var(--v-primary-base);
}
</style>
