import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const getDefaultState = () => ({
  accessToken: null,
  refreshToken: null,
  refreshAfter: null,
  user: null,
  properties: null,
  address: null,
  cartPacketCount: 0,
  creditAccount: null,
  generalConfig: null,
  navItems: null,
  theme: null,
});

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: (state) => state.accessToken != null && state.user != null,
    user: (state) => state.user,
    accessToken: (state) => state.accessToken,
    refreshToken: (state) => state.refreshToken,
    refreshAfter: (state) => state.refreshAfter,
    properties: (state) => state.properties,
    address: (state) => state.address,
    cartPacketCount: (state) => state.cartPacketCount,
    creditAccount: (state) => state.creditAccount,
    generalConfig: (state) => state.generalConfig,
    navItems: (state) => state.navItems,
    theme: (state) => state.theme,
  },
  mutations: {
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
    SET_TOKEN: (state, { accessToken, refreshToken, refreshAfter }) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.refreshAfter = refreshAfter;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_PROPERTIES: (state, properties) => {
      state.properties = properties;
    },
    SET_ADDRESS: (state, address) => {
      state.address = address;
    },
    SET_CART_PACKET_COUNT: (state, cartPacketCount) => {
      state.cartPacketCount = cartPacketCount;
    },
    SET_CREDIT_ACCOUNT: (state, credits) => {
      state.creditAccount = credits;
    },
    SET_GENERAL_CONFIG: (state, general_config) => {
      state.generalConfig = general_config;
    },
    SET_NAV_ITEMS: (state, nav_items) => {
      state.navItems = nav_items;
    },
    SET_THEME: (state, theme) => {
      state.theme = theme;
    },
  },
  actions: {
    login: ({ commit }, { accessToken, refreshToken, refreshAfter }) => {
      commit('SET_TOKEN', { accessToken, refreshToken, refreshAfter });
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    },
    setUserData: ({ commit }, { user }) => {
      commit('SET_USER', user);
    },
    setProperties: ({ commit }, { properties }) => {
      commit('SET_PROPERTIES', properties);
    },
    setAddress: ({ commit }, { address }) => {
      commit('SET_ADDRESS', address);
    },
    setCartPacketCount: ({ commit }, { cartPacketCount }) => {
      commit('SET_CART_PACKET_COUNT', cartPacketCount);
    },
    setCreditAccount: ({ commit }, { creditAccount }) => {
      commit('SET_CREDIT_ACCOUNT', creditAccount);
    },
  },
  modules: {
  },
});
