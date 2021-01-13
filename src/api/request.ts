import axios from 'axios'
const COOKIE = ''
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

http.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response
  }
}, err => {
  return Promise.reject(err)
})

export const getRequest = (url: string, params = {}) => {
  return http.get(url, { params: { ...params, cookie: COOKIE } })
}
