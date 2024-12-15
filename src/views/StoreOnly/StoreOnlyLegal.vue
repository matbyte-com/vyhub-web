<script setup>
import openapi from '@/api/openapi';
import {computed, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";

const content = ref('Legal');
const store = useStore();

async function fetchData() {
  (await openapi).general_getLegal().then((rsp) => {
    content.value = rsp.data;
  });
}

onBeforeMount(() => {
  fetchData();
});

const removeBranding = computed(() => {
  return store.state.generalConfig != null
    && store.state.generalConfig.remove_branding;
});
</script>

<template>
  <div>
    <PageTitleFlat
      :title="$t('legal')"
      :hide-triangle="true"
    />
    <v-card
      class="card-rounded mt-4"
      flat
    >
      <v-card-text>
        <!-- Do not remove or alter the following disclaimer.
         This is against the terms of service of VyHub.-->
        <span class="text-disabled">
          <span v-if="!removeBranding">
            This website is built using the <a
              target="_blank"
              href="https://vyhub.net"
            >VyHub</a>
            gameserver and community management system by Matbyte.
            <br>
          </span>
          The contents of this website are not managed by Matbyte UG, therefore
          Matbyte UG is not responsible for them.
        </span>
        <!-- Only the text above -->
        <div
          class="mt-2 ql-editor ck-content"
          v-html="content"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>

</style>
