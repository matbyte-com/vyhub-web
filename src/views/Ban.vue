<template>
  <div>
    <PageTitle :title="$t('ban.labels.title')"/>
    <v-data-table
      :headers="headers"
      :items="getBans"
      :search="search">
    </v-data-table>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import apiService from '../api/api';

export default {
  name: 'Ban.vue',
  components: {
    PageTitle,
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'Bundle', value: 'serverbundle' },
        { text: 'User', value: 'user.username' },
        { text: 'Creator', value: 'creator.username' },
        { text: 'length', value: 'length' },
        { text: 'Ending', value: 'endDate' },
        { text: 'createdOn', value: 'created_on' },
      ],
      bans: [],
      bundles: [],
    };
  },
  beforeMount() {
    apiService.ban.getBans().then((rsp) => { this.bans = rsp.data; });
    apiService.server.getBundles().then((rsp) => { this.bundles = rsp.data; });
  },
  computed: {
    getBans() {
      const res = [];
      this.bans.forEach((ban) => {
        const eBan = ban;
        eBan.serverbundle = this.bundles.find((x) => x.id === ban.serverbundle_id).name;
        if (ban.length === null) {
          eBan.length = '∞';
          eBan.endDate = '∞';
        } else {
          eBan.endDate = this.$d(new Date(ban.created_on).setSeconds(+ban.length), 'long', this.$i18n.locale);
        }
        // eslint-disable-next-line @typescript-eslint/camelcase
        eBan.created_on = this.$d(new Date(ban.created_on), 'long', this.$i18n.locale);
        res.push(eBan);
      });
      return res;
    },
  },
};
</script>

<style scoped>

</style>
