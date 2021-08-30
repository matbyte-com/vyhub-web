<template>
  <div>
    <PageTitle icon="mdi-account-cancel">{{ $t('ban.labels.title') }}</PageTitle>
    <v-card>
      <v-card-text>
        <DataTable
          :headers="headers"
          :items="getBans"
          :search="true"
          :sort-by="['created_on']"
          :sort-desc="[true]"
          :item-class="banRowFormatter"
          @click:row="showDetails"
          @update:page="newPage">
          <template v-slot:footer-right>
            <v-btn outlined color="success" @click="$refs.banAddDialog.show()">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t("ban.labels.add") }}</span>
            </v-btn>
          </template>
          <template v-slot:item.user="{ item }">
            <UserLink :user="item.user"></UserLink>
          </template>
          <template v-slot:item.length="{ item }">
        <span>
          {{ utils.formatLength(item['length']) }}
        </span>
          </template>
          <template v-slot:item.creator="{ item }">
            <UserLink :user="item.creator"></UserLink>
          </template>
          <template v-slot:item.created_on="{ item }">
            <span>{{ new Date(item.created_on).toLocaleString() }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn depressed small color="error"
                   @click="showDetails(item)">
              <v-icon left>
                mdi-eye
              </v-icon>
              {{ $t('details') }}
            </v-btn>
          </template>
        </DataTable>
      </v-card-text>
    </v-card>
    <DialogForm :form-schema="banAddFormSchema" ref="banAddDialog"
                :title="$t('ban.labels.add')" :submit-text="$t('create')"
                title-icon="mdi-account-cancel"
                @submit="addBan">
    </DialogForm>
    <Dialog
      ref="banDetailDialog"
      icon="mdi-account-cancel"
      :title="$t('ban.labels.details')"
      :max-width="700"
      v-model="banDetailShown">
      <template>
        <h6 class="text-h6 mb-2  mt-3">{{ $t('details') }}</h6>
        <div v-if="currentBan != null">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr v-for="raw in ['id', 'reason']" :key="raw">
                  <td>{{ $t(raw) }}</td>
                  <td>{{ currentBan[raw] }}</td>
                </tr>
                <tr>
                  <td>{{ $t('user') }}</td>
                  <td><UserLink :user="currentBan.user"></UserLink></td>
                </tr>
                <tr>
                  <td>{{ $t('length') }}</td>
                  <td>
                    {{ utils.formatLength(currentBan['length']) }}

                    ({{ (currentBan.ends_on == null ? '-' : new
                    Date(currentBan.ends_on).toLocaleString()) }})
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('bundle') }}</td>
                  <td>
                    {{ (currentBan.serverbundle != null
                    ? currentBan.serverbundle.name : $t('global')) }}
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('creator') }}</td>
                  <td><UserLink :user="currentBan.creator"></UserLink></td>
                </tr>
                <tr>
                  <td>{{ $t('createdOn') }}</td>
                  <td>{{ new Date(currentBan.created_on).toLocaleString() }}</td>
                </tr>
                <tr>
                  <td>{{ $t('status') }}</td>
                  <td v-if="currentBan.is_active">
                    <v-chip color="green">{{ $t('active') }}</v-chip>
                  </td>
                  <td v-else-if="currentBan.status === 'UNBANNED'">
                    <v-chip color="orange">{{ $t('ban.labels.unbanned') }}</v-chip>
                  </td>
                  <td v-else>
                    <v-chip color="red">{{ $t('expired') }}</v-chip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <br/>
          <h6 class="text-h6 mb-2">{{ $t('log') }}</h6>
          <LogTable type="ban" :obj-id="currentBan.id" :show-search="false" ref="banLogTable">
          </LogTable>
        </div>
      </template>
      <template v-slot:actions>
        <div v-if="currentBan != null">
          <v-btn text color="primary" @click="showEditDialog">
            <v-icon left>mdi-pencil</v-icon>
            {{ $t('edit') }}
          </v-btn>
          <v-btn text color="warning darken-2" @click="unbanBan"
                 v-if="currentBan.status === 'ACTIVE'">
            <v-icon left>mdi-lock-open</v-icon>
            {{ $t('ban.labels.unban') }}
          </v-btn>
          <v-btn text color="warning" @click="rebanBan"
                 v-if="currentBan.status === 'UNBANNED'">
            <v-icon left>mdi-lock</v-icon>
            {{ $t('ban.labels.reban') }}
          </v-btn>
          <v-btn text color="error" @click="showDeleteDialog">
            <v-icon left>mdi-delete</v-icon>
            {{ $t('delete') }}
          </v-btn>
        </div>
      </template>
    </Dialog>
    <DialogForm :form-schema="banEditFormSchema" ref="banEditDialog"
                :title="$t('ban.labels.edit')" :submit-text="$t('edit')"
                title-icon="mdi-account-cancel"
                @submit="editBan">
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deleteBanDialog"
      @submit="deleteBan"/>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import DialogForm from '@/components/DialogForm.vue';
