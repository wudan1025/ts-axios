import axios from '../../src/index'

// console.log(axios)
// axios 接口扩展开始
// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })
// axios 接口扩展结束


// axios 接口重载开始
// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios 接口重载结束

// axios 响应数据 支持泛型 开始
// interface ResponseData<T = any> {
//   code: number
//   result: T
//   message: string
// }

// interface User {
//   name: string
//   age: number
// }

// function getUser<T>() {
//   return axios<ResponseData<T>>('/extend/user')
//     .then(res => res.data)
//     .catch(err => console.error(err))
// }


// async function test() {
//   const user = await getUser<User>()
//   if (user) {
//     console.log(user.result.name)
//   }
// }

// test()

// axios 响应数据 支持泛型 结束
