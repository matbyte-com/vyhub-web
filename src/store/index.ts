import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const getDefaultState = () => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  properties: null,
  address: null,
  cartPacketCount: 0,
  creditAccount: null,
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
    properties: (state) => state.properties,
    address: (state) => state.address,
    cartPacketCount: (state) => state.cartPacketCount,
    creditAccount: (state) => state.creditAccount,
  },
  mutations: {
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
    SET_TOKEN: (state, { accessToken, refreshToken }) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
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
  },
  actions: {
    login: ({ commit }, { accessToken, refreshToken }) => {
      commit('SET_TOKEN', { accessToken, refreshToken });
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
