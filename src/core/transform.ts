import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
) {
  if (!fns) {
    return data
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    // console.log(fn)
    // 每一次返回值当做下一次data调用
    // console.log(fn(data, headers))
    data = fn(data, headers)
  })
  // console.log(data)
  return data
}
