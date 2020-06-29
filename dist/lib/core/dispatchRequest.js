"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("../helpers/url");
var header_1 = require("../helpers/header");
var xhr_1 = require("./xhr");
var transform_1 = require("./transform");
function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    processConfig(config);
    return xhr_1.default(config).then(function (res) {
        // console.log(res)
        return transformResponseData(res);
    });
}
// 如果调用时候传递了cancelToken则直接抛出异常
function throwIfCancellationRequested(config) {
    // console.log(config.cancelToken)
    if (config.cancelToken) {
        // console.log('config.cancelToken.throwIfRequested()')
        config.cancelToken.throwIfRequested();
    }
}
// 对参数进行处理
function processConfig(config) {
    config.url = transformURL(config);
    // 先处理header再处理data
    config.headers = transformHeaders(config);
    // 处理data发送数据
    config.data = transform_1.default(config.data, config.headers, config.transformRequest);
    // 对header进行 flat 处理
    config.headers = header_1.flattenHeaders(config.headers, config.method);
}
// 对url进行处理
function transformURL(config) {
    var url = config.url, params = config.params;
    // 加 ！表示类型断言，这个变量不会为空
    return url_1.buildURL(url, params);
}
// 处理 header
function transformHeaders(config) {
    var _a = config.headers, headers = _a === void 0 ? {} : _a, data = config.data;
    return header_1.processHeaders(headers, data);
}
// 修改返回值，将json改为字符串
function transformResponseData(res) {
    res.data = transform_1.default(res.data, res.headers, res.config.transformResponse);
    return res;
}
exports.default = dispatchRequest;
//# sourceMappingURL=dispatchRequest.js.map