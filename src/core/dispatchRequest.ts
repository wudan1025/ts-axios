import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import { processHeaders, flattenHeaders } from '../helpers/header'
import xhr from './xhr'
import transform from './transform'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    // console.log(res)
    return transformResponseData(res)
  })
}

// 如果调用时候传递了cancelToken则直接抛出异常
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  // console.log(config.cancelToken)
  if (config.cancelToken) {
    // console.log('config.cancelToken.throwIfRequested()')
    config.cancelToken.throwIfRequested()
  }
}

// 对参数进行处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 先处理header再处理data
  config.headers = transformHeaders(config)
  // 处理data发送数据
  config.data = transform(config.data, config.headers, config.transformRequest)
  // 对header进行 flat 处理
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 对url进行处理
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  // 加 ！表示类型断言，这个变量不会为空
  return buildURL(url!, params)
}

// 处理 header
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 修改返回值，将json改为字符串
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

export default dispatchRequest
