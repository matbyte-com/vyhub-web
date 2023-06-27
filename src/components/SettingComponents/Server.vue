<template>
  <div>
    <SettingTitle docPath="/guide/serverbundle">
      {{ $t('_settings.serverAndServerbundle') }}
    </SettingTitle>
    <v-row>
      <v-col cols="12">
        <v-card outlined flat class="fill-height transparent">
          <v-card-text>
            <SettingTitle :divider="false" doc-path="/guide/serverbundle">
              {{ $t('serverbundle') }}
            </SettingTitle>
            <v-simple-table>
              <thead>
              <tr>
                <th>{{ $t('name') }}</th>
                <th>{{ $t('type') }}</th>
                <th>{{ $t('_settings.multigroup') }}</th>
                <th>{{ $t('_settings.defaultGroup') }}</th>
                <th style="width: 200px" class="text-right">{{ $t('actions') }}</th>
              </tr>
              </thead>
              <draggable :list="bundles" tag="tbody"
                         @change="updateBundleEnabled = true">
                <tr v-for="bundle in bundles" :key="bundle.id">
                  <td>
                    <v-chip :color="bundle.color ? bundle.color : '#000000'"
                            :text-color="$vuetify.theme.dark ? 'white' : 'black'"
                            outlined>
                      <v-icon left>{{ bundle.icon }}</v-icon>
                      {{ bundle.name }}
                    </v-chip>
                  </td>
                  <td>
                    {{ bundle.server_type }}
                  </td>
                  <td>
                    <BoolIcon :value="bundle.multigroup" />
                  </td>
                  <td>
                  <span v-if="bundle.default_group">
                    {{ bundle.default_group.name }}
                  </span>
                  </td>
                  <td class="text-right">
                    <v-btn outlined color="info" small class="mr-1"
                           :disabled="bundle.server_type === 'DISCORD' ||
                        bundle.server_type === 'TEAMSPEAK3'"
                           @click="showAPIKeysDialog(bundle)">
                      <v-icon>
                        mdi-key-chain
                      </v-icon>
                    </v-btn>
                    <v-btn outlined color="primary" small
                           @click="openEditBundleDialog(bundle)" class="mr-1">
                      <v-icon>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn outlined color="error" small @click="openDeleteBundleDialog(bundle)">
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </draggable>
            </v-simple-table>
            <v-divider />
            <div class="text-right mt-3">
              <v-btn color="success" @click="$refs.addBundleDialog.show()" outlined
                     :class="{ 'glow-effect':utils.customerJourneyActive('add-bundle') }">
                <v-icon left>mdi-plus</v-icon>
                <span>{{ $t('_settings.labels.addBundle') }}</span>
              </v-btn>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs}">
                  <v-btn outlined color="primary" class="ml-5" v-on="on" v-bind="attrs"
                         style="border-top-right-radius: 0; border-bottom-right-radius: 0"
                         @click="updateBundleOrder" :disabled="!updateBundleEnabled">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </template>
                <span>
                    {{ $t('_settings.labels.updateOrder') }}
                  </span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs}">
                  <v-btn outlined color="primary" v-on="on" v-bind="attrs"
                         style="border-bottom-left-radius: 0; border-top-left-radius: 0"
                         @click="fetchData" :disabled="!updateBundleEnabled">
                    <v-icon>mdi-backspace-outline</v-icon>
                  </v-btn>
                </template>
                <span>
                {{ $t('_settings.labels.resetOrder') }}
              </span>
              </v-tooltip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Server -->
      <v-col>
        <v-card outlined flat class="fill-height transparent">
          <v-card-text>
            <DataTable
              :headers="gameserverHeaders"
              :items="server"
              :showSearch="true"
            >
              <template v-slot:header>
                <SettingTitle :divider="false" doc-path="/guide/server">
                  {{ $t('_settings.gameserver') }}
                </SettingTitle>
              </template>
              <template v-slot:item.serverbundle_id="{ item }">
                {{ getBundle(item) }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn depressed color="success" small class="mr-1"
                       :class="{ 'glow-effect':utils.customerJourneyActive('connect-server') }"
                       @click="showServerSetupDialog(item);" :outlined="item.status === 'ONLINE'">
                  <v-icon :left="item.status !== 'ONLINE'">
                    mdi-download-network
                  </v-icon>
                  <span v-if="item.status !== 'ONLINE'">
                    {{ $t('setup') }}
                  </span>
                </v-btn>
                <v-btn outlined color="primary" small class="mr-1"
                       @click="openEditServerDialog(item)">
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
                <v-tooltip bottom :disabled="bundles !== null && bundles.length !== 0">
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs"
                         v-on="on">
                      <v-btn color="success" outlined @click="$refs.createServerDialog.show()"
                             :disabled="bundles === null || bundles.length === 0"
                             :class="{ 'glow-effect':
                             utils.customerJourneyActive('add-server') }">
                        <v-icon left>mdi-plus</v-icon>
                        <span>{{ $t('_settings.labels.addServer') }}</span>
                      </v-btn>
                    </div>
                  </template>
                  <span>
                    {{ $t('_settings.addServerTooltip') }}
                  </span>
                </v-tooltip>
              </template>
            </DataTable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Dialog icon="mdi-download-network" :title="$t('_server.labels.setup')" :max-width="700"
            ref="serverSetupDialog">
      <div>
        <ServerSetup ref="serverSetup" :server="serverSetupServer"></ServerSetup>
      </div>
    </Dialog>
    <Dialog icon="mdi-key-chain" :title="$t('_serverbundle.labels.apiKeys')" :max-width="500"
            ref="bundleApiKeysDialog" :with-id="true">
      <v-card class="mt-2" v-if="createdToken != null" color="success">
        <v-card-subtitle>
          <div class="subtitle-2">
            {{ $t('_api.labels.createdKey') }}:
          </div>
          <div class="font-weight-bold">
            <v-text-field
              @focus="$event.target.select()"
              append-icon="mdi-content-copy"
              @click:append="utils.textToClipboard(createdToken.access_token);"
              readonly :value="createdToken.access_token">
            </v-text-field>
          </div>
          <div>
            {{ createdToken.name }}
          </div>
        </v-card-subtitle>
        <v-card-text>
          <div class="subtitle-2">
            {{ $t('properties') }}:
          </div>
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
          <div class="subtitle-2">
            {{ $t('properties') }}:
          </div>
          <div>
            {{ token.scope }}
          </div>
        </v-card-text>
      </v-card>
      <h6 class="text-h6 mb-2 mt-3">{{ $t('_serverbundle.labels.createApiKey') }}</h6>
      <GenForm :cancel-text="null" :submit-text="$t('create')" :form-schema="createTokenSchema"
               @submit="createToken" ref="createTokenForm">
        <template v-slot:custom-properties="context">
          <PropertyPicker class="mb-3" v-bind="context"/>
        </template>
      </GenForm>
    </Dialog>
    <DialogForm ref="addBundleDialog"
                :form-schema="addBundleSchema"
                @submit="addBundle"
                icon="mdi-server"
                :title="$t('_settings.labels.addBundle')"/>
    <DialogForm ref="createServerDialog"
                :form-schema="serverSchema"
                icon="mdi-server"
                @submit="createServer"
                :title="$t('_server.labels.create')"
                @updated="createServerDataTemp=$refs.createServerDialog.getData()">
      <template v-slot:form-after
                v-if="createServerDataTemp && createServerDataTemp.type === 'DISCORD'">
        <a target="_blank" href="https://docs.vyhub.net/latest/game/discord/">
          {{$t('_server.labels.guildIdDocs')}}
        </a>
        <span v-if="discordApplicationId">
          <a target="_blank" style="float: right" :href="getDiscordBotLink">
            {{$t('_server.labels.addBot')}}
          </a>
        </span>
        <span v-else style="float: right">
          <a target="_blank" href="https://docs.vyhub.net/latest/guide/authorization">
            {{$t('_server.labels.discordApplicationIdNeeded')}}
          </a>
        </span>
      </template>
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deleteBundleDialog"
      :countdown="true"
      @submit="deleteBundle">
      <v-alert type="error" class="mt-3">
        {{ $t('_server.deleteServerbundleConfirmationText') }}
      </v-alert>
    </DeleteConfirmationDialog>
    <DeleteConfirmationDialog
      ref="deleteServerDialog"
      @submit="deleteServer"/>
    <DialogForm ref="editBundleDialog"
                icon="mdi-server"
                :form-schema="editBundleSchema"
                @submit="editBundle"
                :title="$t('_settings.labels.editBundle')"/>
    <DialogForm ref="editServerDialog"
                :form-schema="serverSchema"
                icon="mdi-server"
                @submit="editServer"
                :title="$t('_server.labels.edit')"
                @updated="createServerDataTemp=$refs.editServerDialog.getData()">
      <template v-slot:form-after
                v-if="createServerDataTemp && createServerDataTemp.type === 'DISCORD'">
        <a target="_blank" href="https://docs.vyhub.net/latest/game/discord/">
          <v-btn small color="info">
            <v-icon left>
              mdi-magnify
            </v-icon>
            {{$t('_server.labels.guildIdDocs')}}
          </v-btn>
        </a>
      </template>
    </DialogForm>
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
import ServerForm from '@/forms/ServerForm';
import PropertyPicker from '@/components/SettingComponents/PropertyPicker.vue';
import ServerSetup from '@/components/SettingComponents/ServerSetup.vue';
import EventBus from '@/services/EventBus';
import Dialog from '../Dialog.vue';
import BoolIcon from '../BoolIcon.vue';

