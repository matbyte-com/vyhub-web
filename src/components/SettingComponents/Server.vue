<template>
  <div>
    <DialogForm ref="addBundleDialog"
                :form-model="addBundleModel"
                :form-schema="addBundleSchema"
                @submit="addBundle"
                :title="$t('settings.labels.addBundle')"/>
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
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t('__addServer') }}</span>
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
import AddBundleForm from '@/forms/AddBundleForm';

export default {
  name: 'Server',
  components: {
    DialogForm,
  },
  data() {
    return {
      bundles: [],
      server: [],
      dataFetched: 0,
      bundleHeaders: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('type'), value: 'server_type' },
        { text: this.$t('settings.defaultGroup'), value: 'default_group.name' },
      ],
      gameserverHeaders: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('type'), value: 'type' },
        { text: this.$t('__address'), value: 'address' },
        { text: this.$t('__port'), value: 'port' },
        { text: this.$t('bundle'), value: 'serverbundle_id' },
      ],
      addBundleSchema: AddBundleForm,
      addBundleModel: {},
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
      this.addBundleModel = {};
      const data = this.$refs.addBundleDialog.getData();

      api.server.addBundle(
        data.name,
        data.serverType,
        data.multigroup,
        data.defaultgroup,
      ).then((rsp) => {
        this.queryData();
        this.$refs.addBundleDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.addBundleDialog.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
