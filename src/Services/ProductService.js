import apiClient from './axiosObject'

export default {
  getProducts(perPage, page) {
    return apiClient.get(`/products?_limit=${perPage}&_page=${page}`)
  },
  getProductById(id) {
    return apiClient.get(`/products/${id}`)
  }
}
