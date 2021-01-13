import axios from 'axios'
const COOKIE = '__csrf=fbc98424247272106dc14bad9982ba03; Max-Age=1296010; Expires=Mon, 4 Jan 2021 08:24:15 GMT; Path=/;;__remember_me=true; Max-Age=1296000; Expires=Mon, 4 Jan 2021 08:24:05 GMT; Path=/;;MUSIC_U=5ef7e7004dc2cc93032c5f445728682ac2220e1622ff7944587a9e47bba7108f0931c3a9fbfe3df2; Max-Age=1296000; Expires=Mon, 4 Jan 2021 08:24:05 GMT; Path=/;'
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
