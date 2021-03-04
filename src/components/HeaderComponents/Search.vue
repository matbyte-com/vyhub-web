<template>
    <v-autocomplete
      ref="input"
      @focus="searchClosed = false"
      @blur="searchClosed = true, $emit('focusloss')"
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
      @keydown.esc="search = null">
      <template slot="item"
                slot-scope="{ item }">
        <v-list tile>
          <v-list-item>
            <v-list-item-avatar>
              <img :src="item.avatar" alt="avatar">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title><h2>{{ item.username }}</h2></v-list-item-title>
              <v-list-item-subtitle>
                {{ item.id }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-for="linked in item.linked_users" :key="linked.id">
                <v-row dense align="center" justify="center">
                  <v-col cols="1">
                    <v-icon>{{ userTypeIcons[linked.type] }}</v-icon>
                  </v-col>
                  <v-col>
                    {{ linked.username }}
                  </v-col>
                </v-row>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-autocomplete>
</template>

<script>
import api from '@/api/api';
import userService from '@/services/UserService';

export default {
  name: 'Search',
  data() {
    return {
      searchClosed: true,
      items: [],
      isLoading: false,
      search: null,
      userTypeIcons: userService.userTypeIcons,
    };
  },
  watch: {
    search(query) {
      // Items have already been requested
      if (this.isLoading) return;
      // search CLosed return
      if (this.searchClosed) return;
      // return for empty query
      if (query === '') {
        this.items = [];
        return;
      }
      this.isLoading = true;

      // Lazily load input items
      api.user.search(query, 10).then((rsp) => {
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
        this.searchClosed = true;
        this.items = [];
        this.$router.push({ name: 'UserDashboard', params: { id: user.id } });
      }
    },
    searchFilter() {
      return true;
    },
    test() {
      console.log(this.searchClosed);
      console.log(this.searchClosed && !this.search);
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
