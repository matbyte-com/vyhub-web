<template>
  <div>
    <SettingTitle doc-path="/guide/serverbundle">
      {{ $t('_settings.serverAndServerbundle') }}
    </SettingTitle>
    <v-row>
      <v-col cols="12">
        <v-card
          border
          flat
          class="fill-height bg-transparent"
        >
          <v-card-text>
            <SettingTitle
              :divider="false"
              doc-path="/guide/serverbundle"
            >
              {{ $t('serverbundle') }}
            </SettingTitle>
            <v-table>
              <thead>
                <tr>
                  <th>{{ $t('name') }}</th>
                  <th>{{ $t('type') }}</th>
                  <th>{{ $t('_settings.multigroup') }}</th>
                  <th>{{ $t('_settings.defaultGroup') }}</th>
                  <th
                    style="width: 200px"
                    class="text-right"
                  >
                    {{ $t('actions') }}
                  </th>
                </tr>
              </thead>
              <draggable
                :list="bundles"
                tag="tbody"
                @change="updateBundleEnabled = true"
              >
                <tr
                  v-for="bundle in bundles"
                  :key="bundle.id"
                >
                  <td>
                    <v-chip
                      :color="bundle.color ? bundle.color : '#000000'"
                      :text-color="$vuetify.theme.dark ? 'white' : 'black'"
                      variant="outlined"
                    >
                      <v-icon start>
                        {{ bundle.icon }}
                      </v-icon>
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
                    <v-btn
                      variant="outlined"
                      color="info"
                      size="small"
                      class="mr-1"
                      :disabled="bundle.server_type === 'DISCORD' ||
                        bundle.server_type === 'TEAMSPEAK3'"
                      @click="showAPIKeysDialog(bundle)"
                    >
                      <v-icon>
                        mdi-key-chain
                      </v-icon>
                    </v-btn>
                    <v-btn
                      variant="outlined"
                      color="primary"
                      size="small"
                      class="mr-1"
                      @click="openEditBundleDialog(bundle)"
                    >
                      <v-icon>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn
                      variant="outlined"
                      color="error"
                      size="small"
                      @click="openDeleteBundleDialog(bundle)"
                    >
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </draggable>
            </v-table>
            <v-divider />
            <div class="text-right mt-3">
              <v-btn
                color="success"
                variant="outlined"
                :class="{ 'glow-effect':utils.customerJourneyActive('add-bundle') }"
                @click="$refs.addBundleDialog.show()"
              >
                <v-icon start>
                  mdi-plus
                </v-icon>
                <span>{{ $t('_settings.labels.addBundle') }}</span>
              </v-btn>
              <v-tooltip location="bottom">
                <template #activator="{ props}">
                  <v-btn
                    variant="outlined"
                    color="primary"
                    class="ml-5"
                    v-bind="props"
                    style="border-top-right-radius: 0; border-bottom-right-radius: 0"
                    :disabled="!updateBundleEnabled"
                    @click="updateBundleOrder"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </template>
                <span>
                  {{ $t('_settings.labels.updateOrder') }}
                </span>
              </v-tooltip>
              <v-tooltip location="bottom">
                <template #activator="{ props}">
                  <v-btn
                    variant="outlined"
                    color="primary"
                    v-bind="props"
                    style="border-bottom-left-radius: 0; border-top-left-radius: 0"
                    :disabled="!updateBundleEnabled"
                    @click="fetchData"
                  >
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
        <v-card
          border
          flat
          class="fill-height bg-transparent"
        >
          <v-card-text>
            <DataTable
              :headers="gameserverHeaders"
              :items="server"
              :show-search="true"
            >
              <template #header>
                <SettingTitle
                  :divider="false"
                  doc-path="/guide/server"
                >
                  {{ $t('_settings.gameserver') }}
                </SettingTitle>
              </template>
              <template #item.name="{ item }">
                <div :class="{ 'text--disabled': item.hidden }">
                  {{ item.name }}
                </div>
              </template>
              <template #item.serverbundle_id="{ item }">
                {{ getBundle(item) }}
              </template>
              <template #item.actions="{ item }">
                <v-btn
                  variant="flat"
                  color="success"
                  size="small"
                  class="mr-1"
                  :class="{ 'glow-effect':utils.customerJourneyActive('connect-server') }"
                  :variant="item.status === 'ONLINE' ? 'outlined' : undefined"
                  @click="showServerSetupDialog(item);"
                >
                  <v-icon :start="item.status !== 'ONLINE'">
                    mdi-download-network
                  </v-icon>
                  <span v-if="item.status !== 'ONLINE'">
                    {{ $t('setup') }}
                  </span>
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="primary"
                  size="small"
                  class="mr-1"
                  @click="openEditServerDialog(item)"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="error"
                  size="small"
                  @click="openDeleteServerDialog(item)"
                >
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </template>
              <template #footer-right>
                <v-tooltip
                  location="bottom"
                  :disabled="bundles !== null && bundles.length !== 0"
                >
                  <template #activator="{ props }">
                    <div
                      v-bind="props"
                    >
                      <v-btn
                        color="success"
                        variant="outlined"
                        :disabled="bundles === null || bundles.length === 0"
                        :class="{ 'glow-effect':
                          utils.customerJourneyActive('add-server') }"
                        @click="$refs.createServerDialog.show()"
                      >
                        <v-icon start>
                          mdi-plus
                        </v-icon>
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
    <Dialog
      ref="serverSetupDialog"
      icon="mdi-download-network"
      :title="$t('_server.labels.setup')"
      :max-width="700"
    >
      <div>
        <ServerSetup
          ref="serverSetup"
          :server="serverSetupServer"
        />
      </div>

      <template #actions>
        <v-icon start>
          mdi-book-open
        </v-icon>
        <a
          target="_blank"
          href="https://docs.vyhub.net/latest/game/integrations/"
        >
          {{ $t('documentation') }}
        </a>
      </template>
    </Dialog>
    <Dialog
      ref="bundleApiKeysDialog"
      icon="mdi-key-chain"
      :title="$t('_serverbundle.labels.apiKeys')"
      :max-width="500"
      :with-id="true"
    >
      <v-card
        v-if="createdToken != null"
        class="mt-2"
        color="success"
      >
        <v-card-subtitle>
          <div class="text-subtitle-2">
            {{ $t('_api.labels.createdKey') }}:
          </div>
          <div class="font-weight-bold">
            <v-text-field
              append-icon="mdi-content-copy"
              readonly
              :model-value="createdToken.access_token"
              @focus="$event.target.select()"
              @click:append="utils.textToClipboard(createdToken.access_token);"
            />
          </div>
          <div>
            {{ createdToken.name }}
          </div>
        </v-card-subtitle>
        <v-card-text>
          <div class="text-subtitle-2">
            {{ $t('properties') }}:
          </div>
          <div>
            {{ createdToken.scope }}
          </div>
        </v-card-text>
      </v-card>
      <v-card
        v-for="token in apiKeys"
        :key="token.id"
        class="mt-2"
      >
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
            <v-chip
              v-if="token.revoked"
              color="warning"
              size="small"
              class="ml-3"
            >
              {{ $t('revoked') }}
            </v-chip>
          </span>
          <span v-if="!token.revoked">
            <v-btn
              color="warning"
              variant="text"
              size="small"
              variant="flat"
              @click="revokeToken(token)"
            >
              <v-icon>
                mdi-cancel
              </v-icon>
            </v-btn>
          </span>
        </v-card-subtitle>
        <v-card-text>
          <div class="text-subtitle-2">
            {{ $t('properties') }}:
          </div>
          <div>
            {{ token.scope }}
          </div>
        </v-card-text>
      </v-card>
      <h6 class="text-h6 mb-2 mt-3">
        {{ $t('_serverbundle.labels.createApiKey') }}
      </h6>
      <GenForm
        ref="createTokenForm"
        :cancel-text="null"
        :submit-text="$t('create')"
        :form-schema="createTokenSchema"
        @submit="createToken"
      >
        <template #custom-properties="context">
          <PropertyPicker
            class="mb-3"
            v-bind="context"
          />
        </template>
      </GenForm>
    </Dialog>
    <DialogForm
      ref="addBundleDialog"
      :form-schema="addBundleSchema"
      icon="mdi-server"
      :title="$t('_settings.labels.addBundle')"
      @submit="addBundle"
    />
    <DialogForm
      ref="createServerDialog"
      :form-schema="serverSchema"
      icon="mdi-server"
      :title="$t('_server.labels.create')"
      @submit="createServer"
      @updated="createServerDataTemp=$refs.createServerDialog.getData()"
    >
      <template
        v-if="createServerDataTemp && createServerDataTemp.type === 'DISCORD'"
        #form-after
      >
        <a
          target="_blank"
          href="https://docs.vyhub.net/latest/game/discord/"
        >
          {{ $t('_server.labels.guildIdDocs') }}
        </a>
        <span v-if="discordApplicationId">
          <a
            target="_blank"
            style="float: right"
            :href="getDiscordBotLink"
          >
            {{ $t('_server.labels.addBot') }}
          </a>
        </span>
        <span
          v-else
          style="float: right"
        >
          <a
            target="_blank"
            href="https://docs.vyhub.net/latest/guide/authorization"
          >
            {{ $t('_server.labels.discordApplicationIdNeeded') }}
          </a>
        </span>
      </template>
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deleteBundleDialog"
      :countdown="true"
      @submit="deleteBundle"
    >
      <v-alert
        type="error"
        class="mt-3"
      >
        {{ $t('_server.deleteServerbundleConfirmationText') }}
      </v-alert>
    </DeleteConfirmationDialog>
    <DeleteConfirmationDialog
      ref="deleteServerDialog"
      @submit="deleteServer"
    />
    <DialogForm
      ref="editBundleDialog"
      icon="mdi-server"
      :form-schema="editBundleSchema"
      :title="$t('_settings.labels.editBundle')"
      @submit="editBundle"
    />
    <DialogForm
      ref="editServerDialog"
      :form-schema="serverSchema"
      icon="mdi-server"
      :title="$t('_server.labels.edit')"
      @submit="editServer"
      @updated="createServerDataTemp=$refs.editServerDialog.getData()"
    >
      <template
        v-if="createServerDataTemp && createServerDataTemp.type === 'DISCORD'"
        #form-after
      >
        <a
          target="_blank"
          href="https://docs.vyhub.net/latest/game/discord/"
        >
          <v-btn
            size="small"
            color="info"
          >
            <v-icon start>
              mdi-magnify
            </v-icon>
            {{ $t('_server.labels.guildIdDocs') }}
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
  watch: {
    async activeBundle() {
      this.refreshKeys();
    },
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
          title: this.$t('_messages.createSuccess'),
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
          title: this.$t('_messages.createSuccess'),
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
          title: this.$t('_messages.deleteSuccess'),
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
          title: this.$t('_messages.deleteSuccess'),
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
          title: this.$t('_messages.editSuccess'),
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
          title: this.$t('_messages.editSuccess'),
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
          title: this.$t('_messages.updateOrderSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(`${err}`);
      });
    },

  },
};
</script>

<style scoped>

</style>
