<template>
  <v-card
    class="vh-packet-card card-rounded"
    border
    :class="{'card-rounded': $vuetify.display.smAndDown}"
    height="100%"
    :color="flat ? 'transparent' : ''"
    :flat="flat"
  >
    <v-card-text class="vh-packet-card-text">
      <v-row align="center">
        <v-col
          cols="3"
          md="3"
          lg="2"
          @click="$refs.detailDialog.show()"
        >
          <PacketImage
            :packet="packet"
            class="text-white img-rounded ma-1 cursor-pointer"
          />
        </v-col>
        <v-col
          v-if="$vuetify.display.mdAndDown"
          cols="9"
          sm="3"
          md="9"
        >
          <!-- Title and Subtitle -->
          <div
            class="flex-grow-1 cursor-pointer"
            @click="$refs.detailDialog.show()"
          >
            <div>
              <h6
                class="text-h6"
                style="line-height: normal"
              >
                {{ packet.title }}
              </h6>
            </div>
            <div v-if="packet.subtitle != null && !small">
              <div class="text-subtitle-2">
                {{ packet.subtitle }}
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          class="d-flex align-center justify-end"
        >
          <!-- Title and Subtitle -->
          <div
            v-if="$vuetify.display.lgAndUp"
            class="flex-grow-1 cursor-pointer"
            @click="$refs.detailDialog.show()"
          >
            <div>
              <h6
                class="text-h6"
                style="line-height: normal"
              >
                {{ packet.title }}
              </h6>
            </div>
            <div v-if="packet.subtitle != null && !small">
              <div class="text-subtitle-2">
                {{ packet.subtitle }}
              </div>
            </div>
          </div>
          <!-- Pricing -->
          <div class="d-flex">
            <span
              v-if="packet.price_with_discount != null
                && packet.price_with_discount.total !==
                  packet.price_without_discount.total"
            >
              <v-chip
                color="green-lighten-2"
                class="my-1"
              >
                <span class="strikethrough-diagonal text-disabled">
                  {{ utils.formatCurrency(packet.price_without_discount.total, packet.currency.code) }}
                </span>
              </v-chip>
              <v-chip
                class="ml-2"
                color="orange"
              >
                {{ utils.formatCurrency(packet.price_with_discount.total, packet.currency.code) }}
                <div
                  v-if="packet.recurring"
                  class="pl-1"
                >
                  / {{ utils.formatLength(packet.active_for) }}
                </div>
              </v-chip>
            </span>
            <v-chip
              v-else-if="packet.price_with_discount != null"
              color="green"
              class="my-1"
            >
              {{ utils.formatCurrency(packet.price_with_discount.total, packet.currency.code) }}
              <div
                v-if="packet.recurring"
                class="pl-1"
              >
                / {{ utils.formatLength(packet.active_for) }}
              </div>
            </v-chip>
            <v-chip
              v-if="packet.credits != null"
              class="my-1 ml-2"
            >
              <div class="d-flex align-center">
                <v-icon start>
                  mdi-circle-multiple
                </v-icon>
                {{ packet.credits }}
              </div>
            </v-chip>
          </div>
          <v-spacer v-if="$vuetify.display.mdAndDown" />
          <div class="d-flex">
            <!--<v-btn
              size="large"
              style="width: 44px; min-width: 44px"
              class="pa-0 cta-btn"
              variant="outlined"
              @click="$refs.detailDialog.show()"
            >
              <v-icon size="large">
                mdi-information-slab-symbol
              </v-icon>
            </v-btn>-->
            <v-btn
              v-if="!packet.custom_price"
              size="large"
              :loading="loading"
              variant="flat"
              class="ml-2 cta-btn"
              color="primary"
              @click="addToCart()"
            >
              <v-icon start>
                mdi-cart
              </v-icon>
              {{ $t('_shop.labels.addToCart13CharsMax') }}
            </v-btn>
            <v-btn
              v-else
              size="large"
              variant="flat"
              class="ml-1 flex-grow-1 cta-btn"
              color="primary"
              @click="$refs.detailDialog.show()"
            >
              <v-icon start>
                mdi-open-in-new
              </v-icon>
              {{ $t('view') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <PacketDetailDialog
      ref="detailDialog"
      :packet="packet"
    />
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';
import ShopService from '@/services/ShopService';
import UtilService from '@/services/UtilService';

export default {
  props: {
    packet: {
      type: Object,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
    disableHover: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hover: false,
      loading: false,
    };
  },
  methods: {
    async addToCart() {
      if (!this.$store.getters.isLoggedIn) {
        this.$router.push({
          path: this.$route.path,
          query: { login: 'true', return_url: UtilService.data().utils.getFullUrl(this.$route.path), shop: true },
        });
        return;
      }
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

<script setup lang="ts">
</script>

<style>
.img-rounded {
  border-radius: 3px !important;
}
</style>
