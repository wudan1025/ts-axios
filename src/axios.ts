import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // 用 Axios.request 可行吗
  const instance = Axios.prototype.request.bind(context)
  // 拷贝属性，将 context 属性 拷贝到 instance 上
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

// 创建新的 axios 实例
axios.create = function create(config: any) {
  // 合并配置
  return createInstance(mergeConfig(defaults,config))
}

// 取消
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
