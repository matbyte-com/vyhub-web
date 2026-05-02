<template>
  <div>
    <SettingTitle doc-path="/guide/import/general">
      {{ $t('_import.title') }}
    </SettingTitle>
    <v-row>
      <v-col>
        {{ $t('_import.messages.description') }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tabs
          v-model="system"
        >
          <v-tab
            v-for="item in systems"
            :key="item"
          >
            {{ getSystemLabel(item) }}
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="system">
          <v-tabs-window-item
            v-for="item in systems"
            :key="item"
          >
            <v-card flat>
              <v-card-text v-if="item === 'GExtension'">
                <GenForm
                  ref="gexForm"
                  :form-schema="gextensionSchema"
                  hide-buttons
                >
                  <template #custom-import-1>
                    <div
                      v-for="table in tables1"
                      :key="table"
                      class="mb-3"
                    >
                      <div class="text-subtitle-2">
                        {{ table.toUpperCase() }}
                      </div>
                      <div class="d-flex align-center">
                        <v-progress-linear
                          color="success"
                          height="25"
                          :model-value="((progress[table].total) ?
                            ((progress[table].imported / progress[table].total) * 100) : 0)"
                          :stream="progress[table].more === true"
                          :striped="progress[table].more === true"
                        >
                          <strong v-if="progress[table].imported != null">
                            {{ progress[table].imported }}
                            /
                            {{ progress[table].total }}
                          </strong>
                          <strong v-else>
                            ?
                          </strong>
                        </v-progress-linear>
                        <v-btn
                          v-if="currenTable !== table"
                          color="success"
                          class="ml-2"
                          :disabled="inProgress"
                          @click="startImport(table)"
                        >
                          {{ $t('start') }}
                        </v-btn>
                        <v-btn
                          v-else
                          color="error"
                          class="ml-2"
                          @click="cancelImport"
                        >
                          {{ $t('cancel') }}
                        </v-btn>
                      </div>
                    </div>
                  </template>
                  <template #custom-import-2>
                    <div
                      v-for="table in tables2"
                      :key="table"
                      class="mb-3"
                    >
                      <div class="text-subtitle-2">
                        {{ table.toUpperCase() }}
                      </div>
                      <div class="d-flex align-center">
                        <v-progress-linear
                          height="25"
                          color="success"
                          :model-value="((progress[table].total) ?
                            ((progress[table].imported / progress[table].total) * 100) : 0)"
                          :stream="progress[table].more === true"
                          :striped="progress[table].more === true"
                        >
                          <strong v-if="progress[table].imported != null">
                            {{ progress[table].imported }}
                            /
                            {{ progress[table].total }}
                          </strong>
                          <strong v-else>
                            ?
                          </strong>
                        </v-progress-linear>
                        <v-btn
                          v-if="currenTable !== table"
                          color="success"
                          class="ml-2"
                          :disabled="inProgress"
                          @click="startImport(table)"
                        >
                          {{ $t('start') }}
                        </v-btn>
                        <v-btn
                          v-else
                          color="error"
                          class="ml-2"
                          @click="cancelImport"
                        >
                          {{ $t('cancel') }}
                        </v-btn>
                      </div>
                    </div>
                  </template>
                  <template #custom-import-3>
                    <div
                      v-for="table in tables3"
                      :key="table"
                      class="mb-3"
                    >
                      <div class="text-subtitle-2">
                        {{ table.toUpperCase() }}
                      </div>
                      <div class="d-flex align-center">
                        <v-progress-linear
                          height="25"
                          color="success"
                          :model-value="((progress[table].total) ?
                            ((progress[table].imported / progress[table].total) * 100) : 0)"
                          :stream="progress[table].more === true"
                          :striped="progress[table].more === true"
                        >
                          <strong v-if="progress[table].imported != null">
                            {{ progress[table].imported }}
                            /
                            {{ progress[table].total }}
                          </strong>
                          <strong v-else>
                            ?
                          </strong>
                        </v-progress-linear>
                        <v-btn
                          v-if="currenTable !== table"
                          color="success"
                          class="ml-2"
                          :disabled="inProgress"
                          @click="startImport(table)"
                        >
                          {{ $t('start') }}
                        </v-btn>
                        <v-btn
                          v-else
                          color="error"
                          class="ml-2"
                          @click="cancelImport"
                        >
                          {{ $t('cancel') }}
                        </v-btn>
                      </div>
                    </div>
                  </template>
                </GenForm>
              </v-card-text>
              <v-card-text v-else-if="item === 'Database'">
                <v-row>
                  <v-col cols="12">
                    <v-alert
                      type="info"
                      variant="tonal"
                    >
                      {{ $t('_import.database.messages.versionNote') }}
                    </v-alert>
                  </v-col>
                  <v-col cols="12">
                    <v-alert
                      type="error"
                      variant="tonal"
                    >
                      {{ $t('_import.database.messages.dangerDescription') }}
                    </v-alert>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-card
                      border
                      variant="tonal"
                    >
                      <v-card-title>{{ $t('_import.database.labels.exportTitle') }}</v-card-title>
                      <v-card-text>{{ $t('_import.database.messages.exportDescription') }}</v-card-text>
                      <v-card-actions>
                        <v-btn
                          color="primary"
                          :loading="dbExportLoading"
                          @click="exportDatabase"
                        >
                          <v-icon start>
                            mdi-download
                          </v-icon>
                          {{ $t('download') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-card
                      border
                      variant="tonal"
                    >
                      <v-card-title>{{ $t('_import.database.labels.importTitle') }}</v-card-title>
                      <v-card-text>
                        <v-file-input
                          v-model="dbDumpFile"
                          :label="$t('_import.database.labels.dumpFile')"
                          accept=".zip,application/zip"
                          prepend-icon="mdi-file-upload"
                          show-size
                        />
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          color="error"
                          :disabled="!dbDumpFile"
                          :loading="dbImportLoading"
                          @click="showDbImportConfirmation"
                        >
                          <v-icon start>
                            mdi-database-import
                          </v-icon>
                          {{ $t('import') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col
                    v-if="dbImportResult"
                    cols="12"
                  >
                    <v-alert
                      type="success"
                      variant="tonal"
                    >
                      <div>VyHub import finished successfully.</div>
                      <div>The instance is being restarted now. This may take a short while.</div>
                      <div>Source schema: {{ dbImportResult.source_schema }}</div>
                      <div>Target schema: {{ dbImportResult.target_schema }}</div>
                      <div>Alembic revision: {{ dbImportResult.alembic_revision }}</div>
                      <div>Tables loaded: {{ formatImportValue(dbImportResult.tables_loaded) }}</div>
                      <div>Materialized views refreshed: {{ formatImportValue(dbImportResult.matviews_refreshed) }}</div>
                      <div>Restart scheduled: {{ dbImportResult.restart_scheduled ? 'true' : 'false' }}</div>
                    </v-alert>
                  </v-col>
                </v-row>
                <v-dialog
                  v-model="cryptSecretDialog"
                  max-width="600"
                  persistent
                >
                  <v-card>
                    <v-card-title class="text-h5 bg-error pa-4">
                      <v-icon start>
                        mdi-key-alert
                      </v-icon>
                      {{ $t('_import.database.labels.cryptSecretChangedTitle') }}
                    </v-card-title>
                    <v-card-text class="pa-4">
                      <v-alert
                        type="error"
                        variant="tonal"
                        class="mb-4"
                      >
                        {{ $t('_import.database.messages.cryptSecretChanged') }}
                      </v-alert>
                      <div class="text-subtitle-2 mb-1">
                        {{ $t('_import.database.labels.newCryptSecret') }}
                      </div>
                      <v-text-field
                        :model-value="newCryptSecret"
                        readonly
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi-content-copy"
                        @click:append-inner="copyCryptSecret"
                      />
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="error"
                        variant="flat"
                        @click="cryptSecretDialog = false"
                      >
                        {{ $t('_import.database.labels.cryptSecretAcknowledge') }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <ConfirmationDialog
                  ref="dbImportConfirm"
                  :title="$t('_import.database.labels.importConfirmTitle')"
                  :text="$t('_import.database.messages.importConfirm')"
                  :btn-text="$t('import')"
                  btn-icon="mdi-alert"
                  btn-color="error"
                  persistent
                  @submit="importDatabase"
                />
              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ImportGExtensionForm from '@/forms/ImportGExtensionForm';
import openapi from '@/api/openapi';

export default {
  data() {
    return {
      system: 'Database',
      systems: ['Database', 'GExtension'],
      gextensionSchema: ImportGExtensionForm,
      tables1: [
        'group',
        'serverbundle',
        'user',
      ],
      tables2: [
        'user_attribute',
        'ban',
        'warning',
      ],
      tables3: [
        'applied_packet',
      ],
      progress: {
        group: {},
        serverbundle: {},
        user: {},
        user_attribute: {},
        ban: {},
        warning: {},
        applied_packet: {},
      },
      currenTable: null,
      cancel: false,
      dbDumpFile: null,
      dbExportLoading: false,
      dbImportLoading: false,
      dbImportResult: null,
      cryptSecretDialog: false,
      newCryptSecret: null,
    };
  },
  computed: {
    inProgress() {
      return this.currenTable != null;
    },
  },
  methods: {
    getSystemLabel(item) {
      if (item === 'Database') {
        return 'VyHub';
      }
      return item;
    },
    showDbImportConfirmation() {
      const dialog = Array.isArray(this.$refs.dbImportConfirm)
        ? this.$refs.dbImportConfirm[0]
        : this.$refs.dbImportConfirm;
      if (dialog?.show) {
        dialog.show();
      }
    },
    formatImportValue(value) {
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      return String(value);
    },
    async exportDatabase() {
      this.dbExportLoading = true;
      try {
        const rsp = await (await openapi).import_exportVyhub(
          null,
          null,
          { responseType: 'blob' },
        );

        const contentDisposition = rsp.headers?.['content-disposition'] || '';
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
        const now = new Date();
        const timestamp = [
          now.toISOString().slice(0, 10),
          now.toTimeString().slice(0, 8).replace(/:/g, '-'),
        ].join('_');
        const baseFilename = (filenameMatch ? filenameMatch[1] : 'vyhub')
          .replace(/\.tar\.gz$/i, '');
        const filename = `${baseFilename}_${timestamp}.zip`;

        this.utils.showFile(rsp.data, filename, 'application/gzip');
      } catch (err) {
        this.$notify({
          title: this.utils.formatErrorMessage(err).text,
          type: 'error',
        });
      }
      this.dbExportLoading = false;
    },
    async importDatabase() {
      const dialog = Array.isArray(this.$refs.dbImportConfirm)
        ? this.$refs.dbImportConfirm[0]
        : this.$refs.dbImportConfirm;

      if (!this.dbDumpFile) {
        dialog?.closeAndReset?.();
        return;
      }

      this.dbImportLoading = true;

      const formData = new FormData();
      formData.append('dump', this.dbDumpFile);

      try {
        const rsp = await (await openapi).import_importVyhub(
          {
            skip_alembic_check: false,
            restart_process: true,
          },
          formData,
        );

        this.dbImportResult = rsp.data;
        this.dbDumpFile = null;
        dialog?.closeAndReset?.();

        if (rsp.data.new_crypt_secret) {
          this.newCryptSecret = rsp.data.new_crypt_secret;
          this.cryptSecretDialog = true;
        } else {
          this.$notify({
            title: this.$t('_messages.saveSuccess'),
            type: 'success',
          });
        }
      } catch (err) {
        dialog?.setError?.(err);
      }

      this.dbImportLoading = false;
    },
    async startImport(table) {
      this.$refs.gexForm[0].setErrorMessage(null);

      this.cancel = false;

      const api = await openapi;

      const data = this.$refs.gexForm[0].getData();

      this.currenTable = table;

      this.progress[table] = {
        total: 0,
        imported: 0,
        more: true,
      };

      const ignored_reward_ids = data.excluded_rewards.map((re) => re.id);

      const packet_map = data.packet_translations.reduce((map, obj) => {
        map[obj.gex_packet.id] = obj.packet.id;
        return map;
      }, {});

      const req = {
        url: data.url,
        api_key: data.api_key,
        table,
        ignored_reward_ids,
        packet_map,
      };

      let page = 1;

      while (this.progress[table].more && !this.cancel) {
        try {

          const result = (await api.import_importGextension(null, { ...req, page })).data;

          this.progress[table].total += result.total;
          this.progress[table].imported += result.imported;
          this.progress[table].more = result.more;

          page += 1;
        } catch (err) {
          const e = (err.response?.data?.detail?.msg ? err.response.data.detail.msg : err);

          this.$refs.gexForm[0].setErrorMessage(e);
          this.cancel = true;
        }
      }

      this.currenTable = null;
    },
    cancelImport() {
      this.cancel = true;
    },
    copyCryptSecret() {
      navigator.clipboard.writeText(this.newCryptSecret);
      this.$notify({
        title: this.$t('_messages.copyClipboard'),
        type: 'success',
      });
    },
  },
};
</script>

<style scoped>

</style>
