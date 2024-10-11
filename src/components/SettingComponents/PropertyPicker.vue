<template>
  <div v-if="allProperties">
    <div class="d-flex align-center">
      <span class="text-subtitle-1">{{ label }}</span>
      <v-spacer />
      <v-btn
        variant="outlined"
        color="secondary"
        size="small"
        @click="selectAll()"
      >
        <v-icon start>
          mdi-expand-all
        </v-icon>
        {{ $t('selectAll') }}
      </v-btn>
    </div>
    <v-expansion-panels class="mt-1">
      <v-expansion-panel
        v-for="(category, index) in allProperties"
        :key="index"
      >
        <v-expansion-panel-title>
          {{ $t(`_property.categories.${Object.keys(category)[0]}`) }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-checkbox
            v-for="prop in category[Object.keys(category)[0]]"
            :key="prop.name"
            v-model="properties"
            :label="$t(`_property.descriptions.${prop.name}`)"
            :value="prop.name"
            density="compact"
            hide-details="auto"
            v-on="{...on, change}"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import openapi from '../../api/openapi';

export default {
  props: {
    value: { type: Array[String], default: '' },
    options: { type: Object, required: true },
    schema: { type: Object, required: true },
    fullSchema: { type: Object, required: true },
    fullKey: { type: String, required: true },
    label: { type: String, default: '' },
    htmlDescription: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    rules: { type: Array, required: true },
    on: { type: Object, required: true },
  },
  data() {
    return {
      properties: [],
      allProperties: null,
    };
  },
  beforeMount() {
    this.properties = this.value;
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).group_getAllProperties().then((rsp) => {
        this.allProperties = rsp.data;
      });
    },
    change() {
      this.on.input(this.properties);
    },
    selectAll() {
      const res = [];
      this.allProperties.forEach((category) => {
        category[Object.keys(category)[0]].forEach((prop) => {
          res.push(prop.name);
        });
      });
      this.properties = res;
      this.on.input(this.properties);
    },
  },
};
</script>

<style scoped>

</style>
