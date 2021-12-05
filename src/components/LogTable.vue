<template>
  <v-data-table
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
            label="Search"
          ></v-text-field>
        </v-col>
      </v-row>
    </template>
    <template v-slot:item.author="{ item }">
      <UserLink :user="item.author"></UserLink>
    </template>
    <template v-slot:item.message="{ item }">
      {{ $t(`_log.${item.message.name}`, item.message.kwargs) }}
    </template>
    <template v-slot:item.created_on="{ item }">
      <span>{{ new Date(item.created_on).toLocaleString() }}</span>
    </template>
  </v-data-table>
</template>

<script>
import UserLink from '@/components/UserLink.vue';
import openapi from '@/api/openapi';

export default {
  name: 'LogTable',
  components: {
    UserLink,
  },
  data() {
    return {
      entries: [],
      headers: [
        { text: this.$t('user'), value: 'author' },
        { text: this.$t('message'), value: 'message' },
        { text: this.$t('date'), value: 'created_on' },
      ],
      search: null,
    };
  },
  props: {
    type: String,
    category: String,
    objId: String,
    showSearch: Boolean,
  },
  beforeMount() {
    this.queryData();
  },
  methods: {
    async queryData() {
      const api = await openapi;

      let logFn = api.log_getLog;
      let params = [];

      if (this.type === 'user') {
        logFn = api.user_getLog;
        params = [{ uuid: this.objId }];
      } else if (this.type === 'ban') {
        logFn = api.ban_getLogs;
        params = [{ uuid: this.objId }];
      } else {
        params = [{ category: this.category }];
      }

      logFn(...params).then((rsp) => {
        this.entries = rsp.data;
      });
    },
  },
};
</script>

<style scoped>

</style>
