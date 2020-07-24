<template>
  <v-container class="register d-flex justify-center align-center">
    <v-card width="500" class="pa-5">
      <h1>Register</h1>
      <v-form
        @submit.prevent="register"
        v-model="formValidity"
        ref="registerForm"
      >
        <v-text-field
          label="Email"
          type="email"
          v-model="user.email"
          prepend-icon="mdi-account-circle"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          v-model="user.password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mid-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :rules="passwordRules"
          required
        ></v-text-field>
        <v-text-field
          label="FirstName"
          type="text"
          v-model="user.firstname"
        ></v-text-field>
        <v-text-field
          label="LastName"
          type="text"
          v-model="user.lastname"
        ></v-text-field>
        <v-text-field label="Age" type="text" v-model="user.age"></v-text-field>
        <v-checkbox
          label="Agree to terms & conditions"
          v-model="agreeToTerm"
          :rules="agreeToTermRules"
          required
        />
        <v-btn
          class="mr-2"
          :disabled="!formValidity"
          type="Submit"
          color="success"
          @click="register"
          >Register</v-btn
        >
        <v-btn class="mr-2" @click="checkValidation" color="info"
          >Check again</v-btn
        >
        <p class="pt-3">
          You already have an account? Click
          <router-link :to="{ name: 'login' }">
            here 
          </router-link>
          to login.
        </p>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { uuid } from '../uuid'
export default {
  data() {
    return {
      formValidity: false,
      showPassword: false,
      agreeToTerm: false,
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
      agreeToTermRules: [
        value =>
          !!value ||
          'You must agree to the terms and conditions to sign up an account.'
      ],
      user: this.createFreshUserObject()
    }
  },
  methods: {
    createFreshUserObject() {
      return {
        id: uuid(),
        email: '',
        password: '',
        firtname: '',
        lastname: ''
      }
    },
    checkValidation() {
      this.$refs.registerForm.validate()
    },
    async register() {
      try {
        await this.$store.dispatch('user/register', this.user)
        await this.$router.push({ name: 'product' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style></style>
