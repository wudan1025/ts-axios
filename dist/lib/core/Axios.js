"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dispatchRequest_1 = require("./dispatchRequest");
var InterceptorManager_1 = require("./InterceptorManager");
var mergeConfig_1 = require("./mergeConfig");
var Axios = /** @class */ (function () {
    function Axios(initConfig) {
        // 初始化拦截器
        this.interceptors = {
            request: new InterceptorManager_1.default(),
            response: new InterceptorManager_1.default()
        };
        // 初始化配置
        this.defaults = initConfig;
        // console.log(this.defaults)
    }
    Axios.prototype.request = function (url, config) {
        // 实现函数重载
        if (typeof url === 'string') {
            if (!config) {
                config = {};
            }
            config.url = url;
        }
        else {
            config = url;
        }
        // 合并参数
        config = mergeConfig_1.default(this.defaults, config);
        var chain = [
            {
                resolved: dispatchRequest_1.default,
                rejected: undefined
            }
        ];
        // 请求拦截器
        // 后添加的先执行
        this.interceptors.request.forEach(function (interceptor) {
            chain.unshift(interceptor);
        });
        // 响应拦截器
        // 先添加的先执行
        this.interceptors.response.forEach(function (interceptor) {
            chain.push(interceptor);
        });
        // chain 顺序是 请求拦截器 + xhr请求 + 响应拦截器
        // 依次链式调用promise
        // 使用promise链式调用
        var promise = Promise.resolve(config);
        while (chain.length) {
            // 类型断言chain.shift()不为空
            var _a = chain.shift(), resolved = _a.resolved, rejected = _a.rejected;
            // console.log(resolved)
            promise = promise.then(resolved, rejected);
        }
        return promise;
    };
    Axios.prototype.get = function (url, config) {
        return this._requestMethodWithoutData('get', url, config);
    };
    Axios.prototype.delete = function (url, config) {
        return this._requestMethodWithoutData('delete', url, config);
    };
    Axios.prototype.options = function (url, config) {
        return this._requestMethodWithoutData('options', url, config);
    };
    Axios.prototype.post = function (url, data, config) {
        return this._requestMethodWithData('post', url, data, config);
    };
    Axios.prototype.put = function (url, data, config) {
        return this._requestMethodWithData('put', url, data, config);
    };
    Axios.prototype.patch = function (url, data, config) {
        return this._requestMethodWithData('patch', url, data, config);
    };
    Axios.prototype._requestMethodWithoutData = function (method, url, config) {
        return this.request(Object.assign(config || {}, {
            method: method,
            url: url
        }));
    };
    Axios.prototype._requestMethodWithData = function (method, url, data, config) {
        return this.request(Object.assign(config || {}, {
            method: method,
            url: url,
            data: data
        }));
    };
    return Axios;
}());
exports.default = Axios;
//# sourceMappingURL=Axios.js.map