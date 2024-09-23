<template>
  <div>
    <SettingTitle doc-path="/guide/api">
      {{ $t('apiKeys') }}
    </SettingTitle>
    <v-alert
      v-if="createdToken != null"
      icon="mdi-check-circle"
      type="success"
    >
      {{ $t('_api.messages.keyCreated') }}
      {{ createdToken.access_token }}
    </v-alert>
    <DataTable
      :headers="headers"
      :items="apiKeys"
      :items-per-page="10"
    >
      <template #item.properties="{ item }">
        <v-expansion-panels
          v-if="scopeToList(item.scope).length > 5"
          flat
        >
          <v-expansion-panel>
            <v-expansion-panel-title>
              {{ $t('properties') }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-chip
                v-for="(prop, index) in scopeToList(item.scope)"
                :key="index"
                size="small"
                color="primary"
                class="mr-1 mb-1"
              >
                {{ prop }}
              </v-chip>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-chip
          v-for="(prop, index) in scopeToList(item.scope)"
          v-else
          :key="index"
          size="small"
          color="primary"
          class="mr-1 mb-1"
        >
          {{ prop }}
        </v-chip>
      </template>
      <template #item.actions="{ item }">
        <div class="text-right">
          <v-btn
            variant="outlined"
            color="warning"
            size="small"
            @click="revokeToken(item)"
          >
            <v-icon>
              mdi-cancel
            </v-icon>
          </v-btn>
        </div>
      </template>
      <template #footer-right>
        <v-btn
          color="success"
          variant="outlined"
          @click="$refs.createTokenDialog.show()"
        >
          <v-icon start>
            mdi-plus
          </v-icon>
          <span>{{ $t('_api.labels.createKey') }}</span>
        </v-btn>
      </template>
    </DataTable>

    <DialogForm
      ref="createTokenDialog"
      :cancel-text="null"
      :submit-text="$t('create')"
      :form-schema="apiTokenForm"
      :title="$t('_api.labels.createKey')"
      icon="mdi-key-chain"
      @submit="createToken"
    >
      <template #custom-properties="context">
        <PropertyPicker v-bind="context" />
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
  beforeMount() {
    this.fetchData();
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
          title: this.$t('_messages.deleteSuccess'),
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
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.createTokenDialog.setError(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
