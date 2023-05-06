<template>
  <div>
    <PageTitle icon="mdi-format-list-bulleted">{{ $t('log') }}</PageTitle>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col class="d-flex align-center justify-center">
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  :label="$t('start')"
                  prepend-icon="mdi-calendar"
                  hide-details
                  readonly
                  class="ml-3"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                @input="fetchData">
              </v-date-picker>
            </v-menu>
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startTime"
                  :label="$t('start')"
                  prepend-icon="mdi-clock-time-four-outline"
                  hide-details
                  readonly
                  class="ml-3"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                format="24hr"
                v-model="startTime"
                @input="fetchData">
              </v-time-picker>
            </v-menu>
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="ml-5"
                  v-model="endDate"
                  :label="$t('end')"
                  prepend-icon="mdi-calendar"
                  readonly
                  hide-details
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                @input="fetchData"
              ></v-date-picker>
            </v-menu>
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="ml-3"
                  v-model="endTime"
                  :label="$t('end')"
                  prepend-icon="mdi-clock-time-four-outline"
                  hide-details
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                format="24hr"
                v-model="endTime"
                @input="fetchData">
              </v-time-picker>
            </v-menu>
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ml-3"
                  outlined
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>
                    mdi-filter
                  </v-icon>
                  {{ $t('_log.labels.level') }}
                </v-btn>
              </template>
              <v-radio-group v-model="selectedSeverity" class="mx-2">
                <v-radio
                  dense
                  hide-details
                  v-for="(severity, index) in severities"
                  :key="index"
                  :label="severity"
                  :value="severity"
                ></v-radio>
              </v-radio-group>
              <a class="ma-1" @click="selectedSeverity = null;">{{ $t('reset') }}</a>
            </v-menu>
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ml-3"
                  outlined
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>
                    mdi-filter
                  </v-icon>
                  {{ $t('category') }}
                </v-btn>
              </template>
              <v-radio-group v-model="selectedCat" class="mx-2">
                <v-radio
                  dense
                  hide-details
                  v-for="(category, index) in categories"
                  :key="index"
                  :label="$t(`_log.type.${category.toLowerCase()}`)"
                  :value="category"
                ></v-radio>
              </v-radio-group>
              <a class="ma-1" @click="selectedCat = null;">{{ $t('reset') }}</a>
            </v-menu>
            <v-text-field
              v-model="search"
              :label="$t('search')"
              hide-details
              outlined
              class="ml-3"
              dense
              @change="fetchLogs"
            >
              <template v-slot:prepend-inner>
                <v-icon>
                  mdi-magnify
                </v-icon>
              </template>
            </v-text-field>
            <v-btn class="ml-3" outlined color="primary" icon
                   @click="$refs.labelFilterDialog.show()">
              <v-icon>
                mdi-filter
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-text class="mt-0 pt-0">
        <DataTable
          ref="logTable"
          class="mt-4"
          :headers="headers"
          :items="logs"
          default-sort-by="created_on"
          :default-sort-desc="true"
          show-expand
          @reload="fetchData"
        >
          <template v-slot:item.message="{ item }">
            <div class="text-truncate"
                 :style="{'max-width': $vuetify.breakpoint.width / 2.2 + 'px'}">
              {{ item.message }}
            </div>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <div class=" mt-3">
                <span class="subtitle-1 mb-1">{{ $t('message') }}:</span>
                <div>{{ item.message }}</div>
              </div>
              <div class=" mt-3">
                <span class="subtitle-1 mb-1">{{ $t('date') }}:</span>
                <div>{{ item.date }}</div>
              </div>
              <div class="my-2">
                <span class="subtitle-1">{{ $t('labels') }}:</span>
                <br/>
                <LogLabel :label="label" :value="value"
                          v-for="(value, label) in cleanedLabels(item.labels)" v-bind:key="label"
                          class="mr-2">
                </LogLabel>
              </div>
            </td>
          </template>
          <template v-slot:item.author="{ item }">
            <div v-if="item.author != null">
              <UserLink :user="item.author"/>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template v-slot:item.severity="{ item }">
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <v-icon color="info" v-if="item.severity === 'INFO'">mdi-information</v-icon>
                  <v-icon color="warning" v-if="item.severity === 'WARNING'">mdi-alert</v-icon>
                  <v-icon color="error" v-if="item.severity === 'ERROR'">mdi-alert-circle</v-icon>
                  <v-icon color="success" v-if="item.severity === 'DEBUG'">mdi-shield-bug</v-icon>
                </div>
              </template>
              <span>{{ item.severity }}</span>
            </v-tooltip>
          </template>
          <template v-slot:item.time="{ item }">
          <span>
            {{
              $t('_notification.timeAgo', {
                time: utils.formatElapsedTime((new Date() - new Date(item.date)))
              })
            }}
          </span>
          </template>
          <template v-slot:item.category="{ item }">
            {{ $t(`_log.type.${item.category.toLowerCase()}`) }}
          </template>
        </DataTable>
      </v-card-text>
    </v-card>
    <DialogForm ref="labelFilterDialog" :max-width="500" :title="$t('filter')" icon="mdi-filter"
                @submit="applyAdvancedFilters" @cancel="selectedFilters = {}"
                :form-schema="advancedFiltersFormSchema">
    </DialogForm>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';
