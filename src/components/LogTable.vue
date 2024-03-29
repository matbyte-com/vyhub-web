<template>
  <div>
    <v-alert color="error" icon="mdi-information-outline" v-if="entries && entries.length >= 500">
      {{ $t('_log.messages.limitReached') }}
    </v-alert>
    <DataTable
      :headers="headers"
      :items="entries"
      :search="search"
      :sort-by="['created_on']"
      :items-per-page="5"
      :sort-desc="[true]">
      <template v-slot:top v-if="showSearch">
        <v-row>
          <v-spacer/>
          <v-col lg="2" md="4" sm="12">
            <v-text-field
              v-model="search"
              :label="$t('search')"
            ></v-text-field>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.author="{ item }">
        <UserLink :user="item.author" v-if="item.author != null"></UserLink>
      </template>
      <template v-slot:item.message="{ item }">
        {{ item.message }}
      </template>
      <template v-slot:item.created_on="{ item }">
        <span>{{ new Date(item.date).toLocaleString() }}</span>
      </template>
    </DataTable>
  </div>
</template>

<script>
import UserLink from '@/components/UserLink.vue';
import openapi from '@/api/openapi';
import DataTable from '@/components/DataTable.vue';

export default {
  name: 'LogTable',
  components: {
    DataTable,
    UserLink,
  },
  data() {
    return {
      entries: null,
      search: null,
    };
  },
  props: {
    type: String,
    objId: String,
    showSearch: Boolean,
    showCategory: {
      type: Boolean,
      default: false,
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      let logFn = null;
      let params = [];

      if (this.type === 'user') {
        logFn = api.user_getLogs;
        params = [{ uuid: this.objId }];
      } else if (this.type === 'ban') {
        logFn = api.ban_getLogs;
        params = [{ uuid: this.objId }];
      } else {
        return;
      }

      logFn(...params).then((rsp) => {
        this.entries = rsp.data;
      });
    },
  },
  computed: {
    headers() {
      const headers = [
        { text: this.$t('author'), value: 'author' },
        { text: this.$t('message'), value: 'message' },
        { text: this.$t('date'), value: 'created_on' },
      ];

      if (this.showCategory) {
        headers.push(
          { text: this.$t('type'), value: 'category', sortable: false },
        );
      }

      return headers;
    },
  },
  watch: {
    objId() {
      this.fetchData();
    },
  },
};
</script>

<style scoped>

</style>
