"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
// 替换 header 大小写
function normalizeHeaderName(headers, normalizedName) {
    if (!headers) {
        return;
    }
    Object.keys(headers).forEach(function (name) {
        if (name !== normalizedName &&
            name.toLocaleUpperCase() === normalizedName.toLocaleUpperCase()) {
            headers[normalizedName] = headers[name];
            delete headers[name];
        }
    });
}
// 处理header
function processHeaders(headers, data) {
    normalizeHeaderName(headers, 'Content-Type');
    // 对纯对象{}类型数据 默认加上 header:content-type
    if (utils_1.isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}
exports.processHeaders = processHeaders;
function parseHeaders(headers) {
    var parsed = Object.create(null);
    if (!headers) {
        return parsed;
    }
    headers.split('\r\n').forEach(function (line) {
        var _a = line.split(':'), key = _a[0], val = _a[1];
        key = key.trim().toLowerCase();
        if (!key) {
            return;
        }
        if (val) {
            val = val.trim();
        }
        parsed[key] = val;
    });
    return parsed;
}
exports.parseHeaders = parseHeaders;
// 处理不同请求情况下header值
function flattenHeaders(headers, method) {
    if (!headers) {
        return headers;
    }
    headers = utils_1.deepMerge(headers.common || {}, headers[method] || {}, headers);
    var methodsToDelete = [
        'delete',
        'get',
        'head',
        'options',
        'post',
        'put',
        'patch',
        'common'
    ];
    methodsToDelete.forEach(function (method) {
        delete headers[method];
    });
    return headers;
}
exports.flattenHeaders = flattenHeaders;
//# sourceMappingURL=header.js.map