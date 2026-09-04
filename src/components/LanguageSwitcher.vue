<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ISO6391 from 'iso-639-1-plus';
import i18n from '@/plugins/i18n';

const store = useStore();

function nativeName(locale) {
  // Message files use "pt_BR", the lookup table expects the BCP 47 form "pt-BR".
  const name = ISO6391.getNativeName(locale.replace('_', '-'));
  return name ? name.replace(/^./, (c) => c.toUpperCase()) : locale;
}

const locales = computed(() => i18n.global.availableLocales
  .map((locale) => ({ locale, title: nativeName(locale) }))
  .sort((a, b) => a.title.localeCompare(b.title)));

const current = computed(() => store.getters.locale
  ?? store.getters.generalConfig?.language
  ?? i18n.global.locale);

async function select(locale) {
  if (locale === current.value) return;

  await store.dispatch('setLocale', { locale });
  // Forms and route titles resolve their translations once at module load, so only a
  // reload switches the whole app over.
  window.location.reload();
}
</script>

<template>
  <v-menu location="top">
    <template #activator="{ props }">
      <v-btn
        variant="text"
        class="text-none lang-btn px-3"
        :aria-label="$t('language')"
        v-bind="props"
      >
        <v-icon start>
          mdi-translate
        </v-icon>
        <span>{{ nativeName(current) }}</span>
        <v-icon end>
          mdi-menu-up
        </v-icon>
      </v-btn>
    </template>
    <v-list density="compact">
      <v-list-item
        v-for="item in locales"
        :key="item.locale"
        :active="item.locale === current"
        @click="select(item.locale)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
/* Vuetify's reset layer sets font-size: inherit on buttons, so the size prop never reaches
   the font. Same explicit override as NavigationLink, to match the neighbouring links. */
.lang-btn,
.v-list-item-title {
  font-size: 0.875rem;
}
</style>
