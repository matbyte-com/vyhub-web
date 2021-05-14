<template>
  <div>
    <PageTitle v-if="category != null" :title="category.name"></PageTitle>
    <v-row>
      <v-col lg="3" md="6" sm="12" v-for="packet in packets" :key="packet.id" class="d-flex">
        <v-hover v-slot:default="{ hover }">
          <v-card @click="$router.push({ name: 'ShopPacket', params: { packetId: packet.id }})"
                  class="flex-grow-1">
            <v-img
              :src="packet.image_url"
              class="white--text"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <div v-if="packet.abstract != null && packet.abstract.length > 0">
                <v-expand-transition>
                  <div v-if="hover"
                       class="d-flex transition-fast-in-fast-out v-card--reveal
                       text-h6 white--text"
                       style="height: 100%;">
                    <ul class="ma-2">
                      <li v-for="point in packet.abstract" :key="point">{{ point }}</li>
                    </ul>
                  </div>
                </v-expand-transition>
              </div>
              <v-chip
                v-if="packet.active_for != null && (!hover || packet.abstract == null)"
                class="ma-4" style="float: right;">
                {{ formatLength(packet.active_for) }}
                <div v-if="packet.recurring" class="pl-1">
                  <v-icon>mdi-calendar-sync</v-icon>
                </div>
              </v-chip>
            </v-img>
            <v-card-title>
              <v-row>
                <v-col>
                  {{ packet.title }}
                </v-col>
                <v-col lg="3" class="text-right">
                  <div>
                    <div v-if="packet.price_with_discount != null
                && packet.price_with_discount.total !== packet.price_without_discount.total">
                      <v-chip
                        class="text-decoration-line-through"
                        color="green lighten-2"
                        text-color="white"
                      >
                        {{ packet.price_without_discount.total
                        .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                        {{ packet.currency.symbol }}
                      </v-chip>
                      <v-chip
                        class="ml-2"
                        color="orange"
                        text-color="white"
                      >
                        {{ packet.price_with_discount.total
                        .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                        {{ packet.currency.symbol }}
                        <div v-if="packet.recurring" class="pl-1">
                          / {{ formatLength(packet.active_for) }}
                        </div>
                      </v-chip>
                    </div>
                    <v-chip
                      color="green"
                      text-color="white"
                      v-else-if="packet.price_with_discount != null"
                    >
                      {{ packet.price_with_discount.total
                      .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                      {{ packet.currency.symbol }}
                      <div v-if="packet.recurring" class="pl-1">
                        / {{ formatLength(packet.active_for) }}
                      </div>
                    </v-chip>
                    <v-chip
                      class="l-2"
                      color="red"
                      text-color="white"
                      v-else
                    >
                      {{ $t('not_available') }}
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle v-if="packet.subtitle != null">
              {{ packet.subtitle }}
            </v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageTitle from '../../components/PageTitle.vue';
import utilService from '../../services/UtilService';
import openapi from '../../api/openapi';

export default {
  components: { PageTitle },
  data() {
    return {
      packets: [],
      category: null,
      formatLength: utilService.formatLength,
    };
  },
  beforeMount() {
    this.queryData();
  },
  methods: {
    async queryData() {
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
