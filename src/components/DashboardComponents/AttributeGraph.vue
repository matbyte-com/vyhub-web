<template>
  <v-card
    width="100%"
    class="vh-dashboard-attribute-graph card-rounded"
    flat
  >
    <v-tabs
      v-model="activeDef"
      color="primary"
      center-active
    >
      <v-tab
        v-for="def in accumulatedDefinitions"
        :key="def.id"
        :value="def"
      >
        {{ def.title }}
      </v-tab>
    </v-tabs>
    <v-card-text>
      <DashboardAccumulatedAttributesChart
        v-if="activeDef != null"
        :data="activeHistory"
        :definition="activeDef"
        :start="historyStart"
        :loading="loadingMore"
        @load-more="loadEarlier"
      />
      <div v-else>
        {{ $t('noDataAvailable') }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import openapiCached from '@/api/openapiCached';

export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    bundle: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      attributeDefinitions: [],
      activeDef: null,
      activeHistory: null,
      // null means "full history"; otherwise the earliest date currently loaded.
      historyStart: null,
      loadingMore: false,
    };
  },
  computed: {
    allAccumulatedDefinitions() {
      return this.attributeDefinitions.filter((df) => df.type === 'ACCUMULATED');
    },
    unspecificAccumulatedDefinitions() {
      return this.attributeDefinitions.filter((df) => df.unspecific === true && df.type === 'ACCUMULATED');
    },
    accumulatedDefinitions() {
      if (this.bundle == null) {
        return this.unspecificAccumulatedDefinitions;
      }
      return this.allAccumulatedDefinitions;
    },
  },
  watch: {
    user() {
      this.activeDef = null;
      this.fetchData();
    },
    bundle() {
      this.activeDef = null;
      this.fetchData();
    },
    activeDef() {
      // Every attribute tab starts with only the most recent year loaded.
      this.historyStart = this.defaultStart();
      this.fetchHistory();
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    defaultStart() {
      const d = new Date();
      d.setFullYear(d.getFullYear() - 1);
      return d;
    },
    async fetchData() {
      (await openapiCached).user_getAttributeDefinitions().then((rsp) => {
        this.attributeDefinitions = rsp.data;

        const accDefs = this.accumulatedDefinitions;

        if (accDefs.length > 0) {
          [this.activeDef] = accDefs;
        }
      });
    },
    async fetchHistory() {
      if (this.activeDef == null) {
        this.activeHistory = null;
        return;
      }

      const historyReq = {
        uuid: this.user.id,
        definition_id: this.activeDef.id,
      };

      if (this.bundle != null) {
        historyReq.serverbundle_id = this.bundle.id;
      }

      if (this.historyStart != null) {
        historyReq.start = this.historyStart.toISOString();
      }

      this.loadingMore = true;

      try {
        const rsp = await (await openapiCached).user_getAttributeHistory(historyReq);
        this.activeHistory = rsp.data;
      } catch (err) {
        this.activeHistory = null;
        this.utils.notifyUnexpectedError(err.response.data);
      } finally {
        this.loadingMore = false;
      }
    },
    // target: a Date to extend the window back to, or null to load everything.
    loadEarlier(target) {
      if (this.loadingMore) {
        return;
      }

      if (this.historyStart == null) {
        return; // already showing full history
      }

      if (target != null && target >= this.historyStart) {
        return; // requested range is already loaded
      }

      this.historyStart = target;
      this.fetchHistory();
    },
  },
};
</script>

<style scoped>

</style>
