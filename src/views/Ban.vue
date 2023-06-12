<template>
  <div>
    <PageTitle icon="mdi-account-cancel">{{ $t('_ban.labels.title') }}</PageTitle>
    <v-card>
      <v-card-text>
        <PaginatedDataTable
          ref="banTable"
          :headers="headers"
          :items="bans"
          defaultSortBy="created_on"
          :defaultSortDesc="true"
          :totalItems="totalItems"
          @reload="fetchData"
          @click:row="showDetails">
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
                      {{ $t('bundle') }}
                    </v-btn>
                  </template>
                  <v-checkbox
                    class="ml-2, mr-2"
                    dense
                    hide-details
                    v-for="(bundle, index) in bundles"
                    :key="index"
                    v-model="selectedBundles"
                    :label="bundle.name"
                    :value="bundle.id"
                    @change="fetchData()"
                  ></v-checkbox>
                  <a class="ma-1" @click="selectedBundles = []; fetchData()">
                    {{ $t('reset') }}</a>
                </v-menu>
                <v-alert type="info" color="primary" dense v-if="$route.query.user_id"
                         class="mt-4 ml-3">
                  {{ $t('_ban.messages.showingUserBans', { id: $route.query.user_id }) }}
                </v-alert>
              </v-col>
            </v-row>
          </template>
          <template v-slot:footer-right v-if="$checkProp('ban_edit')">
            <v-btn outlined color="success" @click="$refs.banAddDialog.show()">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t('_ban.labels.add') }}</span>
            </v-btn>
          </template>
          <template v-slot:item.color-status="{ item }">
            <v-sheet :color="banRowFormatter(item)"
                     height="95%" width="10px"
            style="margin-left: -15px"/>
          </template>
          <template v-slot:item.user="{ item }">
            <span v-if="$vuetify.breakpoint.xsOnly">
              <UserLink :user="item.user"
                        :color="banRowFormatter(item)" />
            </span>
            <span v-else>
              <UserLink :user="item.user"/>
            </span>
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
        </PaginatedDataTable>
      </v-card-text>
    </v-card>
    <DialogForm :form-schema="banAddFormSchema" ref="banAddDialog"
                :title="$t('_ban.labels.add')" :submit-text="$t('create')"
                icon="mdi-account-cancel"
                @submit="addBan">
    </DialogForm>
    <Dialog
      ref="banDetailDialog"
      icon="mdi-account-cancel"
      :title="$t('_ban.labels.details')"
      :max-width="800"
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

                    <span v-if="currentBan.ends_on != null">
                      ({{ utils.formatDate(currentBan.ends_on) }})
                    </span>
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
                  <td v-if="currentBan.active">
                    <v-chip class="white--text" color="green">{{ $t('active') }}</v-chip>
                  </td>
                  <td v-else-if="currentBan.status === 'UNBANNED'">
                    <v-chip class="white--text" color="orange">
                      {{ $t('_ban.labels.unbanned') }}
                    </v-chip>
                  </td>
                  <td v-else>
                    <v-chip class="white--text" color="red">{{ $t('expired') }}</v-chip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <br/>
          <div style="width: 100%" v-if="currentBan.protests && currentBan.protests.length > 0
          && ($checkProp('ban_edit') ||
           $checkLinked($store.getters.user, currentBan.user))">
            <h6 class="text-h6 mb-2  mt-3">{{ $t('_ban.labels.banProtests') }}</h6>
            <v-simple-table>
              <tbody>
                <tr v-for="protest in currentBan.protests"
                    :key="protest.id" style="cursor: pointer;"
                    @click="$router.push({ name: 'TicketThread', params: { id: protest.id } })">
                  <td>{{ utils.formatDate(protest.created) }}</td>
                  <td class="text-right text-uppercase">
                    <v-chip :color="protest.status === 'OPEN' ? 'success' : 'error'">
                    {{ $t(`_forum.status.${protest.status.toLowerCase()}`) }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
          <br/>
          <div v-if="$checkProp('ban_comment_show')">
            <h6 class="text-h6 mb-2">{{ $t('comments') }}</h6>
            <CommentsTable type="ban" :obj-id="currentBan.id" :show-search="false"
                           ref="banCommentsTable">
            </CommentsTable>
          </div>
          <br/>
          <div v-if="$checkProp('ban_log_show')">
            <h6 class="text-h6 mb-2">{{ $t('log') }}</h6>
            <div v-if="logsShown">
              <LogTable type="ban" :obj-id="currentBan.id" :show-search="false" ref="banLogTable">
              </LogTable>
            </div>
            <div v-else>
              <v-btn text color="primary" @click="logsShown = true">
                <v-icon left>mdi-eye</v-icon>
                {{ $t('show') }}
              </v-btn>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:actions>
        <div v-if="currentBan != null
                   && $store.getters.isLoggedIn
                   && $checkLinked($store.getters.user, currentBan.user)
                   && currentBan.active">
          <v-btn v-if="config && config.ban_protest_url" :href="config.ban_protest_url"
                 text color="primary">
            <v-icon left>mdi-fencing</v-icon>
            {{ $t('_ban.labels.protestBan') }}
          </v-btn>
          <v-btn v-else-if="$store.getters.generalConfig
                            && $store.getters.generalConfig['enable_ticket']"
                 text color="primary" @click="showProtestBanDialog" target="_blank">
            <v-icon left>mdi-fencing</v-icon>
            {{ $t('_ban.labels.protestBan') }}
          </v-btn>
        </div>
        <div v-if="currentBan != null && $checkProp('ban_edit')">
          <v-btn text color="primary" @click="showEditDialog">
            <v-icon left>mdi-pencil</v-icon>
            {{ $t('edit') }}
          </v-btn>
          <v-btn text color="warning darken-2" @click="unbanBan"
                 v-if="currentBan.status === 'ACTIVE'">
            <v-icon left>mdi-lock-open</v-icon>
            {{ $t('_ban.labels.unban') }}
          </v-btn>
          <v-btn text color="warning" @click="rebanBan"
                 v-if="currentBan.status === 'UNBANNED'">
            <v-icon left>mdi-lock</v-icon>
            {{ $t('_ban.labels.reban') }}
          </v-btn>
          <v-btn text color="error" @click="showDeleteDialog">
            <v-icon left>mdi-delete</v-icon>
            {{ $t('delete') }}
          </v-btn>
        </div>
      </template>
    </Dialog>
    <DialogForm :form-schema="banEditFormSchema" ref="banEditDialog"
                :title="$t('_ban.labels.edit')" :submit-text="$t('edit')"
                icon="mdi-account-cancel"
                @submit="editBan">
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deleteBanDialog"
      @submit="deleteBan"/>
    <ThreadAddDialog ref="protestBanDialog" :dialog-title="$t('_ban.labels.protestBan')"
                     :hide-title-input="true" @submit="protestBan"/>
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
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import openapiCached from '@/api/openapiCached';
import { left } from 'core-js/internals/array-reduce';
import CommentsTable from '@/components/Comments/CommentsTable.vue';
import Dialog from '../components/Dialog.vue';
import openapi from '../api/openapi';
import ThreadAddDialog from '../components/ForumComponents/ThreadAddDialog.vue';

export default {
  name: 'Ban.vue',
  components: {
    CommentsTable,
    ThreadAddDialog,
    PaginatedDataTable,
    Dialog,
    LogTable,
    PageTitle,
    DialogForm,
    UserLink,
    DeleteConfirmationDialog,
  },
  data() {
    return {
      headers: [
        { value: 'color-status', sortable: false, width: '1px' },
        { text: this.$t('user'), value: 'user', sortable: false },
        { text: this.$t('reason'), value: 'reason' },
        { text: this.$t('bundle'), value: 'serverbundle.name', sortable: false },
        { text: this.$t('length'), value: 'length' },
        { text: this.$t('creator'), value: 'creator', sortable: false },
        { text: this.$t('createdOn'), value: 'created_on' },
        {
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false,
        },
      ],
      bans: null,
      bundles: [],
      banAddFormSchema,
      banEditFormSchema,
      selectedBundles: [],
      totalItems: 0,
      config: null,
      currentBan: null,
      logsShown: false,
    };
  },
  beforeMount() {
    this.getBundles();
    this.getConfig();
    this.updateCurrentBan();
  },
  watch: {
    $route() {
      this.updateCurrentBan();
    },
  },
  computed: {
    banDetailShown: {
      get() {
        return this.$route.params.banId != null && (!this.$refs.banEditDialog
          || !this.$refs.banEditDialog.open);
      },
      set(newValue) {
        if (!newValue && !this.$refs.banEditDialog.open) {
          this.$router.push({ name: 'Bans' });
          this.logsShown = false;
        }
      },
    },
    // currentBan() {
    //   if (this.bans && this.bans.length > 0) {
    //     let ban = this.bans.find((b) => b.id === this.$route.params.banId);
    //
    //     if (!ban) {
    //
    //     }
    //
    //     if (bans.length > 0) {
    //       if (this.$refs.banLogTable) {
    //         this.$refs.banLogTable.fetchData();
    //       }
    //
    //       return bans[0];
    //     }
    //   }
    //
    //   return null;
    // },
  },
  methods: {
    async updateCurrentBan() {
      const api = await openapi;

      if (this.$route.params.banId != null) {
        api.ban_getBan({ uuid: this.$route.params.banId }).then((rsp) => {
          this.currentBan = rsp.data;
        }).catch(() => {
          this.currentBan = null;
        });
      } else {
        this.currentBan = null;
      }
    },
    async fetchData(queryParams = null) {
      this.updateCurrentBan();

      (await openapi).ban_getBans({
        serverbundle_id: this.selectedBundles,
        user_id: this.$route.query.user_id,
        ...(queryParams != null ? queryParams : this.$refs.banTable.getQueryParameters()),
      })
        .then((rsp) => {
          this.bans = rsp.data.items;
          this.totalItems = rsp.data.total;
        });
    },
    async getConfig() {
      (await openapi).ban_getConfig().then((rsp) => {
        this.config = rsp.data;
      });
    },
    async getBundles() {
      (await openapiCached).server_getBundles().then((rsp) => { this.bundles = rsp.data; });
    },
    loadLogs() {
      this.$refs.banLogTable.fetchData();
    },
    banRowFormatter(item) {
      const add = (this.$vuetify.theme.dark ? 'darken-4' : '');

      if (item.active) {
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
    async addBan() {
      const data = this.$refs.banAddDialog.getData();

      (await openapi).ban_createBan(null, {
        user_id: (data.user ? data.user.id : null),
        reason: data.reason,
        length: data.length * 60,
        serverbundle_id: (data.serverbundle ? data.serverbundle.id : null),
      }).then(() => {
        this.$notify({
          title: this.$t('_ban.messages.banAdded'),
          type: 'success',
        });
        this.fetchData();
        this.$refs.banAddDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.banAddDialog.setError(err);
      });
    },
    async editBan() {
      const data = this.$refs.banEditDialog.getData();

      (await openapi).ban_editBan(
        { uuid: this.currentBan.id },
        {
          reason: data.reason,
          length: data.length * 60,
          serverbundle_id: (data.serverbundle ? data.serverbundle.id : null),
        },
      ).then(() => {
        this.fetchData();
        this.$refs.banEditDialog.closeAndReset();
        this.$notify({
          title: this.$t('_ban.messages.banEdited'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.$refs.banEditDialog.setError(err);
      });
    },
    async deleteBan(ban) {
      (await openapi).ban_deleteBan(
        { uuid: ban.id },
      ).then(() => {
        this.$refs.deleteBanDialog.closeAndReset();
        this.$notify({
          title: this.$t('_ban.messages.banDeleted'),
          type: 'success',
        });
        this.banDetailShown = false;
        this.fetchData();
      }).catch((err) => {
        this.$refs.deleteBanDialog.setError(err);
        console.log(err);
      });
    },
    async unbanBan() {
      (await openapi).ban_editBan(
        { uuid: this.currentBan.id },
        { status: 'UNBANNED' },
      ).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_ban.messages.banToggled'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    async rebanBan() {
      (await openapi).ban_editBan(
        { uuid: this.currentBan.id },
        { status: 'ACTIVE' },
      ).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_ban.messages.banToggled'),
          type: 'success',
        });
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
    showProtestBanDialog() {
      this.$refs.protestBanDialog.show(this.currentBan);
    },
    async protestBan() {
      const data = this.$refs.protestBanDialog.getData();
      data.ban_id = this.currentBan.id;
      data.title = `${this.$t('_forum.banProtest')}: ${this.currentBan.user.username}`;
      (await openapi).forum_createThread(null, data).then(() => {
        this.$refs.protestBanDialog.close();
        this.fetchData();
        this.$notify({
          title: this.$t('_forum.messages.addedThread'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.protestBanDialog.setError(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
