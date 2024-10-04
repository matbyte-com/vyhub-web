<template>
  <v-card
    width="100%"
    class="vh-dashboard-attribute-graph card-rounded"
    flat
  >
    <v-tabs
      bg-color="primary"
      center-active
    >
      <v-tab
        v-for="def in accumulatedDefinitions"
        :key="def.id"
        @click="activeDef = def"
      >
        {{ def.title }}
      </v-tab>
    </v-tabs>
    <v-card-text>
      <DashboardAccumulatedAttributesChart
        v-if="activeDef != null"
        :data="activeHistory"
        :definition="activeDef"
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
    user: Object,
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
    async activeDef() {
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

      (await openapiCached).user_getAttributeHistory(
        historyReq,
      ).then((rsp) => {
        this.activeHistory = rsp.data;
      }).catch((err) => {
        this.activeHistory = null;
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapiCached).user_getAttributeDefinitions().then((rsp) => {
        this.attributeDefinitions = rsp.data;

        const accDefs = this.accumulatedDefinitions;

        if (accDefs.length > 0) {
          [this.activeDef] = accDefs;
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
