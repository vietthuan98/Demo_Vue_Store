import axios from 'axios'
// import NProgress from 'nprogress' 

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//progress bar
// apiClient.interceptors.request.use(config => {
//   NProgress.start()
//   return config
// })

// apiClient.interceptors.response.use(response => {
//   NProgress.done()
//   return response
// })

export default apiClient