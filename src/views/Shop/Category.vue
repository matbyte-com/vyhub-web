<template>
  <div>
    <PageTitle icon="mdi-star" v-if="category != null" :title="category.name"></PageTitle>
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
          <v-col xl="3" lg="4" md="6" sm="6" xs="12"  v-for="packet in _packets" :key="packet.id"
                 class="d-flex align-content-space-between">
            <PacketCard :packet="packet" />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import PacketCard from '@/components/ShopComponents/PacketCard.vue';
import PageTitle from '../../components/PageTitle.vue';
import openapi from '../../api/openapi';

export default {
  components: { PacketCard, PageTitle },
  data() {
    return {
      packets: [],
      category: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      let packetsData = null;

      if (this.$store.getters.address != null) {
        packetsData = {
          category_id: this.$route.params.categoryId,
          country_code: this.$store.getters.address.country.code,
        };
      } else {
        packetsData = {
          category_id: this.$route.params.categoryId,
        };
      }

      api.shop_getPackets(packetsData)
        .then((rsp) => {
          this.packets = rsp.data;
        });

      api.packet_getCategories()
        .then((rsp) => {
          this.category = rsp.data.find((cat) => cat.id === this.$route.params.categoryId);
        });
    },
  },
  computed: {
    subcategories() {
      const cats = {};

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
