import { type Client } from "../client/Client";
import { ErrorResponseFromApi, Methods, ResponseFromApi } from "../interfaces/rest/requestHandler";
import { Nullable } from "../common";
export declare class RequestHandler {
    private lastRequestTime;
    private requestInterval;
    private requestCount;
    client: Client;
    options: Record<string, any>;
    ping: number;
    constructor(client: Client);
    request(method: Methods | "PUT" | "POST" | "GET" | "DELETE" | "PATCH", url: string, auth?: boolean, body?: Record<string, any>, reason?: string | null | undefined, files?: Nullable<Array<Record<string, any>>>, force?: boolean): Promise<null | ResponseFromApi | ErrorResponseFromApi>;
    makeResponse(finalURL: string, options: Record<string, any>, method: Methods | "PUT" | "POST" | "GET" | "DELETE" | "PATCH", headers: Record<string, any>, body?: Record<string, any>, files?: Nullable<Array<Record<string, any>>>, force?: boolean): Promise<null | ResponseFromApi | ErrorResponseFromApi>;
    waitIfNeeded(): Promise<void>;
    _sleep(ms: number): Promise<unknown>;
}
