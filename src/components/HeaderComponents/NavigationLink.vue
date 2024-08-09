<template>
  <div>
    <!-- Menu when Tabs are existent -->
    <v-menu
      v-if="(allowedTabs || []).length > 0"
      open-on-hover
      offset-y>
      <template v-slot:activator="{ props }">
        <v-btn variant="text" class="nav-btn pr-0 pl-2"
               :class="{ 'active-btn-light' : listActive && lightHeader,
                'v-btn--active' : listActive && !lightHeader }"
               v-bind="props">
          <v-icon start v-if="link.icon">{{ link.icon }}</v-icon>
          <span>{{ link.title }}</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list density="compact" class="text-uppercase">
        <v-list-item v-for="(tab, index) in allowedTabs || []"
                     :key="index"
                     :href="(tab.cms_page_id === null && !utils.localLink(tab) ? tab.link : null)"
                     :to="(tab.cms_page_id || utils.localLink(tab) ?
                      utils.getLocalLink(tab) : null)">
          <v-list-item-title>
            <v-icon start v-if="tab.icon">{{ tab.icon}}</v-icon>
            <span>{{ tab.title }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- simple button when no tabs are existent -->
    <v-btn
      variant="text" :dark="dark"
      v-if="(allowedTabs || []).length === 0" class="nav-btn px-3"
      :selected-class="lightHeader ? 'active-btn-light' : ''"
      :href="(link.cms_page_id === null && !utils.localLink(link) ? link.link : null)"
      :to="(link.cms_page_id || utils.localLink(link) ? utils.getLocalLink(link) : null)">
      <v-icon start class="" v-if="link.icon">{{ link.icon }}</v-icon>
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
      return this.allowedTabs.some((t) => path.includes(t.link));
    },
    lightHeader() {
      return this.$store.getters.theme && this.$store.getters.theme.light_header;
    },
  },
};
</script>

<style>
.active-btn-light {
  background-color: var(--v-primary-lighten1);
}

.active-btn-light::before {
  opacity: 0 !important;
}

.active-btn-light span {
  color: #FFFFFF !important;
}

</style>
