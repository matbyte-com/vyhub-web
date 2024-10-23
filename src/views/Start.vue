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
import openapiCached from '@/api/openapiCached';
import { useStore } from "vuex";
import { onMounted} from "vue";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

async function redirect() {
  if (!store.state.theme) {
    (await openapiCached).general_getTheme().then((rsp) => {
      const theme = rsp.data;
      if (theme.enable_landingpage) {
        router.replace({ name: 'Home' });
      } else {
        router.replace({ name: 'News' });
      }
    });
  } else if (store.state.theme.enable_landingpage) {
    await router.replace({ name: 'Home' });
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
