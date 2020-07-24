import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000'
})

export default {
  getProducts() {
    return apiClient.get('/products')
  },
  getProductById(id) {
    return apiClient.get(`/products/${id}`)
  }
}
