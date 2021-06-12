<template>
  <v-card>
    {{ user.username  }}  {{ user.id  }}
    <DashboardAccumulatedAttributesChart />
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
    };
  },
  methods: {
    async fetchData() {
      (await openapiCached).user_getAttributeDefinitions().then((rsp) => {
        this.attributeDefinitions = rsp.data;
      });
    },
  },
  computed: {
    getUnspecAccumulatedDefinitions() {
      return this.attributeDefinitions.filter((df) => df.unspecific === true && df.type === 'ACCUMULATED');
    },
  },
};
</script>

<style scoped>

</style>
