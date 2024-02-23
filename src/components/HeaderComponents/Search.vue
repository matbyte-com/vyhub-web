<template>
    <v-autocomplete
      ref="input"
      @focus="searchClosed = false"
      @blur="searchClosed = true;"
      @mousedown="searchClosed = false"
      :placeholder="searchClosed ? '' : $t('user')"
      prepend-inner-icon="mdi-magnify"
      class="expanding-search"
      hide-details="auto"
      :class="{ 'closed' : searchClosed && !search }"
      filled dense clearable
      hide-no-data
      :items="items"
      :search-input.sync="search"
      :loading="isLoading"
      item-text="username"
      item-value="id"
      append-icon=""
      return-object
      v-on:change="showUser"
      :filter="searchFilter"
      @keydown.esc="search = null">
      <template slot="item"
                slot-scope="{ item }">
        <v-list tile>
          <v-list-item>
            <v-list-item-avatar>
              <img :src="item.avatar" alt="avatar">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <h2 class="d-flex align-center">
                  <v-icon left>{{ userTypeIcons[item.type] }}</v-icon>
                  {{ item.username }}
                </h2>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.identifier }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="mt-2 ml-2">
                <v-chip small v-for="linked in item.linked_users" :key="linked.id"
                class="mr-2">
                  <span class="d-flex align-center">
                  <v-icon left>{{ userTypeIcons[linked.type] }}</v-icon>
                  {{ linked.username }}
                </span>
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-autocomplete>
</template>

<script>
import userService from '@/services/UserService';
import openapi from '@/api/openapi';

export default {
  name: 'Search',
  data() {
    return {
      searchClosed: true,
      items: [],
      isLoading: false,
      search: null,
      userTypeIcons: userService.userTypeIcons,
      isSteam32: false,
    };
  },
  watch: {
    async search(query_input) {
      let query = query_input;
      const api = await openapi;

      // Items have already been requested
      if (this.isLoading) return;
      // search CLosed return
      if (this.searchClosed) return;
      // return for empty query
      if (query === '') {
        this.items = [];
        return;
      }
      if (query.match(/^\s*STEAM_[0-5]:[01]:\d+\s*$/)) {
        this.isSteam32 = true;
        const steam32 = query.replace(/\s/g, '');
        query = this.utils.getSteamid64(steam32);
      }

      this.isLoading = true;

      // Lazily load input items
      api.user_getUsers({ query, size: 10, sort_by: 'username' }).then((rsp) => {
        this.items = rsp.data.items;
      }).catch((reason) => {
        console.log(reason);
      }).finally(() => {
        this.isLoading = false;
        this.isSteam32 = false;
      });
    },
  },
  methods: {
    showUser(user) {
      if (user != null) {
        this.searchClosed = true;
        this.items = [];
        this.$router.push({ name: 'UserDashboard', params: { id: user.id } });
      }
    },
    searchFilter() {
      return true;
    },
  },
};
</script>

<style lang="sass">
  .v-input.expanding-search
    transition: max-width 0.3s
    max-width: 500px
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
