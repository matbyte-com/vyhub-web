<template>
  <div v-if="allProperties">
    <div class="d-flex align-center">
      <!-- TODO Label not working -->
      <span class="text-subtitle-1">{{ node.layout.label }}</span>
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
        {{ $t("selectAll") }}
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
            multiple
            hide-details="auto"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <div
    v-else
    style="min-height: 265px"
  >
    <v-skeleton-loader type="list-item@3" />
  </div>
</template>

<script>
import openapi from "../../api/openapi";

export default {
  props: {
    label: {
      type: String,
      default: null
    },
    node: {
      type: Object,
      required: true
    },
    statefulLayout: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      properties: [],
      allProperties: null,
      receivedContent: false
    };
  },
  watch: {
    properties() {
      this.receivedContent = true;
      this.statefulLayout.input(this.node, this.properties);
    },
    node() {
      this.loadContent();
    }
  },
  beforeMount() {
    this.fetchData();
    this.loadContent();
  },
  methods: {
    loadContent() {
      if (!this.receivedContent && this.node.data) {
        this.properties = this.node.data;
      }
    },
    async fetchData() {
      (await openapi).group_getAllProperties().then((rsp) => {
        this.allProperties = rsp.data;
      });
    },
    selectAll() {
      const res = [];
      this.allProperties.forEach((category) => {
        category[Object.keys(category)[0]].forEach((prop) => {
          res.push(prop.name);
        });
      });
      this.properties = res;
    }
  }
};
</script>

<style scoped>

</style>
