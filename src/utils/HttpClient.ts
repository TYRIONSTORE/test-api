import { logger } from './logger';
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

export class HttpClient {
  protected instance: AxiosInstance;

  constructor({ baseURL, timeout, ...rest }: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL,
      ...(timeout && { timeout }),
      headers: { Accept: 'application/json' },
      ...rest
    });

    this.instance.interceptors.request.use(
      (config: any) => {
        logger.info(`Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
      },
      (error: any) => {
        logger.error('[Request Error] => ', error);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: any): any => {
        logger.info(`Response: ${response.config.method.toUpperCase()} ${response.config.baseURL}${response.config.url} ${response.status}`);
        return response;
      },
      (error: any): any => {
        if (error.response) {
          logger.error('[Response Error] => ', error);
        } else {
          logger.error('[Network Error] => ', error);
        }

        return Promise.reject(error);
      }
    );
  }

  get = <T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.instance.get<T>(path, config);
  };

  post = <T>(path: string, data?: { [key: string]: any } | string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.instance.post<T>(path, data, config);
  };

  put = <T>(path: string, data?: { [key: string]: any }, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.instance.put<T>(path, data, config);
  };

  patch = <T>(path: string, data?: { [key: string]: any }, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.instance.patch<T>(path, data, config);
  };

  delete = <T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.instance.delete<T>(path, config);
  };

  request = <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.instance.request<T>(config);
  };
}
