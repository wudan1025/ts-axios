export declare type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'OPTIONS' | 'options' | 'put' | 'PUT' | 'PATCH' | 'patch' | 'post' | 'POST';
export interface AxiosBasicCredentials {
    username: string;
    password: string;
}
export interface AxiosRequestConfig {
    url?: string;
    method?: Method;
    data?: any;
    params?: any;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];
    [propName: string]: any;
    cancelToken?: CancelToken;
    withCredentials?: boolean;
    onDownloadProgress?: (e: ProgressEvent) => void;
    onUploadProgress?: (e: ProgressEvent) => void;
    auth?: AxiosBasicCredentials;
}
export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request: any;
}
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}
export interface AxiosError extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse;
    isAxiosError: boolean;
}
export interface Axios {
    defaults: AxiosRequestConfig;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
}
export interface AxiosInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
    <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}
export interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance;
}
export interface AxiosInterceptorManager<T> {
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number;
    eject(id: number): void;
}
export interface ResolvedFn<T> {
    (val: T): T | Promise<T>;
}
export interface RejectedFn {
    (error: any): any;
}
export interface AxiosTransformer {
    (data: any, headers?: any): any;
}
export interface CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    throwIfRequested(): void;
}
export interface Canceler {
    (message?: string): void;
}
export interface CancelExecutor {
    (cancel: Canceler): void;
}
export interface CancelTokenSource {
    token: CancelToken;
    cancel: Canceler;
}
export interface CancelTokenStatic {
    new (executor: CancelExecutor): CancelToken;
    source(): CancelTokenSource;
}
export interface Cancel {
    message?: string;
}
export interface CancelStatic {
    new (message?: string): Cancel;
}
export interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance;
    CancelToken: CancelTokenStatic;
    Cancel: CancelStatic;
    isCancel: (value: any) => boolean;
}
