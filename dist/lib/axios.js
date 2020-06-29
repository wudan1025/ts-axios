"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Axios_1 = require("./core/Axios");
var utils_1 = require("./helpers/utils");
var defaults_1 = require("./defaults");
var mergeConfig_1 = require("./core/mergeConfig");
var CancelToken_1 = require("./cancel/CancelToken");
var Cancel_1 = require("./cancel/Cancel");
function createInstance(config) {
    var context = new Axios_1.default(config);
    // 用 Axios.request 可行吗
    var instance = Axios_1.default.prototype.request.bind(context);
    // 拷贝属性，将 context 属性 拷贝到 instance 上
    utils_1.extend(instance, context);
    return instance;
}
var axios = createInstance(defaults_1.default);
// 创建新的 axios 实例
axios.create = function create(config) {
    // 合并配置
    return createInstance(mergeConfig_1.default(defaults_1.default, config));
};
// 取消
axios.CancelToken = CancelToken_1.default;
axios.Cancel = Cancel_1.default;
axios.isCancel = Cancel_1.isCancel;
exports.default = axios;
//# sourceMappingURL=axios.js.map