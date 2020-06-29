import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
    (reason?: Cancel): void
}

export default class CancelToken {
    promise: Promise<Cancel>
    reason?: Cancel

    constructor(executor: CancelExecutor) {
        let resolvePromise: ResolvePromise
        // 在pengding状态的promise
        this.promise = new Promise<Cancel>(resolve => {
            resolvePromise = resolve
        })
        // 
        // console.log(this.promise)

        executor(message => {
            // 防止多次调用
            if (this.reason) {
                return
            }
            // 通过 new Cancel 判断是否是 cancel 类型错误
            this.reason = new Cancel(message)
            // console.log(this.reason)
            resolvePromise(this.reason)
        })
    }

    throwIfRequested(): void {
        // console.log(this.reason)
        if (this.reason) {
            throw this.reason
        }
    }

    static source(): CancelTokenSource {
        let cancel!: Canceler
        const token = new CancelToken(c => {
            // c 是 executor 中执行函数
            cancel = c
        })
        console.log(token)
        return {
            cancel,
            token
        }
    }
}