<template>
  <v-app>
    <AppNav :links="links"/>
    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
    <AppFooter :links="links"/>
  </v-app>
</template>

<script>
import AppFooter from '@/components/AppFooter'
import AppNav from '@/components/AppNav'
export default {
  name: 'App',
  data: () => ({
    links: [
      {
        label: 'Home',
        url: '/'
      },
      {
        label: 'Product',
        url: '/products'
      }
    ]
  }),
  components: {
    AppFooter,
    AppNav
  }
}
</script>
