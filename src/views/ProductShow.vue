<template>
  <v-container>
    <v-row class="d-flex flex-column">
      <div v-for="(value, name) in product" :key="name">
        {{ name }}: {{ value }}
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: () => ({})
    }
  }
}
</script>

<style></style>
