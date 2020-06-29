"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterceptorManager = /** @class */ (function () {
    function InterceptorManager() {
        this.interceptors = [];
    }
    // 添加拦截器
    InterceptorManager.prototype.use = function (resolved, rejected) {
        this.interceptors.push({
            resolved: resolved,
            rejected: rejected
        });
        return this.interceptors.length - 1;
    };
    // 遍历拦截器
    InterceptorManager.prototype.forEach = function (fn) {
        this.interceptors.forEach(function (interceptor) {
            if (interceptor !== null) {
                fn(interceptor);
            }
        });
    };
    // 根据id删除拦截器
    InterceptorManager.prototype.eject = function (id) {
        if (this.interceptors[id]) {
            // 不能直接删除数组，而是把值置为null
            this.interceptors[id] = null;
        }
    };
    return InterceptorManager;
}());
exports.default = InterceptorManager;
//# sourceMappingURL=InterceptorManager.js.map