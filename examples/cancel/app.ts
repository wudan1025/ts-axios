import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()
console.log(source.token)
axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() => {
  // debugger
  source.cancel('Operation canceled by the user.')

  // token 已经被使用 请求无法发出 直接报错
  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

// let cancel: Canceler

// axios.get('/cancel/get', {
//   cancelToken: new CancelToken(c => {
//     cancel = c
//   })
// }).catch(function (e) {
//   if (axios.isCancel(e)) {
//     console.log('Request canceled')
//   }
// })

// setTimeout(() => {
//   cancel()
// }, 300)
