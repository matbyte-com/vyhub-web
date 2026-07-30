<script setup>
import {version} from '../../package.json';
import {computed} from "vue";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import accessControlService from "@/services/AccessControlService";

const store = useStore();
const i18n = useI18n();


const navLinks = computed(() => {
  if (store.getters.generalConfig?.shop_only) {
    return [{
      title: i18n.t('home'), link: '/store'
    },
      {
        title: i18n.t('legal'),
        link: '/store/legal',
      }];
  }

  if (store.getters.navItems == null) {
    return [];
  }

  return store.getters.navItems
    .filter((l) => l.enabled && l.location === 'FOOTER' && (!l.req_prop || accessControlService.methods.$checkProp(l.req_prop) === true));
})
</script>

<template>
  <v-footer
    color="footer-lighten-1"
    class="d-flex flex-column vh-footer ma-0 pa-0"
  >
    <div class="d-flex my-2 flex-wrap justify-center">
      <NavigationLink
        v-for="(link, index) in navLinks"
        :key="index"
        class="ml-1 no-active"
        :no-active="true"
        :link="link"
        :dark="true"
      />
    </div>
    <div
      class="bg-footer py-4 text-center"
      style="width: 100%"
    >
      <strong>
        {{ new Date().getFullYear() }}
        <span v-if="store.getters.generalConfig != null">
          — {{ store.getters.generalConfig.community_name }}
        </span>
        <span v-if="!store.state.generalConfig?.remove_branding">
          —
          <a
            class="text-decoration-none"
            style="color: #fff"
            href="https://vyhub.net"
          >
            Powered by VyHub
          </a>
        </span>
        —
        {{ version }}
      </strong>
    </div>
  </v-footer>
</template>

<style scoped>
.no-active :deep(.v-btn__overlay) {
  opacity: 0 !important;
}
</style>
