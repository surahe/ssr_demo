import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      list: [],
      name: 'kay',
    },
    actions: {
      getList({ commit }, params) {
        return new Promise((resolve)=>{
          commit("setList",[{
            name:"广州"
          },{
            name:"深圳"
          }]);
          resolve();
        },2000)
          
      },
    },
    mutations: {
      setList(state, data) {
        state.list = data || [];
      },
    },
  });
}