export default {
  name: 'Server',
  components: {
    ServerSetup,
    GenForm,
    Dialog,
    SettingTitle,
    BoolIcon,
    DeleteConfirmationDialog,
    DialogForm,
    DataTable,
    PropertyPicker,
  },
  data() {
    return {
      icon: 'mdi-access-point',
      bundles: null,
      server: null,
      dataFetched: 0,
      gameserverHeaders: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('type'), value: 'type' },
        { text: this.$t('ipAddress'), value: 'address' },
        { text: this.$t('port'), value: 'port' },
        { text: this.$t('bundle'), value: 'serverbundle.name' },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right', width: 250,
        },
      ],
      addBundleSchema: ServerbundleForm.returnForm(),
      serverSchema: ServerForm,
      editBundleSchema: null,
      createTokenSchema: ServerbundleAPITokenForm,
      activeBundle: null,
      apiKeys: null,
      serverSetupServer: null,
      createdToken: null,
      createServerDataTemp: null,
      updateBundleEnabled: false,
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
    showServerSetupDialog(server) {
      this.serverSetupServer = server;
      this.$refs.serverSetupDialog.show();
      this.$nextTick(() => {
        this.$refs.serverSetup.init();
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
        // Event caught in CustomerJourney.vue
        EventBus.emit('customerJourneyUpdate');
      }).catch((err) => {
        this.$refs.addBundleDialog.setError(err);
      });
    },
    async createServer() {
      const api = await openapi;

      const data = this.$refs.createServerDialog.getData();

      if (Object.keys(data.secrets).length === 0) {
        delete data.secrets;
      }

      api.server_createServer(null, data).then(() => {
        this.fetchData();
        this.$refs.createServerDialog.closeAndReset();
        this.$notify({
          title: this.$t('_server.messages.createSuccess'),
          type: 'success',
        });
        // Event caught in CustomerJourney.vue
        EventBus.emit('customerJourneyUpdate');
      }).catch((err) => {
        this.$refs.createServerDialog.setError(err);
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
          title: this.$t('_serverbundle.messages.deleteSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.deleteBundleDialog.setError(err);
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
        this.$refs.deleteServerDialog.setError(err);
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
        this.$refs.editBundleDialog.setError(err);
      });
    },
    async editServer(server) {
      const data = this.$refs.editServerDialog.getData();
      if (server.type === 'TEAMSPEAK3') {
        if (data.secrets?.username === '***') {
          delete data.secrets.username;
        }
        if (data.secrets?.password === '***') {
          delete data.secrets.password;
        }
      }

      if (Object.keys(data.secrets).length === 0) {
        delete data.secrets;
      }

      (await openapi).server_editServer(server.id, data).then(() => {
        this.fetchData();
        this.$refs.editServerDialog.closeAndReset();
        this.$notify({
          title: this.$t('_server.messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.editServerDialog.setError(err);
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

      api.general_revokeApiToken(
        { uuid: token.id },
      ).then(() => {
        this.refreshKeys();
      });
    },
    async createToken() {
      const api = await openapi;

      const data = this.$refs.createTokenForm.getData();
      const reqData = {
        serverbundle_id: this.activeBundle.id,
        properties: data.properties.concat(['integration_token']),
        name: data.name,
      };

      api.general_createApiToken(null, reqData).then((rsp) => {
        this.createdToken = rsp.data;
        const { id } = this.$refs.bundleApiKeysDialog;
        const container = document.querySelector(`#${id}`);
        container.scrollTop = 0;
      }).catch((err) => {
        this.$refs.createTokenForm.setError(err);
      });
    },
    openEditServerDialog(item) {
      this.$refs.editServerDialog.show(item);
      const data = { ...item };
      if (data.type === 'TEAMSPEAK3') {
        data.secrets = {};
        data.secrets.password = '***';
        data.secrets.username = '***';
      }
      this.$refs.editServerDialog.setData(data);
    },
    async updateBundleOrder() {
      const res = [];
      this.bundles.forEach((item) => {
        res.push(item.id);
      });
      (await openapi).server_updateBundleOrder(null, res).then(() => {
        this.fetchData();
        this.updateBundleEnabled = false;
        this.$notify({
          title: this.$t('_settings.messages.orderUpdated'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(`${err}`);
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
