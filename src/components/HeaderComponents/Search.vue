<template>
  <v-autocomplete
    ref="input"
    v-model:search="search"
    :placeholder="searchClosed ? '' : $t('user')"
    prepend-inner-icon="mdi-magnify"
    class="expanding-search"
    hide-details="auto"
    :class="{ 'closed' : searchClosed && !search }"
    density="compact"
    clearable
    hide-no-data
    :items="items"
    :loading="isLoading"
    item-title="username"
    item-value="id"
    auto-select-first
    return-object
    :custom-filter="searchFilter"
    @focus="searchClosed = false"
    @blur="searchClosed = true;"
    @mousedown="searchClosed = false"
    @update:model-value="showUser"
    @keydown.esc="search = null"
  >
    <template #default="{ item }">
      <slot
        name="item"
      >
        <v-list
          v-if="item.id !== 'advanced'"
          tile
        >
          <v-list-item :prepend-avatar="item.avatar">
            <v-list-item-title>
              <h2 class="d-flex align-center">
                <v-icon start>
                  {{ userTypeIcons[item.type] }}
                </v-icon>
                {{ item.username }}
              </h2>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.identifier }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="mt-2 ml-2">
              <v-chip
                v-for="linked in item.linked_users"
                :key="linked.id"
                size="small"
                class="mr-2"
              >
                <span class="d-flex align-center">
                  <v-icon start>{{ userTypeIcons[linked.type] }}</v-icon>
                  {{ linked.username }}
                </span>
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <div v-else>
          {{ $t('advanced') }}...
        </div>
      </slot>
    </template>
  </v-autocomplete>
</template>

<script>
import userService from '@/services/UserService';
import openapi from '@/api/openapi';
import pDebounce from 'p-debounce';

export default {
  data() {
    return {
      searchClosed: true,
      items: [],
      isLoading: false,
      search: null,
      debouncedSearch: pDebounce(this.doSearch, 300),
      userTypeIcons: userService.userTypeIcons,
      isSteam32: false,
    };
  },
  watch: {
    search() {
      this.debouncedSearch();
    },
  },
  methods: {
    async doSearch() {
      let query = this.search;
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
      if (query && query.match(/^\s*STEAM_[0-5]:[01]:\d+\s*$/)) {
        this.isSteam32 = true;
        const steam32 = query.replace(/\s/g, '');
        query = this.utils.getSteamid64(steam32);
      }

      this.isLoading = true;

      // Lazily load input items
      api.user_getUsers({ query, size: 7, sort_by: 'username' }).then((rsp) => {
        this.items = rsp.data.items;
        this.items.push({ id: 'advanced', username: '...' });
      }).catch((reason) => {
        console.log(reason);
      }).finally(() => {
        this.isLoading = false;
        this.isSteam32 = false;
      });
    },
    showUser(user) {
      if (user != null) {
        this.searchClosed = true;
        this.items = [];

        if (user.id === 'advanced') {
          this.$router.push({ name: 'Search', query: { query: this.search } });
        } else {
          this.$router.push({ name: 'UserDashboard', params: { id: user.id } });
        }

        this.search = null;
        this.$refs.input.reset();
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
    .v-input__slot // Does not work from here TODO
      cursor: pointer !important
      &:before
        border-color: transparent !important
      &:after
        border-style: none !important // Upper things do not work TODO
    &.closed
      max-width: 45px
      .v-input__slot
        background: transparent !important // This does not work either TODO

  .v-input.expanding-search.v-input--is-focused .v-icon // This works, but not sure whether we want to keep it TODO
    color: white !important
    caret-color: white !important

  :deep(.v-field__append_inner) // This does not work TODO
    display: none !important
</style>
