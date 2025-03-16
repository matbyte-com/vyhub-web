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

watch(route, () => {
  getHtml();
});

async function getHtml() {
  if (!store.state.navItems) return;

  // Recursive function to find a navigation item by title
  function findNavItem(navItems, title) {
    for (const item of navItems) {
      if (item.title.toLowerCase() === title) {
        return item;
      }
      if (item.sublinks && item.sublinks.length > 0) {
        const found = findNavItem(item.sublinks, title);
        if (found) return found;
      }
    }
    return null;
  }

  // Get the navigation item (including sublinks)
  const navItem = findNavItem(store.state.navItems, route.params.title.toLowerCase());

  if (!navItem || !navItem.cms_page_id) {
    html.value = "Page not found or no CMS content available.";
    return;
  }

  (await openapi).general_getCmsHtml(navItem.cms_page_id)
    .then((rsp) => {
      html.value = rsp.data;
    })
    .catch((err) => {
      html.value = `Error while fetching HTML: ${err}`;
      console.error(err);
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
