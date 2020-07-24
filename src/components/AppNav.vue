<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Store</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      v-for="(link, index) in links"
      :key="index"
      text
      rounded
      color="white"
      :to="link.url"
    >
      {{ link.label }}
    </v-btn>
    <v-btn v-if="!loggedIn" text rounded to="/login">Log in</v-btn>
    <v-btn v-if="!loggedIn" text rounded to="/register">Register</v-btn>
    <v-btn v-if="loggedIn" text rounded @click="logout">Log out</v-btn>

  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    }
  },
  computed: {
    ...mapGetters('user', ['loggedIn'])
  }
}
</script>

<style></style>
