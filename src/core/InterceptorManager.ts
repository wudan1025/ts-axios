import { ResolvedFn, RejectedFn } from '../types/index'
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  // 添加拦截器
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }
  // 遍历拦截器
  forEach(fn: (Interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor != null) {
        // 执行函数
        fn(interceptor)
      }
    })
  }
  // 根据id删除拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      // 不能直接删除数组，而是把值置为null
      this.interceptors[id] = null
    }
  }
}
