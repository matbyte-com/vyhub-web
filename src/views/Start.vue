<template>
  <div>
    <v-card
      flat
      tile
      height="calc(100vh - 108px)"
      class="d-flex align-center justify-center"
    >
      <div>
        <v-progress-circular
          indeterminate
          size="50"
        />
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import { useUtils } from "@/services/useUtils";

const store = useStore();
const router = useRouter();
const route = useRoute();
const utils = useUtils().data().utils;

async function redirect() {
  if (!store.state.generalConfig) {
    await utils.getGeneralConfig();
  }
  const config = store.state.generalConfig;
  // Preserve query params (e.g. login=true / return_url) so redirecting through
  // this landing route does not drop the pending login dialog.
  const query = route.query;
  if (config?.enable_landingpage) {
    await router.replace({ name: 'Home', query });
  } else if (config?.shop_only) {
    await router.replace({ name: 'Store', query });
  } else {
    await router.replace({ name: 'News', query });
  }
}

onMounted(() => {
  redirect();
});

</script>

<style scoped>

</style>
