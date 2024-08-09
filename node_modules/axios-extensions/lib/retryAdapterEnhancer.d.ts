/**
 * @author Kuitos
 * @since 2020-02-18
 */
import { AxiosAdapter } from 'axios';
declare module 'axios' {
    interface AxiosRequestConfig {
        retryTimes?: number;
    }
}
export declare type Options = {
    times?: number;
};
export default function retryAdapterEnhancer(adapter: AxiosAdapter, options?: Options): AxiosAdapter;
