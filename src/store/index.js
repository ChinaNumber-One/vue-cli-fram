import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import lsPlugin from './lsPlugin'
import modules from './modules'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const plugins = []
if (process.env.NODE_ENV === 'development') plugins.push(lsPlugin)

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
  plugins
})

export default store
