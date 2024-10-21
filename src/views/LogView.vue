<template>
  <div>
    <PageTitleFlat
      :title="$t('log')"
      :hide-triangle="true"
    />
    <!-- TODO Categories and Labels does not work -->
    <v-card
      class="card-rounded-bottom"
      flat
      :class="{ 'mt-4 card-rounded-top':!$vuetify.display.smAndDown,
                'no-top-border-radius': $vuetify.display.smAndDown }"
    >
      <v-card-text>
        <v-row
          dense
          align="center"
        >
          <v-col
            cols="12"
            sm="6"
            md="4"
            xl="2"
          >
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-text-field
                  v-model="startDateString"
                  variant="underlined"
                  :label="$t('start')"
                  prepend-icon="mdi-calendar"
                  hide-details
                  readonly
                  class="ml-3"
                  v-bind="props"
                />
              </template>
              <v-date-picker
                v-model="startDate"
                @update:model-value="fetchData"
              />
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            xl="1"
          >
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-text-field
                  v-model="startTime"
                  :label="$t('start')"
                  prepend-icon="mdi-clock-time-four-outline"
                  hide-details
                  readonly
                  variant="underlined"
                  class="ml-3"
                  v-bind="props"
                />
              </template>
              <v-time-picker
                v-model="startTime"
                format="24hr"
                @update:model-value="fetchData"
              />
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            xl="2"
          >
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-text-field
                  v-model="endDateString"
                  class="ml-5"
                  variant="underlined"
                  :label="$t('end')"
                  prepend-icon="mdi-calendar"
                  readonly
                  hide-details

                  v-bind="props"
                />
              </template>
              <v-date-picker
                v-model="endDate"
                @update:model-value="fetchData"
              />
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            xl="1"
          >
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-text-field
                  v-model="endTime"
                  class="ml-3"
                  :label="$t('end')"
                  variant="underlined"
                  prepend-icon="mdi-clock-time-four-outline"
                  hide-details
                  readonly

                  v-bind="props"
                />
              </template>
              <v-time-picker
                v-model="endTime"
                format="24hr"
                @update:model-value="fetchData"
              />
            </v-menu>
          </v-col>
          <v-col
            cols="6"
            md="4"
            xl="2"
          >
            <v-menu
              location="bottom"
              :close-on-content-click="false"
            >
              <template #activator="{ props }">
                <v-btn
                  class="ml-3"
                  variant="outlined"
                  color="primary"

                  v-bind="props"
                >
                  <v-icon start>
                    mdi-filter
                  </v-icon>
                  {{ $t('_log.labels.level') }}
                </v-btn>
              </template>
              <v-card>
                <v-radio-group
                  v-model="selectedSeverity"
                  class="mx-2"
                >
                  <v-radio
                    v-for="(severity, index) in severities"
                    :key="index"
                    dense
                    hide-details
                    :label="severity"
                  />
                </v-radio-group>
                <a
                  class="ma-1"
                  href="javascript:void(0)"
                  @click="selectedSeverity = null;"
                >{{ $t('reset') }}</a>
              </v-card>
            </v-menu>
            <v-menu
              location="bottom"
              :close-on-content-click="false"
            >
              <template #activator="{ props }">
                <v-btn
                  class="ml-3"
                  variant="outlined"
                  color="primary"

                  v-bind="props"
                >
                  <v-icon start>
                    mdi-filter
                  </v-icon>
                  {{ $t('category') }}
                </v-btn>
              </template>
              <v-card>
                <v-radio-group
                  v-model="selectedCat"
                  class="mx-2"
                >
                  <v-radio
                    v-for="(category, index) in categories"
                    :key="index"
                    dense
                    hide-details
                    :label="category"
                    :value="category"
                  />
                </v-radio-group>
                <a
                  href="javascript:void(0)"
                  class="ma-1"
                  @click="selectedCat = null;"
                >{{ $t('reset') }}</a>
              </v-card>
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            xl="2"
          >
            <v-text-field
              v-model="search"
              :label="$t('search')"
              hide-details
              variant="outlined"
              class="ml-3"
              density="compact"
              @change="fetchLogs"
            >
              <template #prepend-inner>
                <v-icon>
                  mdi-magnify
                </v-icon>
              </template>
            </v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            xl="2"
            class="text-center"
          >
            <v-btn
              class="ml-3"
              variant="outlined"
              color="primary"
              icon="mdi-filter-plus"
              @click="$refs.labelFilterDialog.show()"
            />
            <v-btn
              class="ml-3"
              variant="outlined"
              color="error"
              icon="mdi-filter-off"
              :disabled="Object.keys(filteredLabels).length === 0"
              @click="resetFilters"
            />
            <v-btn
              class="ml-3"
              variant="outlined"
              color="primary"
              icon="mdi-refresh"
              @click="fetchData"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-alert
      v-if="logs && logs.length >= 1000"
      color="error"
      icon="mdi-information-outline"
      class="mt-2"
    >
      {{ $t('_log.messages.limitReachedFilter') }}
    </v-alert>
    <v-card
      class="card-rounded mt-3"
      flat
    >
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
          <template #item.message="{ item }">
            <div
              class="text-truncate"
              :style="{'max-width': $vuetify.display.width / 2.2 + 'px'}"
            >
              {{ item.message }}
            </div>
          </template>
          <template #expanded-row="{ columns, item }">
            <td :colspan="columns.length">
              <div class=" mt-3">
                <span class="text-subtitle-1 mb-1">{{ $t('message') }}:</span>
                <div>{{ item.message }}</div>
              </div>
              <div class=" mt-3">
                <span class="text-subtitle-1 mb-1">{{ $t('date') }}:</span>
                <div>{{ item.date }}</div>
              </div>
              <div class="my-2">
                <span class="text-subtitle-1">{{ $t('labels') }}:</span>
                <br>
                <LogLabel
                  v-for="(value, label) in cleanedLabels(item.labels)"
                  :key="label"
                  :label="label"
                  :value="value"
                  class="mr-2"
                  @click="selectedFilters = {}; selectedFilters[label] = value;"
                />
              </div>
            </td>
          </template>
          <template #item.author="{ item }">
            <div v-if="item.author != null">
              <UserLink :user="item.author" />
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #item.severity="{ item }">
            <v-tooltip location="left">
              <template #activator="{ props }">
                <div v-bind="props">
                  <v-icon
                    v-if="item.severity === 'INFO'"
                    color="info"
                  >
                    mdi-information
                  </v-icon>
                  <v-icon
                    v-if="item.severity === 'WARNING'"
                    color="warning"
                  >
                    mdi-alert
                  </v-icon>
                  <v-icon
                    v-if="item.severity === 'ERROR'"
                    color="error"
                  >
                    mdi-alert-circle
                  </v-icon>
                  <v-icon
                    v-if="item.severity === 'DEBUG'"
                    color="success"
                  >
                    mdi-shield-bug
                  </v-icon>
                </div>
              </template>
              <span>{{ item.severity }}</span>
            </v-tooltip>
          </template>
          <template #item.time="{ item }">
            <span>
              {{
                $t('_notification.timeAgo', {
                  time: utils.formatElapsedTime((new Date() - new Date(item.date)))
                })
              }}
            </span>
          </template>
        </DataTable>
      </v-card-text>
    </v-card>
    <DialogForm
      ref="labelFilterDialog"
      :max-width="500"
      :title="$t('filter')"
      icon="mdi-filter-plus"
      :form-schema="advancedFiltersFormSchema"
      @submit="applyAdvancedFilters"
      @cancel="selectedFilters = {}"
    />
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import Common from '@/forms/Common';

