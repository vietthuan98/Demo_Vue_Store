<template>
  <v-container>
    <h1>Products</h1>
    <v-row>
      <ProductDetail
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </v-row>
    <v-row class="pagination d-flex flex-row justify-center align-center">
      <v-btn
        v-if="currentPage > 1"
        class="mr-2"
        color="info"
        :to="{ name: 'products', query: { page: currentPage - 1 } }"
      >
        Prev page
      </v-btn>
      <v-btn
        v-if="hasNextPage"
        class="ml-2"
        color="info"
        :to="{ name: 'products', query: { page: currentPage + 1 } }"
      >
        Next page
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ProductDetail from '@/components/ProductDetail.vue'
export default {
  data() {
    return {
      perPage: 8
    }
  },
  created() {
    this.$store.dispatch('product/getProducts', {
      perPage: this.perPage,
      page: this.currentPage
    })
  },
  computed: {
    ...mapState('product', ['products']),
    ...mapState('product', ['totalProduct']),
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.perPage * this.currentPage < this.totalProduct
    },
    totalPage() {
      return Math.ceil(this.totalProduct / this.perPage)
    }
  },
  components: {
    ProductDetail
  }
}
</script>

<style></style>
