import apiClient from './axiosObject'

export default {
  register(userData) {
    return apiClient.post('/register', userData)
  },
  login(userData) {
    return apiClient.post('/login', userData)
  }
}
