<template>
  <v-tabs @change="emitToParent">
    <v-tab v-for="(tab, index) in tabs" :key="index">
      <v-icon left>{{ tab.icon }}</v-icon>
      <span>{{ tab.title }}</span>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'TabComponent',
  props: {
    tabs: Array,
  },
  data() {
    return {
    };
  },
  methods: {
    emitToParent(payload) {
      this.$emit('change', payload);
    },
  },
};
</script>

<style scoped>

</style>
