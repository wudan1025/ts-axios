"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
// strats 合并策略函数
var strats = Object.create(null);
// 默认合并策略
function defaultStrat(val1, val2) {
    return typeof val2 !== 'undefined' ? val2 : val1;
}
// 只接受自定义配置合并策略
function fromVal2Strat(val1, val2) {
    if (typeof val2 !== 'undefined') {
        return val2;
    }
}
// 对 url params data 实现简单策略
var stratKeysFromVal2 = ['url', 'params', 'data'];
stratKeysFromVal2.forEach(function (key) {
    strats[key] = fromVal2Strat;
});
// 复杂对象合并策略
function deepMergeStrat(val1, val2) {
    if (utils_1.isPlainObject(val2)) {
        return utils_1.deepMerge(val1, val2);
    }
    else if (typeof val2 !== 'undefined') {
        return val2;
    }
    else if (utils_1.isPlainObject(val1)) {
        // val2 为空会走到这个分支
        return utils_1.deepMerge(val1);
    }
    else if (typeof val1 !== 'undefined') {
        return val1;
    }
}
// 对header实现复杂策略
var stratKeysDeepMerge = ['headers', 'auth'];
stratKeysDeepMerge.forEach(function (key) {
    strats[key] = deepMergeStrat;
});
// config1 默认配置
// config2 用户传入配置
function mergeConfig(config1, config2) {
    if (!config2) {
        config2 = {};
    }
    var config = Object.create(null);
    for (var key in config2) {
        mergeField(key);
    }
    for (var key in config1) {
        if (!config2[key]) {
            mergeField(key);
        }
    }
    function mergeField(key) {
        var strat = strats[key] || defaultStrat;
        config[key] = strat(config1[key], config2[key]);
    }
    return config;
}
exports.default = mergeConfig;
//# sourceMappingURL=mergeConfig.js.map