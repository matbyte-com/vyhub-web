import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const getDefaultState = () => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  properties: null,
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
  },
  mutations: {
    SET_TOKEN: (state, { accessToken, refreshToken }) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
    SET_PROPERTIES: (state, properties) => {
      state.properties = properties;
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
  },
  modules: {
  },
});
