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
        :cla
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
      :class="{ 'ml-3' : subSubLink, 'v-list-item--active' : btnActive }"
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
    btnActive() {
      // SAME AS in NavigationLink.vue
      if (this.link.link === '/shop') {
        return this.$route.path === '/shop';
      } else {
        return this.$route.path.includes(this.link.link);
      }
    }
  },
  methods: {
    allowedSublinks(links) {
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
