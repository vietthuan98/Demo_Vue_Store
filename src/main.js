import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created() {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('user/SET_DATA_USER', userData)
      // set cart data
      const cartString = localStorage.getItem('cart')
      if (cartString) {
        const cartData = JSON.parse(cartString)
        this.$store.commit('product/SET_CART_FROM_LOCALSTORAGE', cartData)
      }
    }

    axios.interceptors.response.use(
      response => response, // simply return the response
      error => {
        if (error.response.status === 401) {
          // if we catch a 401 error
          this.$store.dispatch('logout') // force a log out
        }
        return Promise.reject(error) // reject the Promise, with the error as the reason
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
