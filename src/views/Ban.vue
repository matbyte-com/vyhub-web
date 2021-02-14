<template>
  <div>
    <PageTitle :title="$t('ban.labels.title')"/>
    <v-data-table
      :headers="headers"
      :items="getBans"
      :search="search"
      :sort-by="['created_on']"
      :sort-desc="[true]"
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
      <template v-slot:item.user="{ item }">
        <UserLink :user="item.user"></UserLink>
      </template>
      <template v-slot:item.length="{ item }">
        <span>
          {{ formatLength(item['length']) }}
        </span>
      </template>
      <template v-slot:item.ends_on="{ item }">
        <span>{{(item.ends_on == null ? '-' : new Date(item.ends_on).toLocaleString()) }}</span>
      </template>
      <template v-slot:item.creator="{ item }">
        <UserLink :user="item.creator"></UserLink>
      </template>
      <template v-slot:item.created_on="{ item }">
        <span>{{ new Date(item.created_on).toLocaleString() }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2"
                @click="$router.push({ name: 'Bans', params: {banId: item.id}})">
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
    <DialogForm :form-schema="banAddFormSchema" ref="banAddDialog"
                :title="$t('ban.labels.add')" :submit-text="$t('create')"
                title-icon="mdi-account-cancel"
                @submit="addBan">
    </DialogForm>
    <v-dialog
      v-model="banDetailShown"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="500">
      <v-card>
        <v-card-title>
          <v-icon class="mr-1">mdi-account-cancel</v-icon>
          <span class="headline">{{ $t('ban.labels.details') }}</span>
        </v-card-title>
        <v-card-text v-if="$route.params.banId != null">
          <v-list>
            <v-list-item>
              <v-list-item-content>{{ $t('id') }}:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ $route.params.banId }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import DialogForm from '@/components/DialogForm.vue';
import UserLink from '@/components/UserLink.vue';
import banAddFormSchema from '@/forms/BanAddForm';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import apiService from '../api/api';

export default {
  name: 'Ban.vue',
  components: {
    PageTitle,
    DialogForm,
    UserLink,
  },
  data() {
    return {
      search: '',
      headers: [
        { text: this.$t('user'), value: 'user' },
        { text: this.$t('reason'), value: 'reason' },
        { text: this.$t('bundle'), value: 'serverbundle.name' },
        { text: this.$t('length'), value: 'length' },
        { text: this.$t('endsOn'), value: 'ends_on' },
        { text: this.$t('creator'), value: 'creator' },
        { text: this.$t('createdOn'), value: 'created_on' },
        {
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false,
        },
      ],
      bans: [],
      bundles: [],
      banAddFormSchema,
    };
  },
  beforeMount() {
    this.queryData();
  },
  computed: {
    getBans() {
      return this.bans;
    },
    banDetailShown: {
      get() {
        return this.$route.params.banId != null;
      },
      set(newValue) {
        if (!newValue) {
          this.$router.push({ name: 'Bans' });
        }
      },
    },
  },
  methods: {
    queryData() {
      apiService.ban.getBans().then((rsp) => { this.bans = rsp.data; });
      apiService.server.getBundles().then((rsp) => { this.bundles = rsp.data; });
    },
    formatLength(seconds) {
      momentDurationFormatSetup(moment);
      return (seconds == null ? '∞' : moment.duration(seconds + 20000, 'seconds').format());
    },
    banRowFormatter(item) {
      if (item.is_active) {
        if (item.serverbundle == null) {
          return 'blue lighten-4';
        }
        return 'green lighten-4';
      }

      if (item.status === 'UNBANNED') {
        return 'orange lighten-4';
      }

      return 'red lighten-4';
    },
    addBan() {
      const data = this.$refs.banAddDialog.getData();

      apiService.ban.addBan(
        data.userId,
        data.reason,
        data.length * 60,
        data.serverbundleId,
      ).then(() => {
        this.queryData();
        this.$refs.banAddDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.banAddDialog.setErrorMessage(err.response.data.detail);
      });
    },
    editBan() {
      // A
    },
    deleteBan() {
      // B
    },
  },
};
</script>

<style scoped>

</style>
