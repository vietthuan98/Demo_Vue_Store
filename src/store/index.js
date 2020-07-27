import Vue from "vue";
import Vuex from "vuex";

import * as user from '@/store/modules/user'
import * as product from '@/store/modules/product'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    product
  }
});
