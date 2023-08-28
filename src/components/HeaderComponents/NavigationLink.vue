<template>
  <div>
    <!-- Menu when Tabs are existent -->
    <v-menu
      v-if="(allowedTabs || []).length > 0"
      open-on-hover
      offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text class="nav-btn" :class="{ 'active-btn' : listActive && lightHeader }"
               v-bind="attrs" v-on="on">
          <v-icon left v-if="link.icon">{{ link.icon }}</v-icon>
          <span>{{ link.title }}</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list dense class="text-uppercase">
        <v-list-item v-for="(tab, index) in allowedTabs || []"
                     :key="index"
                     :href="(tab.cms_page_id === null && !localLink(tab) ? tab.link : null)"
                     :to="(tab.cms_page_id || localLink(tab) ?
                      getLocalLink(tab) : null)">
          <v-list-item-title>
            <v-icon left v-if="tab.icon">{{ tab.icon}}</v-icon>
            <span>{{ tab.title }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- simple button when no tabs are existent -->
    <v-btn
      text :dark="dark"
      v-if="(allowedTabs || []).length === 0" class="nav-btn"
      :active-class="lightHeader ? 'active-btn' : ''"
      :href="(link.cms_page_id === null && !localLink(link) ? link.link : null)"
      :to="(link.cms_page_id || localLink(link) ? getLocalLink(link) : null)">
      <v-icon left v-if="link.icon">{{ link.icon }}</v-icon>
      <span>{{ link.title }}</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'NavigationLinks.vue',
  props: {
    link: Object, dark: Boolean,
  },
  computed: {
    allowedTabs() {
      if (this.link.sublinks == null) {
        return [];
      }

      return this.link.sublinks.filter((t) => !t.req_prop || this.$checkProp(t.req_prop) === true);
    },
    listActive() {
      if (this.allowedTabs.length === 0) {
        return false;
      }
      const { path } = this.$route;
      return this.allowedTabs.some((t) => t.link === path);
    },
    lightHeader() {
      return this.$store.getters.theme && this.$store.getters.theme.light_header;
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

<style>
.active-btn {
  background-color: var(--v-primary-lighten1);
}

.active-btn::before {
  opacity: 0 !important;
}

.active-btn span {
  color: #FFFFFF !important;
}

</style>
