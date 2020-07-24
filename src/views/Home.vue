<template>
  <v-container>
    <h1>Store</h1>
    <div v-if="loggedIn">
      <h3>Hello you</h3>
    </div>
    <div v-else>
      <h3>
        You need to
        <router-link :to="{ name: 'login' }">
          login
        </router-link>
        or
        <router-link :to="{ name: 'register' }">
          register
        </router-link>
        before using this app
      </h3>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapGetters('user', ['loggedIn'])
  }
}
</script>
