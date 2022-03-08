<template>
<div>
  <PageTitle icon="mdi-format-list-bulleted">{{ $t('log') }}</PageTitle>
  <v-card>
    <v-card-text class="mt-0 pt-0">
      <PaginatedDataTable
        ref="logTable"
        class="mt-4"
        :headers="headers"
        :totalItems="totalItems"
        :items="logs"
        default-sort-by="created_on"
        :default-sort-desc="true"
        show-expand
        @reload="fetchData"
        >
        <template v-slot:header>
          <v-row>
            <v-col class="d-flex align-center">
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>
                      mdi-filter
                    </v-icon>
                    {{ $t('type') }}
                  </v-btn>
                </template>
                <v-checkbox
                  class="ml-2, mr-2"
                  dense
                  hide-details
                  v-for="(category, index) in categories"
                  :key="index"
                  v-model="selectedCat"
                  :label="$t(`_log.type.${category.toLowerCase()}`)"
                  :value="category"
                  @change="fetchData()"
                ></v-checkbox>
                <a class="ma-1" @click="selectedCat = []; fetchData()">{{ $t('reset') }}</a>
              </v-menu>
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.message="{ item }">
          <div class="text-truncate" :style="{'max-width': $vuetify.breakpoint.width / 2 + 'px'}">
            {{ $t(`_log.${item.message.name}`, { ...item.message.kwargs }) }}
          </div>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            {{ $t(`_log.${item.message.name}`, { ...item.message.kwargs }) }}
          </td>
        </template>
        <template v-slot:item.author="{ item }">
          <div v-if="item.author != null">
            <UserLink :user="item.author"/>
          </div>
          <div v-else>
            -
          </div>
        </template>
        <template v-slot:item.category="{ item }">
          {{ $t(`_log.type.${item.category.toLowerCase()}`) }}
        </template>
        <template v-slot:item.time="{ item }" >
          <span>
            {{ $t('_notification.timeAgo', {
            time: utils.formatElapsedTime((new Date() - new Date(item.created_on)))
           }) }}
          </span>
        </template>
      </PaginatedDataTable>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';

export default {
  name: 'Notification.vue',
  components: { PaginatedDataTable, UserLink, PageTitle },
  data() {
    return {
      expanded: [],
      selectedCat: [],
      logs: null,
      totalItems: 0,
      categories: [],
      headers: [
        {
          text: this.$t('createdOn'), value: 'time', sortable: false, width: '10%',
        },
        { text: this.$t('user'), value: 'author', sortable: false },
        { text: this.$t('type'), value: 'category', sortable: false },
        {
          text: this.$t('message'), value: 'message', sortable: false, width: '60%',
        },
      ],
    };
  },
  mounted() {
    this.fetchData();
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      (await openapi).log_getCategories().then((rsp) => {
        this.categories = rsp.data;
      });
    },
    async fetchData(queryParams = null) {
      this.logs = null;
      (await openapi).log_getLog({
        category: this.selectedCat,
        ...(queryParams != null ? queryParams : this.$refs.logTable.getQueryParameters()),
      })
        .then((rsp) => {
          this.logs = rsp.data.items;
          this.totalItems = rsp.data.total;
        });
    },
  },
};
</script>

<style scoped>

</style>
