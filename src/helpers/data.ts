import { isPlainObject } from './utils'

// 对请求数据做处理
export function transformRequest(data: any): any {
  // console.log(data)
  // console.log(isPlainObject(data))
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
