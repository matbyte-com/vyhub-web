<template>
    <div>
      <DataTable
        :headers="headers"
        :items="appliedPackets"
        :sort-by="['begin']"
        :sort-desc="[true]"
        :search="true">
        <template v-slot:item.packet_title="{ item }">
          {{ item.packet.title }}
        </template>
        <template v-slot:item.active="{ item }">
          <BoolIcon :value="item.active"></BoolIcon>
        </template>
        <template v-slot:item.begin="{ item }">
          <span>{{ new Date(item.begin).toLocaleString() }}</span>
        </template>
        <template v-slot:item.end="{ item }">
          <span v-if="item.end != null">{{ new Date(item.end).toLocaleString() }}</span>
          <span v-else>∞</span>
        </template>
        <template v-slot:item.user="{ item }">
          <UserLink :user="item.user"></UserLink>
        </template>
      </DataTable>
    </div>
</template>

<script>
import DataTable from '../../DataTable.vue';
import UserLink from '../../UserLink.vue';
import openapi from '../../../api/openapi';
import UtilService from '../../../services/UtilService';
import BoolIcon from '../../BoolIcon.vue';

export default {
  name: 'UserPackets',
  components: { BoolIcon, UserLink, DataTable },
  data() {
    return {
      headers: [
        { text: this.$t('name'), value: 'packet_title' },
        { text: this.$t('user'), value: 'user' },
        { text: this.$t('active'), value: 'active' },
        { text: this.$t('begin'), value: 'begin' },
        { text: this.$t('end'), value: 'end' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      appliedPackets: null,
    };
  },
  methods: {
    async queryData() {
      const api = await openapi;

      api.packet_getAppliedPackets().then((rsp) => {
        this.appliedPackets = rsp.data;
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
      });
    },
  },
  beforeMount() {
    this.queryData();
  },
  watch: {
    $route() {
      this.queryData();
    },
  },
};
</script>

<style scoped>

</style>