import UserLink from '@/components/UserLink.vue';
import LogTable from '@/components/LogTable.vue';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import banAddFormSchema from '@/forms/BanAddForm';
import banEditFormSchema from '@/forms/BanEditForm';
import apiService from '@/api/api';
import DataTable from '@/components/DataTable.vue';
import Dialog from '../components/Dialog.vue';

export default {
  name: 'Ban.vue',
  components: {
    Dialog,
    DataTable,
    LogTable,
    PageTitle,
    DialogForm,
    UserLink,
    DeleteConfirmationDialog,
  },
  data() {
    return {
      search: '',
      headers: [
        { text: this.$t('user'), value: 'user' },
        { text: this.$t('reason'), value: 'reason' },
        { text: this.$t('bundle'), value: 'serverbundle.name' },
        { text: this.$t('length'), value: 'length' },
        { text: this.$t('creator'), value: 'creator' },
        { text: this.$t('createdOn'), value: 'created_on' },
        {
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false,
        },
      ],
      bans: [],
      bundles: [],
      banAddFormSchema,
      banEditFormSchema,
      page: 1,
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
        return this.$route.params.banId != null && (!this.$refs.banEditDialog
          || !this.$refs.banEditDialog.open);
      },
      set(newValue) {
        if (!newValue && !this.$refs.banEditDialog.open) {
          this.$router.push({ name: 'Bans' });
        }
      },
    },
    currentBan() {
      if (this.bans && this.bans.length > 0) {
        const bans = this.bans.filter((ban) => ban.id === this.$route.params.banId);

        if (bans.length > 0) {
          if (this.$refs.banLogTable) {
            this.$refs.banLogTable.queryData();
          }

          return bans[0];
        }
      }

      return null;
    },
  },
  methods: {
    queryData() {
      apiService.ban.getBans().then((rsp) => { this.bans = rsp.data; });
      apiService.server.getBundles().then((rsp) => { this.bundles = rsp.data; });
    },
    banRowFormatter(item) {
      const add = (this.$vuetify.theme.dark ? 'darken-2' : 'lighten-4');

      if (item.is_active) {
        if (item.serverbundle == null) {
          return `blue ${add}`;
        }
        return `green ${add}`;
      }

      if (item.status === 'UNBANNED') {
        return `orange ${add}`;
      }

      return `red ${add}`;
    },
    addBan() {
      const data = this.$refs.banAddDialog.getData();

      apiService.ban.addBan(
        (data.user ? data.user.id : null),
        data.reason,
        data.length * 60,
        (data.serverbundle ? data.serverbundle.id : null),
      ).then(() => {
        this.queryData();
        this.$refs.banAddDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.banAddDialog.setErrorMessage(err.response.data.detail);
      });
    },
    editBan() {
      const data = this.$refs.banEditDialog.getData();

      apiService.ban.editBan(
        this.currentBan.id,
        data.reason,
        data.length * 60,
        (data.serverbundle ? data.serverbundle.id : null),
      ).then(() => {
        this.queryData();
        this.$refs.banEditDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.banEditDialog.setErrorMessage(err.response.data.detail);
      });
    },
    deleteBan(ban) {
      apiService.ban.deleteBan(
        ban.id,
      ).then(() => {
        this.$refs.deleteBanDialog.closeAndReset();
        this.banDetailShown = false;
        this.queryData();
      }).catch((err) => {
        this.$refs.deleteBanDialog.setErrorMessage(err.response.data.detail);
        console.log(err);
      });
    },
    unbanBan() {
      apiService.ban.editBanStatus(
        this.currentBan.id,
        'UNBANNED',
      ).then(() => {
        this.queryData();
      }).catch((err) => {
        console.log(err);
      });
    },
    rebanBan() {
      apiService.ban.editBanStatus(
        this.currentBan.id,
        'ACTIVE',
      ).then(() => {
        this.queryData();
      }).catch((err) => {
        console.log(err);
      });
    },
    showEditDialog() {
      this.$refs.banEditDialog.show();
      this.banDetailShown = false;

      const ban = { ...this.currentBan };
      ban.length = (ban.length != null ? ban.length / 60 : null);

      this.$refs.banEditDialog.setData(ban);
    },
    showDeleteDialog() {
      this.$refs.deleteBanDialog.show(this.currentBan);
    },
    showDetails(item) {
      this.$router.push({ name: 'Bans', params: { banId: item.id } });
    },
    newPage(page) {
      this.page = page;
      this.fetchData(page);
    },
  },
};
</script>

<style scoped>

</style>
