<template>
  <v-autocomplete
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    v-model="searchInput"
    :placeholder="$t('user')"
    prepend-inner-icon="mdi-magnify"
    class="expanding-search mt-6"
    :class="{ 'closed' : searchClosed && !search }"
    filled dense clearable
    hide-no-data
    :items="items"
    :search-input.sync="search"
    :loading="isLoading"
    item-text="username"
    item-value="id"
    return-object
    v-on:change="showUser"
    :filter="searchFilter"
    @keydown.esc="searchInput = null">
    <template slot="item"
              slot-scope="{ item }">
      <v-row align="center" justify="center">
        <v-col cols="3">
          <v-avatar
            size="30">
            <img :src="item.avatar"
                 alt="avatar">
          </v-avatar>
        </v-col>
        <v-col>
          {{ item.username }}
        </v-col>
      </v-row>
    </template>
  </v-autocomplete>
</template>

<script>
import api from '@/api/api';

export default {
  name: 'Search',
  data() {
    return {
      searchInput: null,
      searchClosed: true,
      items: [],
      isLoading: false,
      search: null,
    };
  },
  watch: {
    search(query) {
      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      api.user.search(query).then((rsp) => {
        this.items = rsp.data;
      }).catch((reason) => {
        console.log(reason);
      }).finally(() => {
        this.isLoading = false;
      });
    },
  },
  methods: {
    showUser(user) {
      if (user != null) {
        this.$router.push({ name: 'UserDashboard', params: { id: user.id } });
      }
    },
    searchFilter(item, queryString, itemText) {
      return true;
    },
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
