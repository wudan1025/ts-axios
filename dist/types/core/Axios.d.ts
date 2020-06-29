import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse } from '../types';
import InterceptorManager from './InterceptorManager';
interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse>;
}
export default class Axios {
    defaults: AxiosRequestConfig;
    interceptors: Interceptors;
    constructor(initConfig: AxiosRequestConfig);
    request(url: any, config?: any): AxiosPromise;
    get(url: string, config?: AxiosRequestConfig): AxiosPromise;
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
    options(url: string, config?: AxiosRequestConfig): AxiosPromise;
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise<any>;
    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<any>;
}
export {};
