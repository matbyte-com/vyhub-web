<template>
  <div>
    <!-- if tabs are existent -->
    <v-list-group
      v-if="(link.sublinks || []).length > 0"
      v-on:click.stop="">
      <template v-slot:activator>
        <v-icon left>{{ link.icon }}</v-icon>
        <v-list-item-title>{{ link.title }}</v-list-item-title>
      </template>
      <div v-for="(tab, index) in link.sublinks" :key="index">
        <v-list-item class="ml-3"
                     v-if="tab.enabled === true && $checkProp(tab.reqProp)"
                     :href="tab.cms_page_id === null && !localLink(tab) ? tab.link : null"
                     :to="tab.cms_page_id || localLink(tab) ? getLocalLink(tab) : null"
                     link>
          <v-icon left>{{ tab.icon }}</v-icon>
          <v-list-item-title>{{ tab.title }}</v-list-item-title>
        </v-list-item>
      </div>
    </v-list-group>
    <!-- if no tabs are existent -->
    <v-list-item v-if="(link.sublinks || []).length === 0"
                 :href="(link.cms_page_id === null && !localLink(link) ?
                      link.link : null)"
                 :to="(link.cms_page_id || localLink(link) ?
                      getLocalLink(link) : null)" :class="subSubLink ? 'ml-3' : ''">
      <v-icon left>{{ link.icon }}</v-icon>
      <v-list-item-title>{{ link.title }}</v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'ListItemTab',
  props: {
    link: Object,
    subSubLink: Boolean,
  },
  computed: {
    allowedTabs() {
      if (this.link.sublinks == null) {
        return [];
      }

      return this.link.sublinks.filter((t) => !t.reqProp || this.$checkProp(t.reqProp) === true);
    },
  },
  methods: {
    getLocalLink(link) {
      if (!link.link) return '';
      if (link.default) return link.link;
      if (this.localLink(link)) { return link.link.substring(window.location.origin.length); }
      return link.link;
    },
    localLink(link) {
      if (!link.link) return false;
      if (link.default) return true;
      if (window) {
        return !!link.link.includes(window.location.hostname);
      }
      return false;
    },
  },
};
</script>

<style scoped>

</style>
