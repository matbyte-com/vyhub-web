<template>
  <div>
    <!-- if tabs are existent -->
    <v-list-group
      v-if="(link.sublinks || []).length > 0"
    >
      <template #activator="{props}">
        <v-list-item v-bind="props">
          <v-list-item-title>
            <v-icon start>
              {{ link.icon }}
            </v-icon>
            {{ link.title }}
          </v-list-item-title>
        </v-list-item>
      </template>
      <v-list-item
        v-for="(tab, index) in allowedSublinks(link.sublinks)"
        :key="index"
        class="ml-3"
        :href="tab.cms_page_id === null && !localLink(tab) ? tab.link : null"
        :to="tab.cms_page_id || localLink(tab) ? getLocalLink(tab) : null"
        link
      >
        <v-list-item-title>
          <v-icon start>
            {{ tab.icon }}
          </v-icon>
          {{ tab.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list-group>
    <!-- if no tabs are existent -->
    <v-list-item
      v-if="(link.sublinks || []).length === 0"
      :href="(link.cms_page_id === null && !localLink(link) ?
        link.link : null)"
      :to="(link.cms_page_id || localLink(link) ?
        getLocalLink(link) : null)"
      :class="subSubLink ? 'ml-3' : ''"
    >
      <v-list-item-title>
        <v-icon start>
          {{ link.icon }}
        </v-icon>
        {{ link.title }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    link: Object,
    subSubLink: Boolean,
  },
  computed: {
    allowedTabs() {
      if (this.link.sublinks == null) {
        return [];
      }

      return this.link.sublinks.filter((t) => !t.req_prop || this.$checkProp(t.req_prop) === true);
    },
  },
  methods: {
    allowedSublinks(links) {
      // TODO war vorher so v-if="tab.enabled === true && $checkProp(tab.req_prop)"
      return links.filter((tab) => tab.enabled === true && (!tab.req_prop || this.$checkProp(tab.req_prop) === true));
    },
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
