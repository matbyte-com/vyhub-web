<template>
  <div>
    <SettingTitle docPath="/guide/import/general">{{ $t('import') }}</SettingTitle>
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
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="system">
          <v-tab-item
            v-for="item in systems"
            :key="item"
          >
            <v-card flat>
              <v-card-text v-if="item === 'GExtension'">
                <GenForm :form-schema="gextensionSchema" hide-buttons ref="gexForm">
                  <template slot="custom-import-1">
                    <div v-for="table in tables1" v-bind:key="table" class="mb-3">
                      <div class="text-subtitle-2">{{ table.toUpperCase() }}</div>
                      <div class="d-flex align-center">
                        <v-progress-linear
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
                        <v-btn color="success" size="small" class="ml-2" @click="startImport(table)"
                               :disabled="inProgress" v-if="currenTable !== table">
                          {{ $t('start') }}
                        </v-btn>
                        <v-btn color="error" size="small" class="ml-2" @click="cancelImport" v-else>
                          {{ $t('cancel') }}
                        </v-btn>
                      </div>
                    </div>
                  </template>
                  <template slot="custom-import-2">
                    <div v-for="table in tables2" v-bind:key="table" class="mb-3">
                      <div class="text-subtitle-2">{{ table.toUpperCase() }}</div>
                      <div class="d-flex align-center">
                        <v-progress-linear
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
                        <v-btn color="success" size="small" class="ml-2" @click="startImport(table)"
                               :disabled="inProgress" v-if="currenTable !== table">
                          {{ $t('start') }}
                        </v-btn>
                        <v-btn color="error" size="small" class="ml-2" @click="cancelImport" v-else>
                          {{ $t('cancel') }}
                        </v-btn>
                      </div>
                    </div>
                  </template>
                  <template slot="custom-import-3">
                    <div v-for="table in tables3" v-bind:key="table" class="mb-3">
                      <div class="text-subtitle-2">{{ table.toUpperCase() }}</div>
                      <div class="d-flex align-center">
                        <v-progress-linear
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
                        <v-btn color="success" size="small" class="ml-2" @click="startImport(table)"
                               :disabled="inProgress" v-if="currenTable !== table">
                          {{ $t('start') }}
                        </v-btn>
                        <v-btn color="error" size="small" class="ml-2" @click="cancelImport" v-else>
                          {{ $t('cancel') }}
                        </v-btn>
                      </div>
                    </div>
                  </template>
                </GenForm>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SettingTitle from '@/components/SettingComponents/SettingTitle.vue';
import GenForm from '@/components/GenForm.vue';
import ImportGExtensionForm from '@/forms/ImportGExtensionForm';
import openapi from '@/api/openapi';

export default {
  name: 'Import',
  components: { GenForm, SettingTitle },
  data() {
    return {
      system: 'GExtension',
      systems: ['GExtension'],
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
    };
  },
  methods: {
    async startImport(table) {
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
        const newMap = map;
        newMap[obj.gex_packet.id] = obj.packet.id;
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
          // eslint-disable-next-line no-await-in-loop
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
  },
  computed: {
    inProgress() {
      return this.currenTable != null;
    },
  },
};
</script>

<style scoped>

</style>
