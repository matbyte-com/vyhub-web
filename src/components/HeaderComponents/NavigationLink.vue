<template>
  <div>
    <!-- Menu when Tabs are existent -->
    <v-menu
      v-if="(allowedTabs || []).length > 0"
      open-on-hover
      offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text dark v-bind="attrs" v-on="on">
          <v-icon left>{{ link.icon }}</v-icon>
          <span>{{ link.title }}</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list dense class="text-uppercase">
        <v-list-item v-for="(tab, index) in allowedTabs || []"
                     :key="index"
                     :to="tab.link">
          <v-list-item-title>
            <v-icon left>{{ tab.icon}}</v-icon>
            <span>{{ tab.title }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- simple button when no tabs are existent -->
    <v-btn
      text dark
      v-if="(allowedTabs || []).length === 0"
      :href="(link.linkType === 'link' && localLink ? link.link : null)"
      :to="(link.linkType !== 'link' || !localLink ? getLocalLink : null)"
    >
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
      if (this.link.sublinks == null) {
        return [];
      }

      return this.link.sublinks.filter((t) => !t.reqProp || this.$checkProp(t.reqProp) === true);
    },
    localLink() {
      if (window) {
        return !!this.link.link.includes(window.location.hostname);
      }
      return false;
    },
    getLocalLink() {
      if (this.localLink) { return this.link.link.substring(window.location.origin.length); }
      return this.link.link;
    },
  },
  methods: {
  },
};
</script>
