<script setup>
import openapi from '@/api/openapi';
import ShopService from '@/services/ShopService';
import UtilService from '@/services/UtilService';
import {ref} from "vue";
import {useDisplay} from "vuetify";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {notify} from "@kyvg/vue3-notification";
import {useI18n} from "vue-i18n";
import {useUtils} from "@/services/useUtils.js";

const display = ref(useDisplay());
const store = useStore();
const router = useRouter();
const route = useRoute();
const i18n = useI18n();
const utils = useUtils().data().utils;

const props = defineProps({
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
  noInformationIcon: {
    type: Array,
    default: () => []
  },
});

const hover = ref(false);
const loading = ref(false);

async function addToCart() {
  if (!store.getters.isLoggedIn) {
    await router.push({
      path: route.path,
      query: {
        login: 'true',
        return_url: UtilService.data().utils.getFullUrl(route.path),
        shop: true
      },
    });
    return;
  }
  // Simpler Version of Add-To-Cart
  loading.value = true;

  const data = {
    packet_id: props.packet.id,
  };

  (await openapi).shop_addPacketToCart(undefined, data).then(() => {
    loading.value = false;

    notify({
      title: i18n.t('_messages.addSuccess'),
      type: 'success',
    });
    ShopService.refreshCartPacketCount();
  }).catch((err) => {
    console.log(err);
    loading.value = false;
  });
}

</script>


<template>
  <v-card
    class="flex-column d-flex vh-packet-card"
    border
    :class="{'card-rounded': display.smAndDown}"
    height="100%"
    :color="flat ? 'transparent' : ''"
    :flat="flat"
  >
    <PacketImage
      :cover="true"
      :packet="packet"
      class="text-white img-rounded ma-1"
      style="cursor: pointer;"
      @click="$refs.detailDialog.show()"
    >
      <div
        class="d-flex flex-column"
        style="height: 100%"
        @click="$refs.detailDialog.show()"
      >
        <v-fade-transition>
          <v-row
            v-if="packet.title_in_image"
            justify="center"
            align="center"
            class="text-center ml-2 mr-2 font-weight-bold title-in-image"
            :class="display.smAndDown ? 'text-h6' : 'text-h4'"
            style="text-shadow: #000000 2px 2px 2px;"
          >
            {{ packet.title_in_image }}
          </v-row>
        </v-fade-transition>
        <div
          v-if="!small"
          class="d-flex justify-space-between pa-1 mt-auto"
        >
          <v-chip
            v-if="packet.credits != null"
            variant="flat"
          >
            <div class="d-flex align-center">
              <v-icon start>
                mdi-circle-multiple
              </v-icon>
              {{ packet.credits }}
            </div>
          </v-chip>
          <v-spacer />
          <div
            v-if="packet.price_with_discount != null
              && packet.price_with_discount.total !==
                packet.price_without_discount.total"
          >
            <v-chip
              variant="flat"
              color="green-lighten-2"
            >
              <span class="strikethrough-diagonal text-disabled">
                {{
                  utils.formatCurrency(packet.price_without_discount.total, packet.currency.code)
                }}
              </span>
            </v-chip>
            <v-chip
              variant="flat"
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
          </div>
          <v-chip
            v-else-if="packet.price_with_discount != null"
            color="green"
            variant="flat"
          >
            {{ utils.formatCurrency(packet.price_with_discount.total, packet.currency.code) }}
            <div
              v-if="packet.recurring"
              class="pl-1"
            >
              / {{ utils.formatLength(packet.active_for) }}
            </div>
          </v-chip>
        </div>
      </div>
    </PacketImage>
    <v-card-text
      class="vh-packet-card-text flex-grow-1 d-flex flex-column"
      style="width: inherit"
    >
      <div class="text-center">
        <div>
          <h6
            class="text-h6"
            style="line-height: normal"
          >
            {{ packet.title }}
          </h6>
        </div>
        <div
          v-if="packet.subtitle != null && !small"
          class="pb-1"
        >
          <div class="text-subtitle-2">
            {{ packet.subtitle }}
          </div>
        </div>
        <!-- Price when small view is activated -->
        <div
          v-if="small"
          class="text-green font-weight-bold mt-1"
        >
          <span v-if="packet.price_with_discount != null">
            {{ utils.formatCurrency(packet.price_with_discount.total, packet.currency.code) }}
            <span
              v-if="packet.recurring"
              class="pl-1"
            >
              / {{ utils.formatLength(packet.active_for) }}
            </span>
          </span>
          <span v-else-if="packet.credits">
            {{ packet.credits }} {{ store.getters.shopConfig.credits_display_title }}
          </span>
        </div>
      </div>
      <v-spacer />
      <div
        v-if="!small"
        class="d-flex mt-2"
      >
        <v-btn
          v-if="!noInformationIcon.includes(display.name)"
          size="large"
          style="width: 44px; min-width: 44px"
          class="pa-0 cta-btn"
          variant="outlined"
          @click="$refs.detailDialog.show()"
        >
          <v-icon size="x-large">
            mdi-information-slab-symbol
          </v-icon>
        </v-btn>
        <v-btn
          v-if="!packet.custom_price"
          size="large"
          :loading="loading"
          variant="flat"
          class="ml-1 flex-grow-1 cta-btn"
          color="primary"
          @click="addToCart()"
        >
          <v-icon
            start
          >
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
    </v-card-text>
    <PacketDetailDialog
      ref="detailDialog"
      :packet="packet"
    />
  </v-card>
</template>

<style>
.img-rounded {
  border-radius: 3px !important;
}
</style>
