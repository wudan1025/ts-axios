import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/header'
import xhr from './xhr'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then((res) => {
        return transformResponseData(res)
    })
}

// 对参数进行处理
function processConfig(config: AxiosRequestConfig): void {
    config.url = transformURL(config)
    // 先处理header再处理data
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}

// 对url进行处理
function transformURL(config: AxiosRequestConfig): string {
    const { url, params } = config
    // 加 ！表示类型断言，这个变量不会为空
    return buildURL(url!, params)
}

// 处理data发送数据
function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}

// 处理 header 
function transformHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config
    return processHeaders(headers, data)
}

// 修改返回值，将json改为字符串
function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transformResponse(res.data)
    return res
}

export default dispatchRequest