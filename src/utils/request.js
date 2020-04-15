import axios from 'axios'
import { Dialog } from 'vant'
import Vue from 'vue'
import store from '../store/index'

Vue.use(Dialog)
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API
})

service.postForm = function (url, data) {
  const formData = new FormData()
  Object.keys(data).forEach(key => {
    const value = data[key]
    if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, data[key])
    }
  })
  return service.post(url, formData)
}

// request interceptor
service.interceptors.request.use(
  config => {
    const token = store.state.token
    if (token) config.headers.Authorization = token
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    const token = response.headers.authorization
    if (token) {
      store.commit('setState', { token })
    }
    if (res.code !== 0) {
      // 登录验证
      if (res.code === 40103 || res.code === 10503) {
        Dialog.alert({
          title: '提示',
          message: '登录超时',
          confirmButtonText: '返回登录'
        }).then(() => {
          store.commit.removeToken()
          this.$router.push('./login')
        })
      } else {
        console.error(`You see this message because the code of the response is not 0(actually ${res.code}), please read the msg and check:\n${res.msg}`)
      }
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    const { response } = error
    return response ? response.data : Promise.reject(error)
  }
)
export { service }
