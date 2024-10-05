<template>
  <div>
    <PageTitleFlat
      :title="$t('_ban.labels.title')"
      :hide-triangle="true"
      :no-bottom-border-radius="$vuetify.display.smAndDown"
    />
    <v-card
      class="vh-ban card-rounded-bottom"
      flat
      :class="{ 'mt-4 card-rounded-top':!$vuetify.display.smAndDown,
                'no-top-border-radius': $vuetify.display.smAndDown }"
    >
      <v-card-text>
        <PaginatedDataTable
          ref="banTable"
          :headers="headers"
          :items="bans"
          default-sort-by="created_on"
          :default-sort-desc="true"
          :total-items="totalItems"
          @reload="fetchData"
          @click:row="showDetails"
        >
          <template #header>
            <v-row>
              <v-col class="d-flex align-center">
                <v-menu
                  location="bottom"
                  :close-on-content-click="false"
                >
                  <template #activator="{ props }">
                    <v-btn
                      variant="outlined"
                      color="primary"

                      v-bind="props"
                    >
                      <v-icon start>
                        mdi-filter
                      </v-icon>
                      {{ $t('bundle') }}
                    </v-btn>
                  </template>
                  <v-checkbox
                    v-for="(bundle, index) in bundles"
                    :key="index"
                    v-model="selectedBundles"
                    class="ml-2, mr-2"
                    hide-details
                    :label="bundle.name"
                    :value="bundle.id"
                    @update:model-value="fetchData()"
                  />
                  <a
                    class="ma-1"
                    @click="selectedBundles = []; fetchData()"
                  >
                    {{ $t('reset') }}</a>
                </v-menu>
                <v-alert
                  v-if="$route.query.user_id"
                  type="info"
                  color="primary"
                  density="compact"
                  class="mt-4 ml-3"
                >
                  {{ $t('_ban.messages.showingUserBans', { id: $route.query.user_id }) }}
                </v-alert>
              </v-col>
            </v-row>
          </template>
          <template
            v-if="$checkProp('ban_edit')"
            #footer-right
          >
            <v-btn
              variant="outlined"
              color="success"
              @click="openAddBanDialog()"
            >
              <v-icon start>
                mdi-plus
              </v-icon>
              <span>{{ $t('_ban.labels.add') }}</span>
            </v-btn>
          </template>
          <template #item.color-status="{ item }">
            <v-sheet
              :color="banRowFormatter(item)"
              height="95%"
              width="10px"
              style="margin-left: -15px"
            />
          </template>
          <template #item.user="{ item }">
            <span v-if="$vuetify.display.xs">
              <UserLink
                :user="item.user"
                :color="banRowFormatter(item)"
              />
            </span>
            <span v-else>
              <UserLink :user="item.user" />
            </span>
          </template>
          <template #item.length="{ item }">
            <span>
              {{ utils.formatLength(item['length']) }}
            </span>
          </template>
          <template #item.creator="{ item }">
            <UserLink :user="item.creator" />
          </template>
          <template #item.created_on="{ item }">
            <span>{{ new Date(item.created_on).toLocaleString() }}</span>
          </template>
          <template #item.actions="{ item }">
            <v-btn
              variant="flat"
              size="small"
              color="error"
              @click="showDetails(null, { item: item })"
            >
              <v-icon start>
                mdi-eye
              </v-icon>
              {{ $t('details') }}
            </v-btn>
          </template>
        </PaginatedDataTable>
      </v-card-text>
    </v-card>
    <DialogForm
      ref="banAddDialog"
      :form-schema="banAddFormSchema"
      :title="$t('_ban.labels.add')"
      :submit-text="$t('create')"
      icon="mdi-account-cancel"
      @submit="addBan"
    />
    <Dialog
      ref="banDetailDialog"
      v-model="banDetailShown"
      icon="mdi-account-cancel"
      :title="$t('_ban.labels.details')"
      :max-width="800"
    >
      <template #default>
        <h6 class="text-h6 mb-2  mt-3">
          {{ $t('details') }}
        </h6>
        <div v-if="currentBan != null">
          <v-table>
            <template #default>
              <tbody>
                <tr
                  v-for="raw in ['id', 'reason']"
                  :key="raw"
                >
                  <td>{{ $t(raw) }}</td>
                  <td>{{ currentBan[raw] }}</td>
                </tr>
                <tr>
                  <td>{{ $t('user') }}</td>
                  <td><UserLink :user="currentBan.user" /></td>
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
                  <td><UserLink :user="currentBan.creator" /></td>
                </tr>
                <tr>
                  <td>{{ $t('createdOn') }}</td>
                  <td>{{ new Date(currentBan.created_on).toLocaleString() }}</td>
                </tr>
                <tr>
                  <td>{{ $t('status') }}</td>
                  <td v-if="currentBan.active">
                    <v-chip
                      class="text-white"
                      color="green"
                    >
                      {{ $t('active') }}
                    </v-chip>
                  </td>
                  <td v-else-if="currentBan.status === 'UNBANNED'">
                    <v-chip
                      class="text-white"
                      color="orange"
                    >
                      {{ $t('_ban.labels.unbanned') }}
                    </v-chip>
                  </td>
                  <td v-else>
                    <v-chip
                      class="text-white"
                      color="red"
                    >
                      {{ $t('expired') }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-table>
          <br>
          <div
            v-if="currentBan.protests && currentBan.protests.length > 0
              && ($checkProp('ban_edit') ||
                $checkLinked($store.getters.user, currentBan.user))"
            style="width: 100%"
          >
            <h6 class="text-h6 mb-2  mt-3">
              {{ $t('_ban.labels.banProtests') }}
            </h6>
            <v-table>
              <tbody>
                <tr
                  v-for="protest in currentBan.protests"
                  :key="protest.id"
                  style="cursor: pointer;"
                  @click="$router.push({ name: 'TicketThread', params: { id: protest.id } })"
                >
                  <td>{{ utils.formatDate(protest.created) }}</td>
                  <td class="text-right text-uppercase">
                    <v-chip :color="protest.status === 'OPEN' ? 'success' : 'error'">
                      {{ $t(`_forum.status.${protest.status.toLowerCase()}`) }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <br>
          <div v-if="$checkProp('ban_comment_show')">
            <div class="d-flex align-center">
              <h6 class="text-h6 mb-5">
                {{ $t('comments') }}
              </h6>
              <v-spacer />
              <v-btn
                variant="outlined"
                color="success"
                @click="$refs.banCommentsTable.$refs.commentAddDialog.show()"
              >
                <v-icon start>
                  mdi-plus
                </v-icon>
                {{ $t('comment') }}
              </v-btn>
            </div>
            <CommentsTable
              ref="banCommentsTable"
              type="ban"
              :obj-id="currentBan.id"
              :show-search="false"
              :no-add-btn="true"
            />
          </div>
          <br>
          <div v-if="$checkProp('ban_log_show')">
            <h6 class="text-h6 mb-2">
              {{ $t('log') }}
            </h6>
            <div v-if="logsShown">
              <LogTable
                ref="banLogTable"
                type="ban"
                :obj-id="currentBan.id"
                :show-search="false"
              />
            </div>
            <div v-else>
              <v-btn
                variant="text"
                color="primary"
                @click="logsShown = true"
              >
                <v-icon start>
                  mdi-eye
                </v-icon>
                {{ $t('show') }}
              </v-btn>
            </div>
          </div>
        </div>
      </template>
      <template #actions>
        <div
          v-if="currentBan != null
            && $store.getters.isLoggedIn
            && $checkLinked($store.getters.user, currentBan.user)
            && currentBan.active"
        >
          <v-btn
            v-if="config && config.ban_protest_url"
            :href="config.ban_protest_url"
            variant="text"
            color="primary"
          >
            <v-icon start>
              mdi-fencing
            </v-icon>
            {{ $t('_ban.labels.protestBan') }}
          </v-btn>
          <v-btn
            v-else-if="$store.getters.generalConfig
              && $store.getters.generalConfig['enable_ticket']"
            variant="text"
            color="primary"
            target="_blank"
            @click="showProtestBanDialog"
          >
            <v-icon start>
              mdi-fencing
            </v-icon>
            {{ $t('_ban.labels.protestBan') }}
          </v-btn>
        </div>
        <div v-if="currentBan != null && $checkProp('ban_edit')">
          <v-btn
            variant="text"
            color="primary"
            @click="showEditDialog"
          >
            <v-icon start>
              mdi-pencil
            </v-icon>
            {{ $t('edit') }}
          </v-btn>
          <v-btn
            v-if="currentBan.status === 'ACTIVE'"
            variant="text"
            color="warning-darken-2"
            @click="unbanBan"
          >
            <v-icon start>
              mdi-lock-open
            </v-icon>
            {{ $t('_ban.labels.unban') }}
          </v-btn>
          <v-btn
            v-if="currentBan.status === 'UNBANNED'"
            variant="text"
            color="warning"
            @click="rebanBan"
          >
            <v-icon start>
              mdi-lock
            </v-icon>
            {{ $t('_ban.labels.reban') }}
          </v-btn>
          <v-btn
            variant="text"
            color="error"
            @click="showDeleteDialog"
          >
            <v-icon start>
              mdi-delete
            </v-icon>
            {{ $t('delete') }}
          </v-btn>
        </div>
      </template>
    </Dialog>
    <DialogForm
      ref="banEditDialog"
      :form-schema="banEditFormSchema"
      :title="$t('_ban.labels.edit')"
      :submit-text="$t('edit')"
      icon="mdi-account-cancel"
      @submit="editBan"
    />
    <DeleteConfirmationDialog
      ref="deleteBanDialog"
      @submit="deleteBan"
    />
    <ThreadAddDialog
      ref="protestBanDialog"
      :dialog-title="$t('_ban.labels.protestBan')"
      :hide-title-input="true"
      @submit="protestBan"
    />
  </div>
</template>

<script>
import banAddFormSchema from '@/forms/BanAddForm';
import banEditFormSchema from '@/forms/BanEditForm';
import openapiCached from '@/api/openapiCached';
import openapi from '../api/openapi';

export default {
  props: ['banId'],
  data() {
    return {
      headers: [
        { key: 'color-status', sortable: false, width: '1px' },
        { title: this.$t('user'), key: 'user', sortable: false },
        { title: this.$t('reason'), key: 'reason' },
        { title: this.$t('bundle'), key: 'serverbundle.name', sortable: false },
        { title: this.$t('length'), key: 'length' },
        { title: this.$t('creator'), key: 'creator', sortable: false },
        { title: this.$t('createdOn'), key: 'created_on' },
        {
          title: this.$t('actions'), key: 'actions', align: 'right', sortable: false,
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
  computed: {
    banDetailShown: {
      get() {
        return this.banId != null && (!this.$refs.banEditDialog
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
  watch: {
    $route() {
      this.updateCurrentBan();
    },
  },
  beforeMount() {
    this.getBundles();
    this.getConfig();
    this.fetchData();
  },
  methods: {
    async updateCurrentBan() {
      const api = await openapi;

      if (this.banId != null) {
        api.ban_getBan({ uuid: this.banId }).then((rsp) => {
          this.currentBan = rsp.data;
        }).catch(() => {
          this.currentBan = null;
        });
      } else {
        this.currentBan = null;
      }
    },
    async fetchData(queryParams = null) {
      await this.updateCurrentBan();

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
      const add = (this.$vuetify.theme.current.dark ? 'darken-4' : '');

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
          title: this.$t('_messages.addSuccess'),
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
          title: this.$t('_messages.editSuccess'),
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
          title: this.$t('_messages.deleteSuccess'),
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
          title: this.$t('_messages.toggleSuccess'),
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
          title: this.$t('_messages.toggleSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    openAddBanDialog() {
      const { user_id } = this.$route.query;
      if (user_id) {
        this.$refs.banAddDialog.setData({ user: { id: user_id } });
      }
      this.$refs.banAddDialog.show();
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
    showDetails(event, row) {
      this.$router.push({ name: 'Bans', params: { banId: row.item.id } });
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
          title: this.$t('_messages.addSuccess'),
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
