import axios from 'axios'
import UserService from '@/Services/UserService'
export const namespaced = true

export const state = () => ({
  userData: null
})

export const mutations = {
  SET_DATA_USER(state, userData) {
    state.userData = userData
    localStorage.setItem('user', JSON.stringify(userData))
    axios.defaults.headers.common['Authorization'] = `Bear ${userData.accessToken}`
  },
  DELETE_DATA_USER() {
    localStorage.removeItem('user'),
    location.reload()
  }
}

export const actions = {
  async register({ commit }, credential) {
    try {
      const { data } = await UserService.register(credential)
      await commit('SET_DATA_USER', data)
    } catch (err) {
      console.log(err.response)
    }
  },
  async login({ commit }, credential) {
    try {
      const { data } = await UserService.login(credential)
      await commit('SET_DATA_USER', data)
    } catch (err) {
      console.log(err.response)
    }
  },
  logout({ commit }) {
    commit('DELETE_DATA_USER')
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.userData
  }
}

