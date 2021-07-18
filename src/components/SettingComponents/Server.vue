<template>
  <div>
    <DialogForm ref="addBundleDialog"
                :form-schema="addBundleSchema"
                @submit="addBundle"
                :title="$t('settings.labels.addBundle')"/>
    <DeleteConfirmationDialog
                ref="deleteBundleDialog"
                @submit="deleteBundle"/>
    <DeleteConfirmationDialog
                ref="deleteServerDialog"
                @submit="deleteServer"/>
    <DialogForm ref="editBundleDialog"
                :form-schema="editBundleSchema"
                @submit="editBundle"
                :title="$t('__editBundle')"/>
    <v-row>
      <v-col>
        <v-card outlined flat class="fill-height transparent">
          <v-card-title>
            {{ $t('serverbundle') }}
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="bundleHeaders"
              :items="bundles"
              :hide-default-footer="true"
              :disable-pagination="true">
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
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="$refs.addBundleDialog.show()">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t('settings.labels.addBundle') }}</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined flat class="fill-height transparent">
          <v-card-title>
            {{ $t('settings.gameserver') }}
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="gameserverHeaders"
              :items="server"
              :hide-default-footer="true"
              :disable-pagination="true"
            >
              <template v-slot:item.serverbundle_id="{ item }">
                {{ getBundle(item) }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn outlined color="primary" small class="mr-1">
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
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t('settings.labels.addServer') }}</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from '@/api/api';
import DialogForm from '@/components/DialogForm.vue';
import BundleAddForm from '@/forms/BundleAddForm';
import EditBundleForm from '@/forms/BundleEditForm';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import BoolIcon from '../BoolIcon';

export default {
  name: 'Server',
  components: {
    BoolIcon,
    DeleteConfirmationDialog,
    DialogForm,
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
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false, width: 150,
        },
      ],
      gameserverHeaders: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('type'), value: 'type' },
        { text: this.$t('ipAddress'), value: 'address' },
        { text: this.$t('port'), value: 'port' },
        { text: this.$t('bundle'), value: 'serverbundle_id' },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right', width: 150,
        },
      ],
      addBundleSchema: BundleAddForm.returnForm(),
      editBundleSchema: null,
    };
  },
  beforeMount() {
    this.queryData();
  },
  methods: {
    queryData() {
      api.server.getBundles().then((rsp) => { this.bundles = rsp.data; this.dataFetched += 1; });
      api.server.getServer().then((rsp) => { this.server = rsp.data; this.dataFetched += 1; });
    },
    getBundle(item) {
      if (this.dataFetched !== 2) { return ''; }
      if (item.serverbundle_id) {
        return this.bundles.find((b) => b.id === item.serverbundle_id).name;
      }
      return '-';
    },
    getServerIdsByBundle(bundleId) {
      const server = this.server.filter((s) => s.serverbundle_id === bundleId);
      const serverIds = [];
      server.forEach((s) => serverIds.push(s.id));
      return serverIds;
    },
    addBundle() {
      const data = this.$refs.addBundleDialog.getData();

      api.server.addBundle(
        data.name,
        data.serverType,
        data.multigroup,
        data.defaultgroup,
        data.color,
        data.icon,
      ).then(() => {
        api.server.getBundles().then((response) => { this.bundles = response.data; });
        this.$refs.addBundleDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.addBundleDialog.setErrorMessage(err.response.data.detail);
      });
    },
    openDeleteBundleDialog(item) {
      this.$refs.deleteBundleDialog.show(item);
    },
    openDeleteServerDialog(item) {
      this.$refs.deleteServerDialog.show(item);
    },
    deleteBundle(bundle) {
      api.server.deleteBundle(bundle.id).then(() => {
        this.$refs.deleteBundleDialog.cancel();
        api.server.getBundles().then((response) => { this.bundles = response.data; });
      }).catch((err) => {
        this.$refs.deleteBundleDialog.setErrorMessage(err.response.data.detail);
      });
    },
    deleteServer(server) {
      api.server.deleteServer(server.id).then(() => {
        this.$refs.deleteServerDialog.cancel();
        api.server.getServer().then((response) => { this.server = response.data; });
      }).catch((err) => {
        this.$refs.deleteServerDialog.setErrorMessage(err.response.data.detail);
      });
    },
    openEditBundleDialog(bundle) {
      // set "old" data
      const obj = bundle;
      if (bundle.default_group) obj.defaultGroup = bundle.default_group.id;
      obj.serverSelect = this.getServerIdsByBundle(bundle.id);
      // render correct form
      this.editBundleSchema = EditBundleForm.returnForm(String(bundle.server_type));
      // open and show dialog
      this.$refs.editBundleDialog.setData(obj);
      this.$refs.editBundleDialog.show(bundle);
    },
    editBundle(bundle) {
      const data = this.$refs.editBundleDialog.getData();
      api.server.editBundle(
        bundle.id,
        data.name,
        data.multigroup,
        data.defaultgroup,
        data.color,
        data.icon,
        data.serverSelect,
      ).then(() => {
        this.queryData();
        this.$refs.editBundleDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.editBundleDialog.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
