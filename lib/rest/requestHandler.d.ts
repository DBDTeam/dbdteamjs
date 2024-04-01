import { type Client } from "../client/Client";
declare enum Methods {
    get = "GET",
    post = "POST",
    delete = "DELETE",
    patch = "PATCH",
    put = "PUT"
}
export interface ResponseFromApi {
    data?: Record<any, any>;
    status: number;
    error: boolean;
}
export interface ErrorResponseFromApi extends ResponseFromApi {
    d?: Record<string, any>;
    shard: number | string | undefined | null;
    type: string;
    time: number;
}
export declare class RequestHandler {
    private lastRequestTime;
    private requestInterval;
    private requestCount;
    client: Client;
    options: Record<string, any>;
    ping: number;
    /**
     *
     * @param client
     */
    constructor(client: Client);
    request(method: EnumAsUnion<Methods>, url: string, auth: boolean, body?: Record<string, any>, reason?: string | null | undefined, files?: Array<Record<string, any>>): Promise<null | ResponseFromApi | ErrorResponseFromApi>;
    makeResponse(finalURL: string, options: Record<string, any>, method: EnumAsUnion<Methods>, headers: Record<string, any>, body?: Record<string, any>, files?: Array<Record<string, any>>): Promise<null | ResponseFromApi | ErrorResponseFromApi>;
    waitIfNeeded(): Promise<void>;
    _sleep(ms: number): Promise<unknown>;
}
export {};
