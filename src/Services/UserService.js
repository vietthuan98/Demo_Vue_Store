import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000'
})

export default {
  register(userData) {
    return apiClient.post('/register', userData)
  },
  login(userData) {
    return apiClient.post('/login', userData)
  }
}
