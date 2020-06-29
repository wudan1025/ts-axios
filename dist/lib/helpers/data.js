"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
// 对请求数据做处理
function transformRequest(data) {
    // console.log(data)
    // console.log(isPlainObject(data))
    if (utils_1.isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}
exports.transformRequest = transformRequest;
function transformResponse(data) {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        }
        catch (e) {
            // do nothing
        }
    }
    return data;
}
exports.transformResponse = transformResponse;
//# sourceMappingURL=data.js.map