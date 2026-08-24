<script lang="ts" setup>
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore();

const introduction = computed(() => store.state.shopConfig?.news);

const hasIntroduction = computed(() => {
  const html = introduction.value;
  if (!html) return false;
  // A cleared rich-text editor still emits markup such as "<p>&nbsp;</p>", so test for
  // renderable content rather than a non-empty string.
  if (/<(img|iframe|video|embed)\b/i.test(html)) return true;
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;|\s/g, '') !== '';
});
</script>

<template>
  <!-- News -->
  <v-card
    class="mb-2 card-rounded vh-shop-news"
  >
    <v-card-text>
      <!-- eslint-disable vue/no-v-html -- trusted admin/staff-authored content -->
      <div
        v-if="hasIntroduction"
        class="ql-editor"
        v-html="introduction"
      />
      <!-- eslint-enable vue/no-v-html -->
      <div v-else>
        {{ $t('_shop.labels.defaultIntroduction') }}
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
