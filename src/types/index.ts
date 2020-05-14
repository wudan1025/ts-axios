export type Method = 'get' | 'GET' |
    'delete' | 'DELETE' |
    'head' | 'HEAD' |
    'OPTIONS' | 'options' |
    'put' | 'PUT' |
    'PATCH' | 'patch' |
    'post' | 'POST'

// 请求配置
export interface AxiosRequestConfig {
    url?: string,
    method?: Method,
    data?: any,
    params?: any,
    headers?: any,
    // 设置返回数据格式
    responseType?: XMLHttpRequestResponseType,
    // 超时时间
    timeout?: number
}

// 响应配置
export interface AxiosResponse {
    data: any,
    status: number,
    statusText: string,
    headers: any,
    config: AxiosRequestConfig,
    request: any,
}


// ?
export interface AxiosPromise extends Promise<AxiosResponse> {

}

// 错误配置
export interface AxiosError extends Error {
    config: AxiosRequestConfig
    code?: string
    request?: any
    response?: AxiosResponse
    isAxiosError: boolean
}

// axios 类型接口 提供公共方法
export interface Axios {
    request(config: AxiosRequestConfig): AxiosPromise
    get(url: string, config?: AxiosRequestConfig): AxiosPromise
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise
    head(url: string, config?: AxiosRequestConfig): AxiosPromise
    options(url: string, config?: AxiosRequestConfig): AxiosPromise
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

// ?
// 接口既有对象又有函数 混合类型接口
export interface AxiosInstance extends Axios {
    (config: AxiosRequestConfig): AxiosPromise
}