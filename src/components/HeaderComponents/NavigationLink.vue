<template>
  <div>
    <!-- Menu when Tabs are existend -->
    <v-menu
      v-if="(link.tabs || []).length > 0"
      open-on-hover
      offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" depressed dark v-bind="attrs" v-on="on">
          <v-icon left>{{ link.icon }}</v-icon>
          <span>{{ link.title }}</span>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item v-for="(tab, index) in allowedTabs || []"
                     :key="index"
                     @click="$router.push(tab.link)">
          <v-list-item-title>
            <v-icon left>{{ tab.icon }}</v-icon>
            <span>{{ tab.title }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- simple button when no tabs are existend -->
    <v-btn
      v-else
      color="primary"
      depressed
      dark
      @click="$router.push(link.link)">
      <v-icon left>{{ link.icon }}</v-icon>
      <span>{{ link.title }}</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'NavigationLinks.vue',
  props: {
    link: Object,
  },
  computed: {
    allowedTabs() {
      return this.link.tab.filter((t) => !t.reqProp || this.$checkProp(t.reqProp) === true);
    },
  },
};
</script>
