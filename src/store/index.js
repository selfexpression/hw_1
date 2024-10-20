import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storeData: [
      { id: 1, value: '' },
      { id: 2, value: '' },
      { id: 3, value: '' },
      { id: 4, value: '' },
      { id: 5, value: '' },
    ],
  },
  getters: {
    getData: (state) => state.storeData,
  },
  mutations: {
    setData: (state, payload) => {
      state.storeData = payload;
    },
  },
  actions: {
    loadData: ({ commit, state }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('setData', state.storeData);
          resolve();
        }, 1000);
      });
    },
    sendData: ({ commit }, payload) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('setData', payload);
          resolve();
        }, 1000);
      });
    },
  },
});
