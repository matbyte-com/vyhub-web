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
import {useRouter} from "vue-router";
import { useUtils } from "@/services/useUtils";

const store = useStore();
const router = useRouter();
const utils = useUtils().data().utils;

async function redirect() {
  if (!store.state.generalConfig) {
    await utils.getGeneralConfig();
  }
  const config = store.state.generalConfig;
  if (config?.enable_landingpage) {
    await router.replace({ name: 'Home' });
  } else if (config?.shop_only) {
    await router.replace({ name: 'Store' });
  } else {
    await router.replace({ name: 'News' });
  }
}

onMounted(() => {
  redirect();
});

</script>

<style scoped>

</style>
