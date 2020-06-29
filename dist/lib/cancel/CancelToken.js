"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cancel_1 = require("./Cancel");
var CancelToken = /** @class */ (function () {
    function CancelToken(executor) {
        var _this = this;
        var resolvePromise;
        // 在pengding状态的promise
        this.promise = new Promise(function (resolve) {
            resolvePromise = resolve;
        });
        // 
        // console.log(this.promise)
        executor(function (message) {
            // 防止多次调用
            if (_this.reason) {
                return;
            }
            // 通过 new Cancel 判断是否是 cancel 类型错误
            _this.reason = new Cancel_1.default(message);
            // console.log(this.reason)
            resolvePromise(_this.reason);
        });
    }
    CancelToken.prototype.throwIfRequested = function () {
        // console.log(this.reason)
        if (this.reason) {
            throw this.reason;
        }
    };
    CancelToken.source = function () {
        var cancel;
        var token = new CancelToken(function (c) {
            // c 是 executor 中执行函数
            cancel = c;
        });
        console.log(token);
        return {
            cancel: cancel,
            token: token
        };
    };
    return CancelToken;
}());
exports.default = CancelToken;
//# sourceMappingURL=CancelToken.js.map