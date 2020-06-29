"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transform(data, headers, fns) {
    if (!fns) {
        return data;
    }
    if (!Array.isArray(fns)) {
        fns = [fns];
    }
    fns.forEach(function (fn) {
        // console.log(fn)
        // 每一次返回值当做下一次data调用
        // console.log(fn(data, headers))
        data = fn(data, headers);
    });
    // console.log(data)
    return data;
}
exports.default = transform;
//# sourceMappingURL=transform.js.map