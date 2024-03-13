<template>
  <v-card class="vh-packet-card card-rounded"  outlined
          :class="{'card-rounded': $vuetify.breakpoint.smAndDown}" height="100%"
          :color="flat ? 'transparent' : ''" :flat="flat">
    <v-card-text class="vh-packet-card-text">
      <v-row align="center">
        <v-col cols="12" md="3"  xl="1" @click="$refs.detailDialog.show()">
          <PacketImage :packet="packet"
                       class="white--text img-rounded ma-1"  style="cursor: pointer;">
          </PacketImage>
        </v-col>
        <v-col cols="12" md="9" xl="5" @click="$refs.detailDialog.show()"
          style="cursor: pointer">
          <div>
            <h6 class="text-h6" style="line-height: normal" >
              {{ packet.title }}
            </h6>
          </div>
          <div v-if="packet.subtitle != null && !small">
            <div class="text-subtitle-2">
              {{ packet.subtitle }}
            </div>
          </div>
        </v-col>
        <v-col cols="12" xl="3" class="text-end">
          <span v-if="packet.price_with_discount != null
                  && packet.price_with_discount.total !==
                   packet.price_without_discount.total">
            <v-chip color="green lighten-2" text-color="white" class="my-1">
              <span class="strikethrough-diagonal text--disabled">
                {{ utils.formatDecimal(packet.price_without_discount.total) }}
                {{ packet.currency.symbol }}
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
          </span>
          <v-chip
            color="green"
            text-color="white"
            class="my-1"
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
          <v-chip v-if="packet.credits != null" class="my-1 ml-2">
            <div class="d-flex align-center">
              <v-icon left>mdi-circle-multiple</v-icon>
              {{ packet.credits }}
            </div>
          </v-chip>
        </v-col>
        <v-col>
          <div class="d-flex">
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
        </v-col>
      </v-row>

    </v-card-text>
    <PacketDetailDialog ref="detailDialog" :packet="packet"/>
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';
import ShopService from '@/services/ShopService';
import PacketDetailDialog from '@/components/ShopComponents/PacketDetailDialog.vue';
import UtilService from '@/services/UtilService';
import PacketImage from '@/components/ShopComponents/PacketImage.vue';

export default {
  name: 'PacketListEntry',
  components: { PacketImage, PacketDetailDialog },
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

<style>
.img-rounded {
  border-radius: 3px !important;
}
</style>
