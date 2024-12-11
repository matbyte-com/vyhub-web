<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import openapi from "@/api/openapi";

const route = useRoute();
const store = useStore();
const html = ref(null);

onMounted(() => {
  document.title = route.params.title;
  getHtml();
});

watch(store.state.navItems, () => {
  getHtml();
}, {deep: true});

async function getHtml() {
  if (!store.state.navItems) return;
  const htmlId = store.state.navItems
    .find((l) => l.title.toLowerCase() === route.params.title).cms_page_id;
  (await openapi).general_getCmsHtml(htmlId).then((rsp) => { html.value = rsp.data; })
    .catch((err) => {
      html.value = `Error while fetching HTML ${err}`;
      console.log(err.data);
    });
}
</script>

<template>
  <div v-if="html">
    <v-container v-if="html.wrapper">
      <v-card class="card-rounded">
        <v-card-text>
          <span
            class="ql-editor ck-content"
            v-html="html.content"
          />
        </v-card-text>
      </v-card>
    </v-container>
    <span
      v-else
      class="ql-editor ck-content"
      v-html="html.content"
    />
  </div>
</template>
