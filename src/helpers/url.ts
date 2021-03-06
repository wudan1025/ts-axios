import { isDate, isObject, isPlainObject } from './utils'
function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}

// 对get请求处理 url
export function buildURL(url: string, params?: any): string {
    if (!params) {
        return url
    } else {
        const parts: string[] = []
        Object.keys(params).forEach((key) => {
            const val = params[key]
            if (val === null || typeof val === 'undefined') {
                // return 继续进行下次循环
                return
            }
            let values = []
            if (Array.isArray(val)) {
                values = val
                key += '[]'
            } else {
                values = [val]
            }
            values.forEach((val) => {
                if (isDate(val)) {
                    val = val.toISOString()
                } else if (isPlainObject(val)) {
                    val = JSON.stringify(val)
                }
                parts.push(`${encode(key)}=${encode(val)}`)
            })
        })

        let serializedParams = parts.join('&')
        if (serializedParams) {
            // 忽略哈希
            const markIndex = url.indexOf('#')
            if (markIndex !== -1) {
                url = url.slice(0, markIndex)
            }
            // 拼接
            url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
        }
        return url
    }
}

interface URLOrigin {
    protocol: string
    host: string
}

// 是否是同源的url
export function isURLSameOrigin(requestURL: string): boolean {
    const parsedOrigin = resolveURL(requestURL)
    return (
        parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
    )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

// 创建a标签然后赋值 url 然后 获取 protocol 与 host
function resolveURL(url: string): URLOrigin {
    urlParsingNode.setAttribute('href', url)
    const { protocol, host } = urlParsingNode
    return {
        protocol,
        host
    }
}