export default {
  emits: ['update:selectedFilters'],
  data() {
    return {
      expanded: [],
      selectedCat: null,
      selectedSeverity: null,
      search: null,
      maxIntervalDays: 89,
      logs: null,
      totalItems: 0,
      startDate: new Date(Date.now() - 86400000 * 7),
      startDateString: new Date(Date.now() - 86400000 * 7).toISOString().split('T')[0],
      endDate: new Date(),
      endDateString: new Date().toISOString().split('T')[0],
      startTime: '00:00',
      endTime: '23:59',
      labels: {},
      selectedFilters: {},
      headers: [
        {
          title: '', key: 'severity', sortable: false, width: '1%',
        },
        {
          title: this.$t('date'), key: 'time', sortable: false, width: '10%',
        },
        {
          title: this.$t('message'), key: 'message', sortable: false,
        },
        { title: this.$t('user'), key: 'author', sortable: false },
        { title: this.$t('category'), key: 'category', sortable: false },
      ],
    };
  },
  computed: {
    start() {
      return new Date(`${this.startDate.toISOString().split('T')[0]}T${this.startTime}`);
    },
    end() {
      return new Date(`${this.endDate.toISOString().split('T')[0]}T${this.endTime}`);
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
      const form = {
        type: 'object',
        properties: {
          author_id: Common.userIdSelectField,
        },
      };

      Object.entries(this.cleanedLabels(this.labels)).forEach(([key, value]) => {
        form.properties[key] = {
          type: ['string', 'null'],
          title: key,
          // 'x-display': 'combobox',
          // examples: value,
        };
      });

      return form;
    },
  },
  watch: {
    filteredLabels() {
      this.fetchLogs();
      this.$refs.labelFilterDialog.setData(this.selectedFilters);
    },
    endDate() {
      if (new Date(this.startDate) > new Date(this.endDate)) {
        this.startDate = this.endDate;
        return;
      }

      if (this.datediff(new Date(this.startDate), new Date(this.endDate)) > this.maxIntervalDays) {
        const newDate = new Date(this.endDate);
        newDate.setDate(newDate.getDate() - this.maxIntervalDays);
        this.startDate = newDate;
        this.startDateString = newDate.toISOString().split('T')[0];
      }
    },
    startDate() {
      if (new Date(this.startDate) > new Date(this.endDate)) {
        this.endDate = this.startDate;
        return;
      }

      if (this.datediff(new Date(this.startDate), new Date(this.endDate)) > this.maxIntervalDays) {
        const newDate = new Date(this.startDate);
        newDate.setDate(newDate.getDate() + this.maxIntervalDays);
        this.endDate = newDate;
        this.endDateString = newDate.toISOString().split('T')[0];
      }
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    async fetchLabels() {
      (await openapi).log_getLabels({
        start: this.start.toISOString(),
        end: this.end.toISOString(),
      }).then((rsp) => {
        console.log(rsp);
        this.labels = rsp.data;
      });
    },
    async fetchLogs() {
      let query = null;

      if (Object.keys(this.filteredLabels).length > 0) {
        const labels = Object.entries(this.filteredLabels).map(([key, value]) => `${key}=${JSON.stringify(value.trim())}`);
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
      delete newLabels.log_entry_id;

      return newLabels;
    },
    applyAdvancedFilters() {
      this.selectedFilters = this.$refs.labelFilterDialog.getData();
      this.$refs.labelFilterDialog.close();
    },
    datediff(first, second) {
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    },
    resetFilters() {
      this.selectedCat = null;
      this.selectedSeverity = null;
      this.selectedFilters = {};
      this.search = null;
      this.fetchData();
    },
  },
};
</script>

<script setup lang="ts">
</script>

<style scoped>

</style>
