import axios, { AxiosTransformer } from '../../src/index'
// import axios from '../../src/index'

import qs from 'qs'

// axios.defaults.headers.common['test2'] = 123

// // 自定义参数 开始
// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// 自定义参数 结束


// 使用 transformRequest/transformResponse 开始
// axios({
//   transformRequest: [(function (data) {
//     // console.log(data)
//     // console.log(qs.stringify(data))
//     // return qs.stringify(data)
//     return data
//   }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function (data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// 使用 transformRequest/transformResponse 结束


// 使用 create 开始
const instance = axios.create({
    // transformRequest: [(function (data) {
    //     return qs.stringify(data)
    //     // return data
    // }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
    // transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function (data) {
    //     if (typeof data === 'object') {
    //         data.b = 2
    //     }
    //     return data
    // }]
})

instance({
    url: '/config/post',
    method: 'post',
    // data: {
    //     a: 1
    // }
    data: qs.stringify({
        a: 1
    }),
}).then((res) => {
    console.log(res.data)
})
// 使用 create 结束