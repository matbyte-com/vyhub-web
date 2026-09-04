<script setup>
import openapi from '@/api/openapi';
import {computed, onBeforeMount, ref} from "vue";
import { useVyHubStore } from '@/store';

const content = ref('Legal');
const store = useVyHubStore();

async function fetchData() {
  (await openapi).general_getLegal().then((rsp) => {
    content.value = rsp.data;
  });
}

onBeforeMount(() => {
  fetchData();
});

const removeBranding = computed(() => {
  return store.generalConfig != null
    && store.generalConfig.remove_branding;
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
            gameserver and community management system.
            <br>
          </span>
          The contents of this website are not managed by the VyHub team.
          You can report malicious behaviour to <b>abuse @at vyhub.net</b>.
        </span>
        <!-- Only the text above -->
        <!-- eslint-disable vue/no-v-html -- trusted admin/staff-authored content -->
        <div
          class="mt-2 ql-editor ck-content"
          v-html="content"
        />
        <!-- eslint-enable vue/no-v-html -->
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>

</style>
