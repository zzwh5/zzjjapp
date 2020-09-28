import axios from 'axios'
import store from '@/store'
// import { getToken } from '@/utils/auth'
import { Notify } from 'vant';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.resolve(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code != 200) {
      Notify({ type: "warning", message: res.msg || '请稍后重试' });
    } else {
      Notify({ type: "success", message: "success", duration: 500 });
    }
    return res
  },
  async error => {
    // console.dir(error);
    Notify({ type: "danger", message: "连接服务器超时" });
    return Promise.reject(error);
  }
)

export default service
