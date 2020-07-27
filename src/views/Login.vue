<template>
  <v-container class="login d-flex justify-center align-center">
    <v-card width="500" class="pa-5">
      <h1>Login</h1>
      <v-form @submit.prevent="login" v-model="formValidity" ref="formRegister">
        <v-text-field
          label="Email"
          type="email"
          v-model="email"
          prepend-icon="mdi-account-circle"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :rules="passwordRules"
          required
        ></v-text-field>
        <v-btn type="submit" @click="validateForm">Login</v-btn>
        <p class="pt-3">
          You don't have an account? Click
          <router-link :to="{ name: 'register' }">
            here.
          </router-link>
        </p>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      formValidity: false,
      emailRules: [
        value => !!value || 'Email is required',
        value => value.indexOf('@') !== 0 || 'Email should have a username.',
        value => value.includes('@') || 'Email should include an @ symbol.',
        value =>
          value.indexOf('.') - value.indexOf('@') > 1 ||
          'Email should contain a valid domain.',
        value => value.includes('.') || 'Email should include a period symbol',
        value =>
          value.indexOf('.') <= value.length - 3 ||
          'Email should contain a valid domain extension.'
      ],
      passwordRules: [
        value => !!value | 'Password is required',
        value => value.length > 6 || 'Password is too short'
      ],
      email: '',
      password: ''
    }
  },
  methods: {
    validateForm() {
      this.$refs.formRegister.validate()
    },
    async login() {
      try {
        await this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password
        })
        await this.$router.push({ name: 'products' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style></style>
