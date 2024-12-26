<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import UtilService from "../../services/UtilService";
import {useStore} from "vuex";
import {ref, watch} from "vue";

const router = useRouter();
const route = useRoute();
const store = useStore();

const bouncing = ref(false);

function showLoginDialog() {
  router.push({
    path: route.path,
    query: { login: 'true', return_url: UtilService.data().utils.getFullUrl(route.path) },
  });
}

watch(() => store.state.cartPacketCount, () => {
  bouncing.value = true;
  setTimeout(() => {
    bouncing.value = false;
  }, 1000);
});


</script>

<template>
  <div>
    <v-row
      style="z-index: 2; width: 100%"
      justify="center"
      class="position-absolute mt-3"
      no-gutters
    >
      <v-col
        cols="11"
        sm="11"
        md="8"
        lg="7"
        class="d-flex align-center"
      >
        <v-btn :to="{name: 'Start'}">
          <v-icon size="large">
            mdi-home
          </v-icon>
        </v-btn>
        <v-btn
          v-if="$checkProp('admin_menu')"
          class="ml-3"
          :active="false"
          :to="{name: 'Settings'}"
        >
          <v-icon>
            mdi-cog
          </v-icon>
        </v-btn>
        <v-menu
          open-on-hover
          offset="12"
        >
          <template #activator="{ props }">
            <v-btn
              v-if="$checkProp('purchase_show')"
              class="ml-3"
              v-bind="props"
            >
              <v-icon>
                mdi-view-dashboard
              </v-icon>
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item
              :to="{name: 'ShopAdmin'}"
              prepend-icon="mdi-store"
            >
              {{ $t('_shop.labels.admin') }}
            </v-list-item>
            <v-list-item
              :to="{name: 'Search'}"
              prepend-icon="mdi-magnify"
            >
              {{ $t('_pageTitle.search') }}
            </v-list-item>
            <v-list-item
              :to="{name: 'Log'}"
              prepend-icon="mdi-format-list-bulleted"
            >
              {{ $t('_pageTitle.log') }}
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer />
        <v-card
          v-if="store.getters.isLoggedIn"
          rounded
        >
          <ProfileMenu
            :tile="true"
          />
        </v-card>
        <v-btn
          v-else
          size="large"
          rounded
          style="height: 32px"
          class="login-button"
          :class="{ 'glow-effect':utils.customerJourneyActive('login') }"
          @click="showLoginDialog"
        >
          <v-icon start>
            mdi-wallet
          </v-icon>
          {{ $t("_header.labels.login") }}
        </v-btn>
        <v-btn
          v-if="store.getters.isLoggedIn"
          class="ml-3"
          :active="false"
          :to="{name: 'StoreCart'}"
        >
          <v-badge
            v-if="store.getters.cartPacketCount > 0"
            location="top right"
            offset-x="-5"
            offset-y="-5"
            color="primary"
          >
            <template #badge>
              <div
                class="animate__animated"
                style="margin-left: 1px"
                :class="{ 'animate__heartBeat': bouncing }"
              >
                {{ store.getters.cartPacketCount }}
              </div>
            </template>
            <v-icon size="large">
              mdi-cart-variant
            </v-icon>
          </v-badge>
          <v-icon
            v-else
            icon="mdi-cart-variant"
          />
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.login-button {
  border-color: rgb(var(--v-theme-primary));
  border-width: 2px;
  transition: color 0.2s;
}

.login-button:hover {
  color: rgb(var(--v-theme-primary));
}

.v-btn {
  transition: color 0.2s;
}

.v-btn:hover {
  color: rgb(var(--v-theme-primary));
}
</style>
