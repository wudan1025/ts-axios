import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
function createInstance(): AxiosInstance {
    const context = new Axios()
    // 用 Axios.request 可行吗
    const instance = Axios.prototype.request.bind(context)
    // 拷贝属性，将 context  属性 拷贝到 instance 上
    extend(instance, context)
    return instance as AxiosInstance
}

const axios = createInstance()

export default axios