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
            <v-hover v-slot:default="{ hover }">
              <v-card @click="$router.push({ name: 'ShopPacket', params: { packetId: packet.id }})"
                      class="flex-grow-1 flex-column d-flex">
                <v-img
                  :src="packet.image_url"
                  class="white--text"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  contain
                  max-height="300px"
                  min-height="150px">
                  <div class="d-flex flex-column" style="height: 100%">
                    <div>
                      <v-chip
                        v-if="packet.active_for != null && (!hover || packet.abstract == null ||
                    packet.abstract.length === 0)"
                        class="ma-4" style="float: right;">
                        {{ utils.formatLength(packet.active_for) }}
                        <div v-if="packet.recurring" class="pl-1">
                          <v-icon>mdi-calendar-sync</v-icon>
                        </div>
                      </v-chip>
                    </div>
                    <v-row align="center" justify="center" class="text-h4 text-center ml-2 mr-2
                           font-weight-bold"
                           style="margin-bottom: 30px; text-shadow: #000000 2px 2px 2px;"
                           v-if="packet.title_in_image
                            && (!hover || packet.abstract == null || packet.abstract.length === 0)">
                      {{ packet.title_in_image }}
                    </v-row>
                  </div>
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
                </v-img>
                <v-card-text>
                  <div>
                    <div class="text-center">
                      <div>
                        <h6 class="text-h6">
                          {{ packet.title }}
                        </h6>
                      </div>
                      <div v-if="packet.subtitle != null" class="pb-1">
                        <div class="text-subtitle-2">
                          {{ packet.subtitle }}
                        </div>
                      </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div>
                      <div class="d-flex justify-space-between">
                        <div>
                          <v-chip v-if="packet.credits != null">
                            <div class="d-flex align-center">
                              <v-icon left>mdi-circle-multiple</v-icon>
                              {{ packet.credits }}
                            </div>
                          </v-chip>
                        </div>
                        <div>
                          <div v-if="packet.price_with_discount != null
                        && packet.price_with_discount.total !==
                         packet.price_without_discount.total">
                            <v-chip
                              color="green lighten-2"
                              text-color="white"
                            >
                              <span class="strikethrough-diagonal">
                                {{ utils.formatDecimal(packet.price_without_discount.total) }}
                                {{ packet.currency.symbol }}
                              </span>
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
                                / {{ utils.formatLength(packet.active_for) }}
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
                              / {{ utils.formatLength(packet.active_for) }}
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
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '../../components/PageTitle.vue';
import openapi from '../../api/openapi';

export default {
  components: { PageTitle },
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
