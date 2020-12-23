import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const getDefaultState = () => ({
  token: '',
});

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    login: ({ commit, dispatch }, token) => {
      commit('SET_TOKEN', token);
      // set auth header
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    },
  },
  modules: {
  },
});
