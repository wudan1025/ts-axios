import { isPlainObject } from './utils'
import { parse } from 'path'

// 替换 header 大小写
function normalizeHeaderName(headers: any, normalizedName: string): void {
    if (!headers) {
        return
    }
    Object.keys(headers).forEach((name) => {
        if (name !== normalizedName && name.toLocaleUpperCase() === normalizedName.toLocaleUpperCase()) {
            headers[normalizedName] = headers[name]
            delete headers[name]
        }
    })
}

// 处理header
export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type')
    // 对纯对象{}类型数据 默认加上 header:content-type
    // console.log(data)
    // console.log(isPlainObject(data))
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers
}

export function parseHeaders(headers: string): any {
    let parsed = Object.create(null)
    if (!headers) {
        return parsed
    }

    headers.split('\r\n').forEach((line) => {
        let [key, val] = line.split(':')
        key = key.trim().toLowerCase()
        if (!key) {
            return
        }
        if (val) {
            val = val.trim()
        }
        parsed[key] = val
    })
    return parsed
}