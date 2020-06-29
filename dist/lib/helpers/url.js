"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function encode(val) {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}
// 对get请求处理 url
function buildURL(url, params) {
    if (!params) {
        return url;
    }
    else {
        var parts_1 = [];
        Object.keys(params).forEach(function (key) {
            var val = params[key];
            if (val === null || typeof val === 'undefined') {
                // return 继续进行下次循环
                return;
            }
            var values = [];
            if (Array.isArray(val)) {
                values = val;
                key += '[]';
            }
            else {
                values = [val];
            }
            values.forEach(function (val) {
                if (utils_1.isDate(val)) {
                    val = val.toISOString();
                }
                else if (utils_1.isPlainObject(val)) {
                    val = JSON.stringify(val);
                }
                parts_1.push(encode(key) + "=" + encode(val));
            });
        });
        var serializedParams = parts_1.join('&');
        if (serializedParams) {
            // 忽略哈希
            var markIndex = url.indexOf('#');
            if (markIndex !== -1) {
                url = url.slice(0, markIndex);
            }
            // 拼接
            url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
        }
        return url;
    }
}
exports.buildURL = buildURL;
// 是否是同源的url
function isURLSameOrigin(requestURL) {
    var parsedOrigin = resolveURL(requestURL);
    return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host);
}
exports.isURLSameOrigin = isURLSameOrigin;
var urlParsingNode = document.createElement('a');
var currentOrigin = resolveURL(window.location.href);
// 创建a标签然后赋值 url 然后 获取 protocol 与 host
function resolveURL(url) {
    urlParsingNode.setAttribute('href', url);
    var protocol = urlParsingNode.protocol, host = urlParsingNode.host;
    return {
        protocol: protocol,
        host: host
    };
}
//# sourceMappingURL=url.js.map