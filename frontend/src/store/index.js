import Vue from 'vue'
import Vuex from 'vuex'
import playerStore from './player.store'
import gameStore from './game.store'
import alertStore from './alert.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    playerStore, 
    gameStore, 
    alertStore
  }
})