import DataTable from '@/components/DataTable.vue';
import LogLabel from '@/components/LogLabel.vue';
import DialogForm from '@/components/DialogForm.vue';

export default {
  components: {
    DialogForm,
    LogLabel,
    DataTable,
    UserLink,
    PageTitle,
  },
  emits: ['update:selectedFilters'],
  data() {
    return {
      expanded: [],
      selectedCat: null,
      selectedSeverity: null,
      search: null,
      logs: null,
      totalItems: 0,
      startDate: new Date(Date.now() - 86400000 * 7).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      startTime: '00:00',
      endTime: '23:59',
      labels: {},
      selectedFilters: {},
      headers: [
        {
          text: '', value: 'severity', sortable: false, width: '1%',
        },
        {
          text: this.$t('date'), value: 'time', sortable: false, width: '8%',
        },
        {
          text: this.$t('message'), value: 'message', sortable: false, width: '50%',
        },
        { text: this.$t('user'), value: 'author', sortable: false },
        { text: this.$t('category'), value: 'category', sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchLabels() {
      (await openapi).log_getLabels({
        start: this.start.toISOString(),
        end: this.end.toISOString(),
      }).then((rsp) => {
        this.labels = rsp.data;
      });
    },
    async fetchLogs() {
      let query = null;

      if (Object.keys(this.filteredLabels).length > 0) {
        const labels = Object.entries(this.filteredLabels).map(([key, value]) => `${key}=${JSON.stringify(value)}`);
        query = `{${labels}}`;
      }

      this.logs = null;
      (await openapi).log_getLog({
        start: this.start.toISOString(),
        end: this.end.toISOString(),
        query,
        search: this.search,
      }).then((rsp) => {
        this.logs = rsp.data;
      });
    },
    async fetchData() {
      this.fetchLabels();
      this.fetchLogs();
    },
    cleanedLabels(labels) {
      const newLabels = labels;

      delete newLabels.app;
      delete newLabels.category;
      delete newLabels.author_username;
      delete newLabels.author_id;
      delete newLabels.logger;
      delete newLabels.severity;

      return newLabels;
    },
    applyAdvancedFilters() {
      this.selectedFilters = this.$refs.labelFilterDialog.getData();
      this.$refs.labelFilterDialog.close();
    },
    datediff(first, second) {
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    },
  },
  computed: {
    start() {
      return new Date(`${this.startDate}T${this.startTime}`);
    },
    end() {
      return new Date(`${this.endDate}T${this.endTime}`);
    },
    categories() {
      if ('category' in this.labels) {
        return this.labels.category;
      }
      return [];
    },
    severities() {
      if ('severity' in this.labels) {
        return this.labels.severity;
      }
      return [];
    },
    filteredLabels() {
      let labels = {};

      if (this.selectedCat != null) {
        labels.category = this.selectedCat;
      }

      if (Object.keys(this.selectedFilters).length > 0) {
        labels = { ...this.selectedFilters, ...labels };
      }

      if (this.selectedSeverity != null) {
        labels.severity = this.selectedSeverity;
      }

      Object.keys(labels).forEach((k) => !labels[k] && delete labels[k]);

      return labels;
    },
    advancedFiltersFormSchema() {
      const form = { type: 'object', properties: {} };

      Object.entries(this.cleanedLabels(this.labels)).forEach(([key, value]) => {
        form.properties[key] = {
          type: ['string', 'null'],
          title: key,
          'x-display': 'combobox',
          examples: value,
        };
      });

      return form;
    },
  },
  watch: {
    filteredLabels() {
      this.fetchLogs();
    },
    endDate() {
      if (new Date(this.startDate) > new Date(this.endDate)) {
        this.startDate = this.endDate;
        return;
      }

      if (this.datediff(new Date(this.startDate), new Date(this.endDate)) > 29) {
        const newDate = new Date(this.endDate);
        newDate.setDate(newDate.getDate() - 29);
        [this.startDate] = newDate.toISOString().split('T');
      }
    },
    startDate() {
      if (new Date(this.startDate) > new Date(this.endDate)) {
        this.endDate = this.startDate;
        return;
      }

      if (this.datediff(new Date(this.startDate), new Date(this.endDate)) > 29) {
        const newDate = new Date(this.startDate);
        newDate.setDate(newDate.getDate() + 29);
        [this.endDate] = newDate.toISOString().split('T');
      }
    },
  },
};
</script>

<style scoped>

</style>
