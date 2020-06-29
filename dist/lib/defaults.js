"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var header_1 = require("./helpers/header");
var data_1 = require("./helpers/data");
var defaults = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json,text/plain,*/*'
        }
    },
    transformRequest: [
        function (data, headers) {
            header_1.processHeaders(headers, data);
            return data_1.transformRequest(data);
        }
    ],
    transformResponse: [
        function (data) {
            return data_1.transformResponse(data);
        }
    ],
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
};
var methodsNoData = ['delete', 'get', 'head', 'options'];
methodsNoData.forEach(function (method) {
    defaults.headers[method] = {};
});
var methodsWithData = ['post', 'put', 'patch'];
methodsWithData.forEach(function (method) {
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
});
// console.log(defaults)
exports.default = defaults;
//# sourceMappingURL=defaults.js.map