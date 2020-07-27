<template>
  <v-container>
    <h1>
      <v-icon left x-large>mdi-cart</v-icon>
      <span>Cart</span>
    </h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Title</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Price</th>
            <th class="text-left">Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in cart"
            :key="index"
            v-show="product.quantity > 0"
          >
            <td>{{ product.title }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ formatNumber(product.price) }}</td>
            <td>
              <v-btn color="warning" @click="removeProduct(product.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('product', ['cart']),
    ...mapGetters('product', ['cartLength'])
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'VND'
      }).format(number)
    },
    async removeProduct(productId) {
      try {
        await this.$store.dispatch('product/removeProductFormCart', productId)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style></style>
