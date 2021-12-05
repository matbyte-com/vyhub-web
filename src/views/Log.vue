<template>
<div>
  <PageTitle icon="mdi-format-list-bulleted">{{ $t('log') }}</PageTitle>
  <v-card>
    <v-card-text class="mt-0 pt-0">
      <DataTable
        class="mt-4"
        :headers="headers"
        :items="logs"
        show-expand
        :server-items-length.sync="totalItems"
        :items-per-page.sync="itemsPerPage"
        @update:page="newPage"
        :footer-props="{
          'disable-items-per-page': true,
        }"
        >
        <template v-slot:header>
          <v-row>
            <v-col class="d-flex align-center">
              <v-btn
                color="primary"
                depressed
                :loading="updateBtnLoading"
                @click="updateLog"
              >
                <v-icon left>
                  mdi-sync
                </v-icon>
                {{ $t('update') }}
              </v-btn>
              <v-spacer />
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
                  @change="newCat"
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
            {{ $t('notification.timeAgo', {
            time: utils.formatElapsedTime((new Date() - new Date(item.created_on)))
           }) }}
          </span>
        </template>
      </DataTable>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import DataTable from '@/components/DataTable.vue';
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';

export default {
  name: 'Notification.vue',
  components: { UserLink, PageTitle, DataTable },
  data() {
    return {
      updateBtnLoading: false,
      expanded: [],
      selectedCat: [],
      itemsPerPage: 50,
      newMessages: null,
      logs: [],
      totalItems: 20,
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
      state: {
        page: 1,
      },
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
    async fetchData(page = null, sortByCat = null) {
      this.newMessages = false;
      this.logs = null;
      if (page) this.state.page = page;
      if (sortByCat) this.selectedCat = sortByCat;
      (await openapi).log_getLog({
        size: this.itemsPerPage,
        page: this.state.page,
        category: this.selectedCat,
      })
        .then((rsp) => {
          this.logs = rsp.data.items;
          this.totalItems = rsp.data.total;
          setTimeout(() => { this.updateBtnLoading = false; }, 500);
        });
    },
    newPage(page) {
      this.fetchData(page);
    },
    newCat(cat) {
      this.fetchData(1, cat);
    },
    resetCatFilter() {
      this.selectedCat = [];
      this.fetchData(1);
    },
    updateLog() {
      this.updateBtnLoading = true;
      this.fetchData();
    },
  },
};
</script>

<style scoped>

</style>
