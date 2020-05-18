import axios from '../../src/index'

axios.interceptors.request.use(request => {
  request.headers.test += '1'
  return request
})
axios.interceptors.request.use(request => {
  request.headers.test += '2'
  return request
})
axios.interceptors.request.use(request => {
  request.headers.test += '3'
  return request
})

axios.interceptors.response.use(response => {
  response.data += '1'
  return response
})
// 获取拦截器id
let interceptor = axios.interceptors.response.use(response => {
  response.data += '2'
  return response
})
axios.interceptors.response.use(response => {
  response.data += '3'
  return response
})

// 根据id删除拦截器
axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((response) => {
  console.log(response.data)
})
