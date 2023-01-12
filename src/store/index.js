import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOKEN_KEY'

export default new Vuex.Store({
  state: {
    // user: JSON.parse(localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUer(state, data) {
      // 1.存入vuex
      state.user = data
      // 2.存入本地（持久化）
      setItem(TOKEN_KEY, state.user)
      // localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  }
})
