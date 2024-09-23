<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <PageTitleFlat
          :title="$t('_pageTitle.search')"
          :hide-triangle="$vuetify.display.smAndDown"
          :no-bottom-border-radius="$vuetify.display.smAndDown"
        />
        <v-card
          class="mt-3 card-rounded"
          flat
        >
          <v-card-title>
            <v-icon start>
              mdi-magnify
            </v-icon>
            {{ $t('_search.labels.searchUsers') }}
          </v-card-title>
          <v-card-text>
            <PaginatedDataTable
              ref="searchTable"
              :headers="headers"
              class="row-pointer"
              :items="users"
              :total-items="totalItems"
              default-sort-by="username"
              @reload="doSearch"
              @click:row="rowClick"
            >
              <template #top>
                <v-text-field
                  v-model="search"
                  autofocus
                  variant="outlined"
                  density="compact"
                  :label="$t('search')"
                  @update:model-value="debouncedSearch"
                />
              </template>
              <template #item.identifier="{ item }">
                <div class="d-flex align-center justify-end">
                  {{ item.identifier }}
                  <v-icon end>
                    {{ UserService.userTypeIcons[item.type] }}
                  </v-icon>
                </div>
              </template>
              <template #item.linked_users="{ item }">
                <router-link
                  v-for="linked in item.linked_users"
                  :key="linked.id"
                  :to="{ name: 'UserDashboard', params: { id: linked.id } }"
                  style="text-decoration: none; color: inherit;"
                  class="mr-2"
                >
                  <v-chip size="small">
                    <span class="d-flex align-center">
                      <v-icon start>{{ UserService.userTypeIcons[linked.type] }}</v-icon>
                      {{ linked.username }}
                    </span>
                  </v-chip>
                </router-link>
              </template>
              <template #item.username="{ item }">
                <router-link
                  :to="{ name: 'UserDashboard', params: { id: item.id } }"
                  style="text-decoration: none; color: inherit;"
                >
                  <span class="d-flex align-center">
                    <v-avatar
                      size="35"
                      class="mr-2"
                    >
                      <img
                        :src="item.avatar"
                        alt="avatar"
                      >
                    </v-avatar>
                    <span>{{ item.username }}</span>
                  </span>
                </router-link>
              </template>
            </PaginatedDataTable>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          class="card-rounded"
          flat
        >
          <v-card-title>
            <v-icon start>
              mdi-account-clock
            </v-icon>
            {{ $t('_search.labels.recentlyActiveUsers') }}
          </v-card-title>
          <v-card-text>
            <div v-if="recentUsers != null">
              <v-list>
                <v-list-item
                  v-for="user in recentUsers"
                  :key="user.id"
                  :to="{ name: 'UserDashboard', params: { id: user.id } }"
                >
                  <v-list-item-avatar>
                    <v-img :src="user.avatar" />
                  </v-list-item-avatar>
                  <v-list-item-title>
                    {{ user.username }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
            <div v-else>
              <v-skeleton-loader type="card" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import openapi from '@/api/openapi';
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import pDebounce from 'p-debounce';
import UserService from '../services/UserService';

export default {
  name: 'Search',
  components: { PaginatedDataTable, PageTitleFlat },
  data() {
    return {
      recentUsers: null,
      users: [],
      search: null,
      totalItems: 0,
      debouncedSearch: pDebounce(this.doSearch, 300),
      headers: [
        { text: this.$t('username'), value: 'username' },
        { text: this.$t('_search.labels.linkedUsers'), value: 'linked_users', sortable: false },
        {
          text: this.$t('id'), value: 'identifier', align: 'right', sortable: false,
        },
      ],
    };
  },
  computed: {
    UserService() {
      return UserService;
    },
  },
  watch: {
    $route(to) {
      if (to.query.query !== this.search) {
        this.search = to.query.query;
        this.doSearch();
      }
    },
  },
  beforeMount() {
    this.search = this.$route.query.query;

    this.fetchData();
  },
  methods: {
    rowClick(row) {
      this.$router.push({ name: 'UserDashboard', params: { id: row.id } });
    },
    async doSearch(queryParams = null) {
      const api = await openapi;

      let query = this.search;

      if (!query) {
        this.items = [];
        return;
      }

      this.$router.push({ query: { query } });

      if (query && query.match(/^\s*STEAM_[0-5]:[01]:\d+\s*$/)) {
        const steamid32 = query.replace(/\s/g, '');
        query = this.utils.getSteamid64(steamid32);
      }

      api.user_getUsers({
        ...(queryParams != null ? queryParams : this.$refs.searchTable.getQueryParameters()),
        query,
      })
        .then((rsp) => {
          this.users = rsp.data.items;
          this.totalItems = rsp.data.total;
        });
    },
    async fetchData() {
      const api = await openapi;

      api.user_getUsers({ size: 10, sort_by: 'last_online', sort_desc: true }).then((rsp) => {
        this.recentUsers = rsp.data.items;
      });
    },
  },
};
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
