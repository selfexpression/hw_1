import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storeData: [],
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
    loadData: ({ commit }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const payload = [
            { id: 1, value: 'value 1' },
            { id: 2, value: 'value 2' },
            { id: 3, value: 'value 3' },
            { id: 4, value: 'value 4' },
            { id: 5, value: 'value 5' },
          ];

          commit('setData', payload);
          resolve();
        }, 1000);
      });
    },
    sendData: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },
  },
});
