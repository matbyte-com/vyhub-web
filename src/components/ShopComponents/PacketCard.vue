<template>
  <v-card class="flex-column d-flex vh-packet-card"  outlined
          :class="{'card-rounded': $vuetify.breakpoint.smAndDown}" height="100%"
          :color="flat ? 'transparent' : ''" :flat="flat">
    <v-hover v-slot:default="{ hover }">
      <v-img :src="packet.image_url"
             @click="$refs.detailDialog.show()"
             class="white--text img-rounded ma-1" max-height="200px" style="cursor: pointer;">
        <div class="d-flex flex-column" style="height: 100%">
          <v-fade-transition>
            <v-row justify="center" align="center"
                   class="text-center ml-2 mr-2 font-weight-bold title-in-image"
                   :class="$vuetify.breakpoint.smAndDown ? 'text-h6' : 'text-h4'"
                   style="text-shadow: #000000 2px 2px 2px;"
                   v-if="packet.title_in_image &&
              (!hover || packet.abstract == null || packet.abstract.length === 0)">
              {{ packet.title_in_image }}
            </v-row>
          </v-fade-transition>
          <div class="d-flex justify-space-between pa-1 mt-auto" v-if="!small">
            <v-chip v-if="packet.credits != null">
              <div class="d-flex align-center">
                <v-icon left>mdi-circle-multiple</v-icon>
                {{ packet.credits }}
              </div>
            </v-chip>
            <v-spacer/>
            <div v-if="packet.price_with_discount != null
                    && packet.price_with_discount.total !==
                     packet.price_without_discount.total">
              <v-chip color="green lighten-2" text-color="white">
                <span class="strikethrough-diagonal text--disabled">
                  {{ utils.formatDecimal(packet.price_without_discount.total) }}
                </span>
              </v-chip>
              <v-chip
                class="ml-2"
                color="orange"
                text-color="white">
                {{
                  packet.price_with_discount.total
                    .toLocaleString(undefined, {minimumFractionDigits: 2})
                }}
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
              {{
                packet.price_with_discount.total
                  .toLocaleString(undefined, {minimumFractionDigits: 2})
              }}
              {{ packet.currency.symbol }}
              <div v-if="packet.recurring" class="pl-1">
                / {{ utils.formatLength(packet.active_for) }}
              </div>
            </v-chip>
          </div>
        </div>
        <v-fade-transition>
          <v-overlay absolute :value="hover"
                     v-if="packet.abstract != null && packet.abstract.length > 0 && hover &&
                    !disableHover">
            <div
              class="d-flex text-h6 white--text"
              style="height: 100%;">
              <ul class="ma-2">
                <li v-for="point in packet.abstract" :key="point">{{ point }}</li>
              </ul>
            </div>
          </v-overlay>
        </v-fade-transition>
      </v-img>
    </v-hover>
    <v-card-text class="vh-packet-card-text flex-grow-1 d-flex flex-column"
                 style="width: inherit">
      <div class="text-center">
        <div>
          <h6 class="text-h6" style="line-height: normal" >
            {{ packet.title }}
          </h6>
        </div>
        <div v-if="packet.subtitle != null && !small" class="pb-1">
          <div class="text-subtitle-2">
            {{ packet.subtitle }}
          </div>
        </div>
        <!-- Price when small view is activated -->
        <div v-if="small" class="green--text font-weight-bold mt-1">
        <span v-if="packet.price_with_discount != null">
          {{
            packet.price_with_discount.total
              .toLocaleString(undefined, {minimumFractionDigits: 2})
          }}
          {{ packet.currency.symbol }}
          <span v-if="packet.recurring" class="pl-1">
            / {{ utils.formatLength(packet.active_for) }}
          </span>
        </span>
          <span v-else-if="packet.credits">
          {{ packet.credits }} {{ $store.getters.shopConfig.credits_display_title }}
        </span>
        </div>
      </div>
      <v-spacer />
      <div class="d-flex mt-2" v-if="!small">
        <v-btn large style="width: 44px; min-width: 44px"
               class="pa-0 cta-btn" @click="$refs.detailDialog.show()" outlined>
          <v-icon large>mdi-information-slab-symbol</v-icon>
        </v-btn>
        <v-btn large :loading="loading" v-if="!packet.custom_price"
               depressed class="ml-1 grow cta-btn" color="primary"
               @click="addToCart()">
          <v-icon left>mdi-cart</v-icon>
          {{ $t('_shop.labels.addToCart13CharsMax') }}
        </v-btn>
        <v-btn v-else large depressed class="ml-1 grow cta-btn" color="primary"
               @click="$refs.detailDialog.show()">
          <v-icon left>mdi-open-in-new</v-icon>
          {{ $t('view') }}
        </v-btn>
      </div>
    </v-card-text>
    <PacketDetailDialog ref="detailDialog" :packet="packet"/>
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';
import ShopService from '@/services/ShopService';
import PacketDetailDialog from '@/components/ShopComponents/PacketDetailDialog.vue';

export default {
  name: 'PacketCard',
  components: { PacketDetailDialog },
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

<style>
.img-rounded {
  border-radius: 3px !important;
}
</style>
