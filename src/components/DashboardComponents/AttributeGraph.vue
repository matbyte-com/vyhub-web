<template>
  <v-card>
    <v-tabs
      background-color="primary"
      center-active
      dark
    >
      <v-tab v-for="def in unspecificAccumulatedDefinitions" :key="def.id" @click="activeDef = def">
        {{ def.title }}
      </v-tab>
    </v-tabs>
    <v-card-text>
      <DashboardAccumulatedAttributesChart :data="activeHistory" :definition="activeDef" />
    </v-card-text>
  </v-card>
</template>

<script>
import openapiCached from '@/api/openapiCached';
import DashboardAccumulatedAttributesChart from '@/components/Charts/DashboardAccumulatedAttributesChart.vue';

export default {
  name: 'AttributeGraph',
  components: { DashboardAccumulatedAttributesChart },
  props: {
    user: Object,
  },
  data() {
    return {
      attributeDefinitions: [],
      activeDef: null,
      activeHistory: null,
    };
  },
  methods: {
    async fetchData() {
      (await openapiCached).user_getAttributeDefinitions().then((rsp) => {
        this.attributeDefinitions = rsp.data;

        const unspecAcc = this.unspecificAccumulatedDefinitions;

        if (unspecAcc.length > 0) {
          [this.activeDef] = unspecAcc;
        }
      });
    },
  },
  computed: {
    unspecificAccumulatedDefinitions() {
      return this.attributeDefinitions.filter((df) => df.unspecific === true && df.type === 'ACCUMULATED');
    },
  },
  watch: {
    async activeDef() {
      if (this.activeDef == null) {
        this.activeHistory = null;
      }

      (await openapiCached).user_getAttributeHistory(
        { uuid: this.user.id, definition_id: this.activeDef.id },
      ).then((rsp) => {
        this.activeHistory = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.activeHistory = null;
        this.utils.notifyUnexpectedError(err.response.data);
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
