<template>
  <v-text-field
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    v-model="search"
    :placeholder="$t('user')"
    prepend-inner-icon="mdi-magnify"
    class="expanding-search mt-6"
    :class="{ 'closed' : searchClosed && !search }"
    filled dense clearable
    @keydown.esc="search = null">
  </v-text-field>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      search: null,
      searchClosed: true,
    };
  },
};
</script>

<style lang="sass">
  .v-input.expanding-search
    transition: max-width 0.3s
    max-width: 200px
    .v-input__slot
      cursor: pointer !important
      &:before
        border-color: transparent !important
      &:after
        border-style: none !important
    &.closed
      max-width: 45px
      .v-input__slot
        background: transparent !important
</style>
