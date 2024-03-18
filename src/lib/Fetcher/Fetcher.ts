import { Configuration, ObjectApiResponseModel } from '../../sdk';
import axios, { AxiosError, AxiosInstance } from 'axios';
import type { AxiosRequestConfig } from 'axios';

type FetcherOptions = {
    accessTokenScheme?: string;
    accessToken?: string;
    refreshToken?: string;
    axiosConfig?: AxiosRequestConfig<any>;
};

export class Fetcher {
    constructor(options?: FetcherOptions) {
        const fetcherOptions: FetcherOptions = options ?? {
            accessTokenScheme: 'Bearer',
        };

        this.baseUrl = process.env.API_BASE_URL ?? '';
        this.axiosInstance = this.getAxiosInstance(options?.axiosConfig);

        // token refresh
        this.axiosInstance.interceptors.request.use(
            (config) => {
                if (fetcherOptions.accessToken) {
                    config.headers.Authorization = `${fetcherOptions.accessTokenScheme} ${fetcherOptions.accessToken}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        this.axiosInstance.interceptors.response.use(
            (res) => res,
            (err) => {
                if (axios.isAxiosError(err)) {
                    const axiosErr = err as AxiosError<ObjectApiResponseModel>;

                    throw axiosErr.response;
                }
                throw err;
            },
        );

        this.configuration = new Configuration({
            basePath: this.baseUrl,
        });
    }
    public readonly axiosInstance: AxiosInstance;
    public readonly configuration: Configuration;
    public readonly baseUrl: string;

    private getAxiosInstance(
        config?: AxiosRequestConfig<any> | undefined,
    ): AxiosInstance {
        const instance = axios.create(config);
        return instance;
    }
}
