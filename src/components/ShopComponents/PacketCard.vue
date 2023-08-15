<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="flex-grow-1 flex-column d-flex vh-packet-card">
      <v-img
        :src="packet.image_url"
        @click="$emit('click', packet)"
        class="white--text"
        style="cursor: pointer;"
        max-height="300px"
        min-height="150px">
        <div class="d-flex flex-column" style="height: 100%">
          <!--
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
          </div>-->
          <v-fade-transition>
            <v-row align="center" justify="center" class="text-h4 text-center ml-2 mr-2
                           font-weight-bold"
                   style="margin-bottom: auto; margin-top: auto; text-shadow: #000000 2px 2px 2px;"
                   v-if="packet.title_in_image &&
                  (!hover || packet.abstract == null || packet.abstract.length === 0)">
              {{ packet.title_in_image }}
            </v-row>
          </v-fade-transition>
          <div class="d-flex justify-space-between pa-1 mt-auto">
            <v-chip v-if="packet.credits != null">
              <div class="d-flex align-center">
                <v-icon left>mdi-circle-multiple</v-icon>
                {{ packet.credits }}
              </div>
            </v-chip>
            <v-spacer />
            <div v-if="packet.price_with_discount != null
                        && packet.price_with_discount.total !==
                         packet.price_without_discount.total">
              <v-chip color="green lighten-2" text-color="white">
                    <span class="strikethrough-diagonal">
                      {{ utils.formatDecimal(packet.price_without_discount.total) }}
                      {{ packet.currency.symbol }}
                    </span>
              </v-chip>
              <v-chip
                class="ml-2"
                color="orange"
                text-color="white">
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
              v-else-if="packet.price_with_discount != null">
              {{ packet.price_with_discount.total
              .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
              {{ packet.currency.symbol }}
              <div v-if="packet.recurring" class="pl-1">
                / {{ utils.formatLength(packet.active_for) }}
              </div>
            </v-chip>
          </div>
        </div>
        <v-fade-transition>
          <v-overlay absolute :value="hover"
                     v-if="packet.abstract != null && packet.abstract.length > 0 && hover">
            <div
              class="d-flex transition-fast-in-fast-out v-card--reveal
                           text-h6 white--text"
              style="height: 100%;">
              <ul class="ma-2">
                <li v-for="point in packet.abstract" :key="point">{{ point }}</li>
              </ul>
            </div>
          </v-overlay>
        </v-fade-transition>
      </v-img>
      <v-card-text class="vh-packet-card-text">
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
        <div class="d-flex mt-3">
          <v-btn large style="width: 44px; min-width: 44px"
                 class="pa-0 cta-btn" @click="$emit('click', packet)" outlined>
            <v-icon large>mdi-information-slab-symbol</v-icon>
          </v-btn>
          <v-btn large :loading="loading" depressed class="ml-1 grow cta-btn" color="primary"
                 @click="addToCart()">
              <v-icon class="" left>mdi-cart</v-icon>
              {{ $t('_shop.labels.addToCart17CharsMax') }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import openapi from '@/api/openapi';
import ShopService from '@/services/ShopService';

export default {
  name: 'PacketCard',
  data() {
    return {
      hover: false,
      loading: false,
    };
  },
  props: {
    packet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async addToCart() {
      // Simpler Version of Add-To-Cart
      this.loading = true;

      const data = {
        packet_id: this.packet.id,
      };

      (await openapi).shop_addPacketToCart(undefined, data).then(() => {
        this.loading = false;

        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
        ShopService.refreshCartPacketCount();
      }).catch((err) => {
        console.log(err);
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.cta-btn{
  transition: all 0.2s ease-in-out;
}

.cta-btn:hover i{
  transform: scale(1.2);
}
</style>
