<template>
  <v-card class="mx-auto mb-5" max-width="250">
    <v-img class="white--text align-end" height="200px" :src="product.img">
      <v-card-title>{{ product.title }}</v-card-title>
    </v-img>

    <v-card-subtitle v-if="outOfStock" class="pb-0 font-weight-bold"
      >Quantity: {{ product.quantity }}</v-card-subtitle
    >
    <v-card-subtitle v-else class="pb-0 font-weight-bold"
      >Sorry, out of stock!</v-card-subtitle
    >

    <v-card-text class="text--primary">
      <div>{{ product.description }}</div>
      <v-divider class="my-2"></v-divider>
      <div class="font-weight-black">{{ priceFormat(product.price) }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="info"
        text
        :to="{ name: 'product-show', params: { id: product.id } }"
      >
        See more
      </v-btn>

      <v-btn
        color="success"
        text
        :disabled="!outOfStock"
        @click="addToCart"
        :product="product"
      >
        Add to cart
      </v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar" timeout="500">
      {{ this.product.title }} added to the cart.

      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false
    }
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    priceFormat(number) {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'VND'
      }).format(number)
    },
    async addToCart() {
      try {
        await this.$store.dispatch('product/addToCart', {
          id: this.product.id,
          title: this.product.title,
          price: this.product.price,
          quantity: 1
        })
        this.snackbar = !this.snackbar
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    outOfStock() {
      return !!this.product.quantity
    }
  }
}
</script>

<style></style>
