import { createPinia, defineStore, setActivePinia } from 'pinia';

export const pinia = createPinia();

// The API client, the services and the router guards all reach for the store while their
// module is being evaluated, which happens before main.ts can install pinia on the app.
setActivePinia(pinia);

const STORAGE_KEY = 'vuex';

interface State {
  accessToken: string | null;
  refreshToken: string | null;
  refreshAfter: string | Date | null;
  user: any;
  properties: any;
  address: any;
  cartPacketCount: number;
  creditAccount: any;
  generalConfig: any;
  shopConfig: any;
  navItems: any[] | null;
  theme: any;
  activeCustomerJourneyStep: string | null;
  hideWelcomeOverlay: boolean | null;
  homePageComponents: any;
  userMemberships: any;
  // Visitor's manual language choice. Null means "follow the community default".
  locale: string | null;
}

export const useVyHubStore = defineStore('vyhub', {
  state: (): State => ({
    accessToken: null,
    refreshToken: null,
    refreshAfter: null,
    user: null,
    properties: null,
    address: null,
    cartPacketCount: 0,
    creditAccount: null,
    generalConfig: null,
    shopConfig: null,
    navItems: null,
    theme: null,
    activeCustomerJourneyStep: null,
    hideWelcomeOverlay: null,
    homePageComponents: null,
    userMemberships: null,
    locale: null,
  }),
  getters: {
    isLoggedIn: (state) => state.accessToken != null && state.user != null,
  },
  actions: {
    login(accessToken: string, refreshToken: string, refreshAfter: Date | null) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.refreshAfter = refreshAfter;
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.refreshAfter = null;
      this.user = null;
      this.properties = null;
      this.address = null;
      this.cartPacketCount = 0;
      this.creditAccount = null;
      this.userMemberships = null;
    },
  },
});

// Persistence is wired up by hand rather than through pinia-plugin-persistedstate: pinia only
// starts applying plugins once it is installed on an app, which happens after the modules above
// have already created the store. Keeping the Vuex storage key and its flat shape means existing
// visitors keep their session across the upgrade.
const store = useVyHubStore();

const persisted = localStorage.getItem(STORAGE_KEY);
if (persisted) {
  try {
    store.$patch(JSON.parse(persisted));
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Synchronous, because callers such as the language switcher reload the page immediately
// after writing to the store.
store.$subscribe((_mutation, state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}, { flush: 'sync' });
