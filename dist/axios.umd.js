(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.axios = factory());
}(this, (function () { 'use strict';

  var toString = Object.prototype.toString;
  function isDate(val) {
      return toString.call(val) === '[object Date]';
  }
  // 判断是否是普通对象{}
  function isPlainObject(val) {
      return toString.call(val) === '[object Object]';
  }
  // as 断言 ？
  // 把 from 里的属性都扩展到 to 中，包括原型上的属性。
  function extend(to, from) {
      for (var key in from) {
          to[key] = from[key];
      }
      return to;
  }
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
  // 判断 FormData
  function isFormData(val) {
      return typeof val !== 'undefined' && val instanceof FormData;
  }

  function encode(val) {
      return encodeURIComponent(val)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
          .replace(/%20/g, '+')
          .replace(/%5B/gi, '[')
          .replace(/%5D/gi, ']');
  }
  // 对get请求处理 url
  function buildURL(url, params) {
      if (!params) {
          return url;
      }
      else {
          var parts_1 = [];
          Object.keys(params).forEach(function (key) {
              var val = params[key];
              if (val === null || typeof val === 'undefined') {
                  // return 继续进行下次循环
                  return;
              }
              var values = [];
              if (Array.isArray(val)) {
                  values = val;
                  key += '[]';
              }
              else {
                  values = [val];
              }
              values.forEach(function (val) {
                  if (isDate(val)) {
                      val = val.toISOString();
                  }
                  else if (isPlainObject(val)) {
                      val = JSON.stringify(val);
                  }
                  parts_1.push(encode(key) + "=" + encode(val));
              });
          });
          var serializedParams = parts_1.join('&');
          if (serializedParams) {
              // 忽略哈希
              var markIndex = url.indexOf('#');
              if (markIndex !== -1) {
                  url = url.slice(0, markIndex);
              }
              // 拼接
              url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
          }
          return url;
      }
  }
  // 是否是同源的url
  function isURLSameOrigin(requestURL) {
      var parsedOrigin = resolveURL(requestURL);
      return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host);
  }
  var urlParsingNode = document.createElement('a');
  var currentOrigin = resolveURL(window.location.href);
  // 创建a标签然后赋值 url 然后 获取 protocol 与 host
  function resolveURL(url) {
      urlParsingNode.setAttribute('href', url);
      var protocol = urlParsingNode.protocol, host = urlParsingNode.host;
      return {
          protocol: protocol,
          host: host
      };
  }

  // 替换 header 大小写
  function normalizeHeaderName(headers, normalizedName) {
      if (!headers) {
          return;
      }
      Object.keys(headers).forEach(function (name) {
          if (name !== normalizedName &&
              name.toLocaleUpperCase() === normalizedName.toLocaleUpperCase()) {
              headers[normalizedName] = headers[name];
              delete headers[name];
          }
      });
  }
  // 处理header
  function processHeaders(headers, data) {
      normalizeHeaderName(headers, 'Content-Type');
      // 对纯对象{}类型数据 默认加上 header:content-type
      if (isPlainObject(data)) {
          if (headers && !headers['Content-Type']) {
              headers['Content-Type'] = 'application/json;charset=utf-8';
          }
      }
      return headers;
  }
  function parseHeaders(headers) {
      var parsed = Object.create(null);
      if (!headers) {
          return parsed;
      }
      headers.split('\r\n').forEach(function (line) {
          var _a = line.split(':'), key = _a[0], val = _a[1];
          key = key.trim().toLowerCase();
          if (!key) {
              return;
          }
          if (val) {
              val = val.trim();
          }
          parsed[key] = val;
      });
      return parsed;
  }
  // 处理不同请求情况下header值
  function flattenHeaders(headers, method) {
      if (!headers) {
          return headers;
      }
      headers = deepMerge(headers.common || {}, headers[method] || {}, headers);
      var methodsToDelete = [
          'delete',
          'get',
          'head',
          'options',
          'post',
          'put',
          'patch',
          'common'
      ];
      methodsToDelete.forEach(function (method) {
          delete headers[method];
      });
      return headers;
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var AxiosError = /** @class */ (function (_super) {
      __extends(AxiosError, _super);
      function AxiosError(message, config, code, request, response) {
          var _this = _super.call(this, message) || this;
          _this.config = config;
          _this.code = code;
          _this.request = request;
          _this.response = response;
          _this.isAxiosError = true;
          // ts 解决坑
          Object.setPrototypeOf(_this, AxiosError.prototype);
          return _this;
      }
      return AxiosError;
  }(Error));
  function createError(message, config, code, request, response) {
      var error = new AxiosError(message, config, code, request, response);
      return error;
  }

  var cookie = {
      read: function (name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return match ? decodeURIComponent(match[3]) : null;
      }
  };

  function xhr(config) {
      return new Promise(function (resolve, reject) {
          var _a = config.data, data = _a === void 0 ? null : _a, url = config.url, _b = config.method, method = _b === void 0 ? 'get' : _b, headers = config.headers, responseType = config.responseType, timeout = config.timeout, cancelToken = config.cancelToken, withCredentials = config.withCredentials, xsrfCookieName = config.xsrfCookieName, xsrfHeaderName = config.xsrfHeaderName, onDownloadProgress = config.onDownloadProgress, onUploadProgress = config.onUploadProgress, auth = config.auth;
          var request = new XMLHttpRequest();
          request.open(method.toUpperCase(), url, true);
          configureRequest();
          addEvents();
          processHeaders$$1();
          processCancel();
          request.send(data);
          function configureRequest() {
              if (responseType) {
                  request.responseType = responseType;
              }
              if (timeout) {
                  request.timeout = timeout;
              }
              if (withCredentials) {
                  request.withCredentials = withCredentials;
              }
          }
          function addEvents() {
              request.onreadystatechange = function handleLoad() {
                  if (request.readyState !== 4) {
                      return;
                  }
                  if (request.status === 0) {
                      return;
                  }
                  var responseHeaders = parseHeaders(request.getAllResponseHeaders());
                  var responseData = responseType && responseType !== 'text' ? request.response : request.responseText;
                  var response = {
                      data: responseData,
                      status: request.status,
                      statusText: request.statusText,
                      headers: responseHeaders,
                      config: config,
                      request: request
                  };
                  handleResponse(response);
              };
              request.onerror = function handleError() {
                  reject(createError('Network Error', config, null, request));
              };
              request.ontimeout = function handleTimeout() {
                  reject(createError("Timeout of " + config.timeout + " ms exceeded", config, 'ECONNABORTED', request));
              };
              if (onDownloadProgress) {
                  request.onprogress = onDownloadProgress;
              }
              if (onUploadProgress) {
                  request.upload.onprogress = onUploadProgress;
              }
          }
          function processHeaders$$1() {
              if (isFormData(data)) {
                  delete headers['Content-Type'];
              }
              if ((withCredentials || isURLSameOrigin(url)) && xsrfCookieName) {
                  var xsrfValue = cookie.read(xsrfCookieName);
                  if (xsrfValue) {
                      headers[xsrfHeaderName] = xsrfValue;
                  }
              }
              if (auth) {
                  headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password);
              }
              Object.keys(headers).forEach(function (name) {
                  if (data === null && name.toLowerCase() === 'content-type') {
                      delete headers[name];
                  }
                  else {
                      request.setRequestHeader(name, headers[name]);
                  }
              });
          }
          function processCancel() {
              if (cancelToken) {
                  cancelToken.promise.then(function (reason) {
                      request.abort();
                      reject(reason);
                  }).catch();
              }
          }
          function handleResponse(response) {
              if (response.status >= 200 && response.status < 300) {
                  resolve(response);
              }
              else {
                  reject(createError("Request failed with status code " + response.status, config, null, request, response));
              }
          }
      });
  }

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

  function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      processConfig(config);
      return xhr(config).then(function (res) {
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
      config.data = transform(config.data, config.headers, config.transformRequest);
      // 对header进行 flat 处理
      config.headers = flattenHeaders(config.headers, config.method);
  }
  // 对url进行处理
  function transformURL(config) {
      var url = config.url, params = config.params;
      // 加 ！表示类型断言，这个变量不会为空
      return buildURL(url, params);
  }
  // 处理 header
  function transformHeaders(config) {
      var _a = config.headers, headers = _a === void 0 ? {} : _a, data = config.data;
      return processHeaders(headers, data);
  }
  // 修改返回值，将json改为字符串
  function transformResponseData(res) {
      res.data = transform(res.data, res.headers, res.config.transformResponse);
      return res;
  }

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
      if (isPlainObject(val2)) {
          return deepMerge(val1, val2);
      }
      else if (typeof val2 !== 'undefined') {
          return val2;
      }
      else if (isPlainObject(val1)) {
          // val2 为空会走到这个分支
          return deepMerge(val1);
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

  var Axios = /** @class */ (function () {
      function Axios(initConfig) {
          // 初始化拦截器
          this.interceptors = {
              request: new InterceptorManager(),
              response: new InterceptorManager()
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
          config = mergeConfig(this.defaults, config);
          var chain = [
              {
                  resolved: dispatchRequest,
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

  // 对请求数据做处理
  function transformRequest(data) {
      // console.log(data)
      // console.log(isPlainObject(data))
      if (isPlainObject(data)) {
          return JSON.stringify(data);
      }
      return data;
  }
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
              processHeaders(headers, data);
              return transformRequest(data);
          }
      ],
      transformResponse: [
          function (data) {
              return transformResponse(data);
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

  var Cancel = /** @class */ (function () {
      function Cancel(message) {
          this.message = message;
      }
      return Cancel;
  }());
  function isCancel(value) {
      // console.log(value)
      return value instanceof Cancel;
  }

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
              _this.reason = new Cancel(message);
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

  function createInstance(config) {
      var context = new Axios(config);
      // 用 Axios.request 可行吗
      var instance = Axios.prototype.request.bind(context);
      // 拷贝属性，将 context 属性 拷贝到 instance 上
      extend(instance, context);
      return instance;
  }
  var axios = createInstance(defaults);
  // 创建新的 axios 实例
  axios.create = function create(config) {
      // 合并配置
      return createInstance(mergeConfig(defaults, config));
  };
  // 取消
  axios.CancelToken = CancelToken;
  axios.Cancel = Cancel;
  axios.isCancel = isCancel;

  return axios;

})));
//# sourceMappingURL=axios.umd.js.map
