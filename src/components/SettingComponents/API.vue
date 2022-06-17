<template>
  <div>
    <SettingTitle docPath="/guide/api">{{ $t('apiKeys') }}</SettingTitle>
    <v-alert
      icon="mdi-check-circle"
      type="success"
      v-if="createdToken != null"
    >
      {{ $t('_api.messages.keyCreated') }}
      {{ createdToken.access_token }}
    </v-alert>
    <DataTable
      :headers="headers"
      :items="apiKeys" :items-per-page="10">
      <template v-slot:item.properties="{ item }" >
        <v-expansion-panels v-if="scopeToList(item.scope).length > 5" flat>
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t('properties') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-chip v-for="(prop, index) in scopeToList(item.scope)" :key="index" small
                      color="primary" class="mr-1 mb-1">
                {{ prop }}
              </v-chip>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-chip v-else v-for="(prop, index) in scopeToList(item.scope)" :key="index" small
                color="primary" class="mr-1 mb-1">
          {{ prop }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="text-right">
          <v-btn outlined color="warning" small @click="revokeToken(item)">
            <v-icon>
              mdi-cancel
            </v-icon>
          </v-btn>
        </div>
      </template>
      <template v-slot:footer-right>
        <v-btn color="success" @click="$refs.createTokenDialog.show()" outlined>
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('_api.labels.createKey') }}</span>
        </v-btn>
      </template>
    </DataTable>

    <DialogForm :cancel-text="null" :submit-text="$t('create')" :form-schema="apiTokenForm"
                :title="$t('_api.labels.createKey')" icon="mdi-key-chain"
                @submit="createToken" ref="createTokenDialog">
      <template v-slot:custom-properties="context">
        <PropertyPicker v-bind="context"/>
      </template>
    </DialogForm>
  </div>
</template>

<script>
import SettingTitle from '@/components/SettingComponents/SettingTitle.vue';
import DataTable from '@/components/DataTable.vue';
import openapi from '@/api/openapi';
import APITokenForm from '@/forms/APITokenForm';
import DialogForm from '@/components/DialogForm.vue';
import PropertyPicker from '@/components/SettingComponents/PropertyPicker.vue';

export default {
  components: {
    DialogForm, DataTable, SettingTitle, PropertyPicker,
  },
  data() {
    return {
      activeBundle: null,
      apiKeys: null,
      createdToken: null,
      headers: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('key'), value: 'access_token_hidden', sortable: false },
        { text: this.$t('properties'), value: 'scope' },
        { text: this.$t('serverbundle'), value: 'serverbundle.name' },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right',
        },
      ],
      apiTokenForm: APITokenForm,
    };
  },
  methods: {
    scopeToList(scope) {
      return scope.split(' ');
    },
    async fetchData() {
      const api = await openapi;

      api.general_getApiTokens().then((rsp) => {
        this.apiKeys = rsp.data;
      });
    },
    async revokeToken(token) {
      const api = await openapi;

      api.general_revokeApiToken(
        { uuid: token.id },
      ).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_api.messages.keyRevokeSuccess'),
          type: 'success',
        });
      });
    },
    async createToken() {
      const api = await openapi;

      const data = this.$refs.createTokenDialog.getData();

      data.serverbundle_id = (data.serverbundle != null ? data.serverbundle.id : null);
      delete data.serverbundle;

      api.general_createApiToken(null, data).then((rsp) => {
        this.createdToken = rsp.data;
        this.fetchData();
        this.$refs.createTokenDialog.closeAndReset();
        this.$notify({
          title: this.$t('_api.messages.keyCreateSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.createTokenDialog.setError(err);
      });
    },
  },
  beforeMount() {
    this.fetchData();
  },
};
</script>

<style scoped>

</style>
