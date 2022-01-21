<template>
  <div>
    <SettingTitle docPath="/guide/serverbundle">
      {{ $t('_settings.serverAndServerbundle') }}
    </SettingTitle>
    <v-row>
      <v-col cols="12">
        <v-card outlined flat class="fill-height transparent">
          <v-card-text>
            <DataTable
              :headers="bundleHeaders"
              :items="bundles"
              :showSearch="true">
              <template v-slot:header>
                <SettingTitle :divider="false">
                  {{ $t('serverbundle') }}
                </SettingTitle>
              </template>
              <template v-slot:item.name="{ item }">
                <v-chip :color="item.color ? item.color : '#000000'"
                        :text-color="$vuetify.theme.dark ? 'white' : 'black'"
                        outlined>
                  <v-icon left>{{ item.icon }}</v-icon>
                  {{ item.name }}
                </v-chip>
              </template>
              <template v-slot:item.multigroup="{ item }">
                <BoolIcon :value="item.multigroup" />
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn outlined color="info" small class="mr-1"
                       @click="showAPIKeysDialog(item)">
                  <v-icon>
                    mdi-key-chain
                  </v-icon>
                </v-btn>
                <v-btn outlined color="primary" small
                       @click="openEditBundleDialog(item)" class="mr-1">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn outlined color="error" small @click="openDeleteBundleDialog(item)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </template>
              <template v-slot:footer-right>
                <v-btn color="success" @click="$refs.addBundleDialog.show()" outlined>
                  <v-icon left>mdi-plus</v-icon>
                  <span>{{ $t('settings.labels.addBundle') }}</span>
                </v-btn>
              </template>
            </DataTable>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined flat class="fill-height transparent">
          <v-card-text>
            <DataTable
              :headers="gameserverHeaders"
              :items="server"
              :showSearch="true"
            >
              <template v-slot:header>
                <SettingTitle :divider="false">
                  {{ $t('settings.gameserver') }}
                </SettingTitle>
              </template>
              <template v-slot:item.serverbundle_id="{ item }">
                {{ getBundle(item) }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn outlined color="primary" small class="mr-1"
                       @click="$refs.editServerDialog.show(item, item);">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn outlined color="error" small @click="openDeleteServerDialog(item)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </template>
              <template v-slot:footer-right>
                <v-btn color="success" outlined @click="$refs.createServerDialog.show()">
                  <v-icon left>mdi-plus</v-icon>
                  <span>{{ $t('settings.labels.addServer') }}</span>
                </v-btn>
              </template>
            </DataTable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Dialog icon="mdi-key-chain" :title="$t('_serverbundle.labels.apiKeys')" :max-width="500"
            ref="bundleApiKeysDialog">
      <v-card class="mt-2" v-if="createdToken != null" color="success">
        <v-card-subtitle>
          <div class="font-weight-bold">{{ createdToken.access_token }}</div>
          <div>
            {{ createdToken.name }}
          </div>
        </v-card-subtitle>
        <v-card-text>
          <div>
            {{ createdToken.scope }}
          </div>
        </v-card-text>
      </v-card>
      <v-card v-for="token in apiKeys" v-bind:key="token.id" class="mt-2">
        <v-card-subtitle class="d-flex justify-space-between">
          <span>
            <div>
              <div class="font-weight-bold ">
                {{ token.access_token_hidden }}
              </div>
              <div>
                {{ token.name }}
              </div>
            </div>
            <v-chip color="warning" small v-if="token.revoked" class="ml-3">
              {{ $t('revoked') }}
            </v-chip>
          </span>
          <span v-if="!token.revoked">
            <v-btn color="warning" text small depressed @click="revokeToken(token)">
              <v-icon>
                mdi-cancel
              </v-icon>
            </v-btn>
          </span>
        </v-card-subtitle>
        <v-card-text>
          <div>
            {{ token.scope }}
          </div>
        </v-card-text>
      </v-card>
      <h6 class="text-h6 mb-2 mt-3">{{ $t('_serverbundle.labels.createApiKey') }}</h6>
      <GenForm :cancel-text="null" :submit-text="$t('create')" :form-schema="createTokenSchema"
               @submit="createToken" ref="createTokenForm">

      </GenForm>
    </Dialog>
    <DialogForm ref="addBundleDialog"
                :form-schema="addBundleSchema"
                @submit="addBundle"
                icon="mdi-server"
                :title="$t('settings.labels.addBundle')"/>
    <DialogForm ref="createServerDialog"
                :form-schema="serverSchema"
                icon="mdi-server"
                @submit="createServer"
                :title="$t('_server.labels.create')"/>
    <DeleteConfirmationDialog
      ref="deleteBundleDialog"
      @submit="deleteBundle">
      <v-alert type="warning" class="mt-3">
        {{ $t('_server.deleteBundleConfirmationText') }}
      </v-alert>
    </DeleteConfirmationDialog>
    <DeleteConfirmationDialog
      ref="deleteServerDialog"
      @submit="deleteServer"/>
    <DialogForm ref="editBundleDialog"
                icon="mdi-server"
                :form-schema="editBundleSchema"
                @submit="editBundle"
                :title="$t('settings.labels.editBundle')"/>
    <DialogForm ref="editServerDialog"
                :form-schema="serverSchema"
                icon="mdi-server"
                @submit="editServer"
                :title="$t('_server.labels.edit')"/>
  </div>
</template>

<script>
import DialogForm from '@/components/DialogForm.vue';
import ServerbundleForm from '@/forms/ServerbundleForm';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import DataTable from '@/components/DataTable.vue';
import SettingTitle from '@/components/SettingComponents/SettingTitle.vue';
import GenForm from '@/components/GenForm.vue';
import ServerbundleAPITokenForm from '@/forms/ServerbundleAPITokenForm';
import openapi from '@/api/openapi';
import BoolIcon from '../BoolIcon.vue';
import Dialog from '../Dialog.vue';
import ServerForm from '@/forms/ServerForm';

export default {
  name: 'Server',
  components: {
    GenForm,
    Dialog,
    SettingTitle,
    BoolIcon,
    DeleteConfirmationDialog,
    DialogForm,
    DataTable,
  },
  data() {
    return {
      icon: 'mdi-access-point',
      bundles: [],
      server: [],
      dataFetched: 0,
      bundleHeaders: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('type'), value: 'server_type' },
        { text: this.$t('settings.multigroup'), value: 'multigroup' },
        { text: this.$t('settings.defaultGroup'), value: 'default_group.name' },
        {
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false, width: 250,
        },
      ],
      gameserverHeaders: [
        { text: this.$t('id'), value: 'id' },
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('type'), value: 'type' },
        { text: this.$t('ipAddress'), value: 'address' },
        { text: this.$t('port'), value: 'port' },
        { text: this.$t('bundle'), value: 'serverbundle.name' },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right', width: 150,
        },
      ],
      addBundleSchema: ServerbundleForm.returnForm(),
      serverSchema: ServerForm,
      editBundleSchema: null,
      createTokenSchema: ServerbundleAPITokenForm,
      activeBundle: null,
      apiKeys: null,
      createdToken: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).server_getBundles().then((rsp) => {
        this.bundles = rsp.data;
        this.dataFetched += 1;
      });
      (await openapi).server_getServers().then((rsp) => {
        this.server = rsp.data;
        this.dataFetched += 1;
      });
    },
    getBundle(item) {
      if (this.dataFetched !== 2) { return ''; }
      if (item.serverbundle_id) {
        return this.bundles.find((b) => b.id === item.serverbundle_id).name;
      }
      return '-';
    },
    async addBundle() {
      const data = this.$refs.addBundleDialog.getData();
      data.default_group_id = (data.default_group != null ? data.default_group.id : null);
      (await openapi).server_addBundle(null, data).then(() => {
        this.fetchData();
        this.$refs.addBundleDialog.closeAndReset();
        this.$notify({
          title: this.$t('_serverbundle.messages.createSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addBundleDialog.setErrorMessage(err.response.data.detail);
      });
    },
    async createServer() {
      const api = await openapi;

      const data = this.$refs.createServerDialog.getData();

      api.server_createServer(null, data).then(() => {
        this.fetchData();
        this.$refs.createServerDialog.closeAndReset();
        this.$notify({
          title: this.$t('_server.messages.createSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.createServerDialog.setErrorMessage(err.response.data.detail);
      });
    },
    openDeleteBundleDialog(item) {
      this.$refs.deleteBundleDialog.show(item);
    },
    openDeleteServerDialog(item) {
      this.$refs.deleteServerDialog.show(item);
    },
    async deleteBundle(bundle) {
      (await openapi).server_deleteBundle(bundle.id).then(() => {
        this.$refs.deleteBundleDialog.closeAndReset();
        this.fetchData();
        this.$notify({
          title: this.$t('_serverbundle.messages.createSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.deleteBundleDialog.setErrorMessage(err.response.data.detail);
      });
    },
    async deleteServer(server) {
      (await openapi).server_deleteServer(server.id).then(() => {
        this.$refs.deleteServerDialog.closeAndReset();
        this.fetchData();
        this.$notify({
          title: this.$t('_server.messages.deleteSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.deleteServerDialog.setErrorMessage(err.response.data.detail);
      });
    },
    openEditBundleDialog(bundle) {
      // set "old" data
      const obj = bundle;
      if (bundle.default_group) obj.defaultGroup = bundle.default_group.id;
      // render correct form
      this.editBundleSchema = ServerbundleForm.returnForm(true, String(bundle.server_type));
      // open and show dialog
      this.$refs.editBundleDialog.setData(obj);
      this.$refs.editBundleDialog.show(bundle);
    },
    async editBundle(bundle) {
      const data = this.$refs.editBundleDialog.getData();
      data.default_group_id = (data.default_group != null ? data.default_group.id : null);
      (await openapi).server_editBundle(bundle.id, data).then(() => {
        this.fetchData();
        this.$refs.editBundleDialog.closeAndReset();
        this.$notify({
          title: this.$t('_serverbundle.messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.editBundleDialog.setErrorMessage(err.response.data.detail);
      });
    },
    async editServer(server) {
      const data = this.$refs.editServerDialog.getData();

      (await openapi).server_editServer(server.id, data).then(() => {
        this.fetchData();
        this.$refs.editServerDialog.closeAndReset();
        this.$notify({
          title: this.$t('_server.messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.editServerDialog.setErrorMessage(err.response.data.detail);
      });
    },
    showAPIKeysDialog(bundle) {
      this.createdToken = null;
      this.activeBundle = bundle;
      this.refreshKeys();
      this.$refs.bundleApiKeysDialog.show();
    },
    async refreshKeys() {
      const api = await openapi;

      api.server_getBundleTokens({ uuid: this.activeBundle.id }).then((rsp) => {
        this.apiKeys = rsp.data;
      });
    },
    async revokeToken(token) {
      const api = await openapi;

      api.server_revokeBundleToken(
        { uuid: token.serverbundle.id, token_id: token.id },
      ).then(() => {
        this.refreshKeys();
      });
    },
    async createToken() {
      const api = await openapi;

      const data = this.$refs.createTokenForm.getData();

      api.server_createBundleToken({ uuid: this.activeBundle.id }, data).then((rsp) => {
        this.createdToken = rsp.data;
      }).catch((err) => {
        this.$refs.createTokenForm.setErrorMessage(err.response.data.detail);
      });
    },
  },
  watch: {
    async activeBundle() {
      this.refreshKeys();
    },
  },
};
</script>

<style scoped>

</style>
