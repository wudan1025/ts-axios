"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString = Object.prototype.toString;
function isDate(val) {
    return toString.call(val) === '[object Date]';
}
exports.isDate = isDate;
function isObject(val) {
    return val !== null && typeof val === 'object';
}
exports.isObject = isObject;
// 判断是否是普通对象{}
function isPlainObject(val) {
    return toString.call(val) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
// as 断言 ？
// 把 from 里的属性都扩展到 to 中，包括原型上的属性。
function extend(to, from) {
    for (var key in from) {
        ;
        to[key] = from[key];
    }
    return to;
}
exports.extend = extend;
// 深拷贝
function deepMerge() {
    var objs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objs[_i] = arguments[_i];
    }
    var result = Object.create(null);
    objs.forEach(function (obj) {
        if (obj) {
            Object.keys(obj).forEach(function (key) {
                var val = obj[key];
                if (isPlainObject(val)) {
                    // 当前key是否已经存在
                    if (isPlainObject(result[key])) {
                        // 存在则需要合并
                        result[key] = deepMerge(result[key], val);
                    }
                    else {
                        result[key] = deepMerge(val);
                    }
                }
                else {
                    result[key] = val;
                }
            });
        }
    });
    return result;
}
exports.deepMerge = deepMerge;
// 判断 FormData
function isFormData(val) {
    return typeof val !== 'undefined' && val instanceof FormData;
}
exports.isFormData = isFormData;
//# sourceMappingURL=utils.js.map