<template>
  <div>
    <PageTitle :title="$t('ban.labels.title')"/>
    <v-data-table
      :headers="headers"
      :items="getBans"
      :search="search"
      :item-class="banRowFormatter">
      <template v-slot:top>
        <v-row>
          <v-col lg="4" md="6" sm="12">
            <v-btn outlined color="success" @click="$refs.banAddDialog.show()">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t("ban.labels.add") }}</span>
            </v-btn>
          </v-col>
          <v-spacer/>
          <v-col lg="2" md="4" sm="12">
            <v-text-field
              v-model="search"
              label="Search"
            ></v-text-field>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.length="{ item }">
        <span>
          {{ formatLength(item['length']) }}
        </span>
      </template>
      <template v-slot:item.ends_on="{ item }">
        <span>{{(item.ends_on == null ? '-' : new Date(item.ends_on).toLocaleString()) }}</span>
      </template>
      <template v-slot:item.created_on="{ item }">
        <span>{{ new Date(item.created_on).toLocaleString() }}</span>
      </template>
    </v-data-table>
    <DialogForm :form-schema="banAddFormSchema" ref="banAddDialog"
                :title="$t('ban.labels.add')" :submit-text="$t('create')"
                @submit="addBan">
    </DialogForm>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import DialogForm from '@/components/DialogForm.vue';
import banAddFormSchema from '@/forms/BanAddForm';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import apiService from '../api/api';

export default {
  name: 'Ban.vue',
  components: {
    PageTitle,
    DialogForm,
  },
  data() {
    return {
      search: '',
      headers: [
        { text: this.$t('bundle'), value: 'serverbundle' },
        { text: this.$t('user'), value: 'user.username' },
        { text: this.$t('reason'), value: 'reason' },
        { text: this.$t('length'), value: 'length' },
        { text: this.$t('endsOn'), value: 'ends_on' },
        { text: this.$t('creator'), value: 'creator.username' },
        { text: this.$t('createdOn'), value: 'created_on' },
      ],
      bans: [],
      bundles: [],
      banAddFormSchema,
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
        // eslint-disable-next-line @typescript-eslint/camelcase
        res.push(eBan);
      });
      return res;
    },
  },
  methods: {
    formatLength(seconds) {
      momentDurationFormatSetup(moment);
      return (seconds == null ? '∞' : moment.duration(seconds + 20000, 'seconds').format());
    },
    banRowFormatter(item) {
      if (item.is_active) {
        return 'green lighten-4';
      }

      if (item.status === 1) {
        return 'red lighten-4';
      }

      return 'orange lighten-4';
    },
    addBan() {
      const data = this.$refs.banAddDialog.getData();

      apiService.ban.addBan(
        data.userId,
        data.reason,
        data.length * 60,
        data.serverbundleId,
      ).then((rsp) => {
        console.log(rsp.data);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
