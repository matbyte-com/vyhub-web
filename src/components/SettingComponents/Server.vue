<template>
  <div>
    <DialogForm ref="addBundleDialog"
                :form-schema="addBundleSchema"
                @submit="addBundle"
                :title="$t('settings.labels.addBundle')"
                @updated="getIcon">
      <template slot="icon-append">
        <v-icon>
          {{ icon }}
        </v-icon>
      </template>
    </DialogForm>
    <DeleteConfirmationDialog
                ref="deleteBundleDialog"
                @submitDelete="deleteBundle"/>
    <DeleteConfirmationDialog
                ref="deleteServerDialog"
                @submitDelete="deleteServer"/>
    <DialogForm ref="editBundleDialog"
                :form-schema="editBundleSchema"
                @submit="editBundle"
                :title="$t('__editBundle')" />
    <v-row>
      <v-col>
        <v-card outlined flat class="fill-height">
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
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="openEditBundleDialog(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="openDeleteBundleDialog(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="$refs.addBundleDialog.dialog = true">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t('settings.labels.addBundle') }}</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined flat class="fill-height">
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
                <v-icon small class="mr-2" @click="editBundle(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="openDeleteServerDialog(item)">
                  mdi-delete
                </v-icon>
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
import AddBundleForm from '@/forms/BundleAddForm';
import EditBundleForm from '@/forms/BundleEditForm';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';

export default {
  name: 'Server',
  components: {
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
        { text: this.$t('actions'), value: 'actions', sortable: false },
      ],
      gameserverHeaders: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('type'), value: 'type' },
        { text: this.$t('ipAddress'), value: 'address' },
        { text: this.$t('port'), value: 'port' },
        { text: this.$t('bundle'), value: 'serverbundle_id' },
        { text: this.$t('actions'), value: 'actions', sortable: false },
      ],
      addBundleSchema: AddBundleForm,
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
    addBundle() {
      const data = this.$refs.addBundleDialog.getData();

      api.server.addBundle(
        data.name,
        data.serverType,
        data.multigroup,
        data.defaultgroup,
        data.color,
        `mdi-${data.icon}`,
      ).then((rsp) => {
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
      api.server.deleteBundle(bundle.id).then((rsp) => {
        this.$refs.deleteBundleDialog.cancel();
        api.server.getBundles().then((response) => { this.bundles = response.data; });
      }).catch((err) => {
        this.$refs.deleteBundleDialog.setErrorMessage(err.response.data.detail);
      });
    },
    deleteServer(server) {
      api.server.deleteServer(server.id).then((rsp) => {
        this.$refs.deleteServerDialog.cancel();
        api.server.getServer().then((response) => { this.server = response.data; });
      }).catch((err) => {
        this.$refs.deleteServerDialog.setErrorMessage(err.response.data.detail);
      });
    },
    openEditBundleDialog(item) {
      console.log(item);
      this.editBundleSchema = EditBundleForm.returnForm(item.server_type);
      this.$refs.editBundleDialog.show(item);
    },
    getIcon() {
      this.icon = `mdi-${this.$refs.addBundleDialog.getData().icon}`;
    },
    editBundle(item) {
      console.log('xyz');
    },
  },
};
</script>

<style scoped>

</style>
