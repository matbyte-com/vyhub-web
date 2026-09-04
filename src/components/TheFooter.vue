<script setup>
import {version} from '../../package.json';
import {computed} from "vue";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import accessControlService from "@/services/AccessControlService";

const store = useStore();
const i18n = useI18n();


// Not part of the admin-managed navigation: the withdrawal form is a legal obligation, so its link
// is driven by the shop setting alone and cannot be removed from the footer while it is enabled.
const withdrawalLink = computed(() => (store.getters.shopConfig?.withdrawal_form_enabled
  ? [{ title: i18n.t('_withdrawal.title'), link: '/withdrawal' }]
  : []));

const communityName = computed(() => store.getters.generalConfig?.community_name);
const showBranding = computed(() => !store.getters.generalConfig?.remove_branding);

const navLinks = computed(() => {
  if (store.getters.generalConfig?.shop_only) {
    return [{
      title: i18n.t('home'), link: '/store'
    },
      {
        title: i18n.t('legal'),
        link: '/store/legal',
      },
      ...withdrawalLink.value];
  }

  if (store.getters.navItems == null) {
    return withdrawalLink.value;
  }

  return store.getters.navItems
    .filter((l) => l.enabled && l.location === 'FOOTER' && (!l.req_prop || accessControlService.methods.$checkProp(l.req_prop) === true))
    .concat(withdrawalLink.value);
})
</script>

<template>
  <v-footer
    color="footer-lighten-1"
    class="d-flex flex-column vh-footer ma-0 pa-0"
  >
    <div class="d-flex my-2 flex-wrap justify-center align-center ga-1">
      <NavigationLink
        v-for="(link, index) in navLinks"
        :key="index"
        class="no-active"
        :no-active="true"
        :link="link"
        :dark="true"
      />
      <LanguageSwitcher />
    </div>
    <div
      class="bg-footer py-4 px-4 d-flex flex-wrap justify-center align-center gc-1 gr-2 text-center"
      style="width: 100%"
    >
      <!-- Two groups instead of one long line: a narrow screen then breaks between the
           community and the branding rather than in the middle of either. -->
      <strong>
        {{ new Date().getFullYear() }}
        <template v-if="communityName">— {{ communityName }}</template>
      </strong>
      <strong>
        <span class="d-none d-sm-inline">—</span>
        <template v-if="showBranding">
          <a
            class="text-decoration-none"
            style="color: #fff"
            href="https://vyhub.net"
          >
            Powered by VyHub
          </a>
          —
        </template>
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
