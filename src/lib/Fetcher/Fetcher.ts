import { Configuration, ObjectApiResponseModel } from '../../sdk';
import axios, { AxiosError, AxiosInstance } from 'axios';

interface FetcherOptions {
    accessTokenScheme?: string;
    accessToken?: string;
    refreshToken?: string;
}

export class Fetcher {
    constructor(options?: FetcherOptions) {
        const fetcherOptions = options ?? {
            accessTokenScheme: 'Bearer',
        };

        this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        this.axiosInstance = this.getAxiosInstance();

        // token refresh
        this.axiosInstance.interceptors.request.use(
            (config) => {
                if (fetcherOptions.accessToken) {
                    config.headers = {
                        ...(config.headers ?? {}),
                        Authorization: `${fetcherOptions.accessTokenScheme} ${fetcherOptions.accessToken}`,
                    };
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

        this.configuration = new Configuration({});
    }
    public readonly axiosInstance: AxiosInstance;
    public readonly configuration: Configuration;
    public readonly baseUrl: string;

    private getAxiosInstance(): AxiosInstance {
        const instance = axios.create();
        return instance;
    }
}
