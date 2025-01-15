import { type Client } from "../client/Client";
import { Methods } from "../common/interfaces/rest/requestHandler";
import { Nullable } from "../common";
export declare class RequestHandler {
    client: Client;
    options: Record<string, any>;
    protected ping: number;
    private buckets;
    /**
     * Initializes a new instance of RequestHandler.
     * @param client - The client using this handler.
     */
    constructor(client: Client);
    request<T = RESTResponse>(method: Methods | "PUT" | "POST" | "GET" | "DELETE" | "PATCH", endpoint: string, auth?: boolean, data?: Record<string, any>, reason?: Nullable<string>, files?: Nullable<Array<Record<string, any>>>, headers?: Nullable<Record<any, any>>): Promise<(T | Record<string, any>) & {
        error: boolean;
    }>;
    /**
     * Makes an API request while handling rate limits and errors.
     * @param method - HTTP method to use (e.g., GET, POST).
     * @param url - API endpoint URL.
     * @param auth - Whether the request requires authorization.
     * @param body - Payload data for the request.
     * @param reason - Optional reason for audit logs.
     * @param files - Optional files to include in the request.
     * @returns A promise resolving to the API response or rejecting on error.
     */
    private fetchFromAPI;
    /**
     * Generates a consistent key for rate-limiting based on the URL.
     * @param url - The API endpoint URL.
     * @returns A normalized route key.
     */
    private getRouteKey;
    /**
     * Retrieves or initializes a rate limit bucket for a specific route key.
     * @param routeKey - The route key for the API endpoint.
     * @returns The corresponding Bucket instance.
     */
    private getBucket;
    /**
     * Constructs the final API URL including the base URL.
     * @param url - The API endpoint URL.
     * @returns The complete API URL.
     */
    private buildFinalURL;
    /**
     * Builds the headers for an API request.
     * @param method - HTTP method being used.
     * @param auth - Whether the request needs authentication.
     * @param files - Files to include, if any.
     * @param reason - Reason for the request, if provided.
     * @returns A record containing request headers.
     */
    private buildHeaders;
    /**
     * Handles the API response, including errors and rate limits.
     * @param finalURL - The API URL.
     * @param options - Request options.
     * @param method - HTTP method used.
     * @param body - Optional request body.
     * @param files - Optional files to upload.
     * @returns Parsed response data or throws an error.
     */
    private makeResponse;
    /**
     * Configures the headers for an API request.
     *
     * @param method - The HTTP method being used (e.g., GET, POST, DELETE).
     * @param headers - A mutable object to populate with headers.
     * @param auth - Whether the request requires authentication.
     * @param files - Optional list of files to include in the request.
     * @param reason - An optional audit log reason for the request.
     */
    private _setHeaders;
    /**
     * Writes the body data or files to the HTTP request.
     *
     * @param req - The HTTP client request object.
     * @param body - Optional payload data to include in the request.
     * @param files - Optional files to attach as part of a multipart form-data request.
     */
    private _writeBody;
    /**
     * Processes the response from the API and determines the appropriate action.
     *
     * @param res - The HTTP response object.
     * @param parsedData - The parsed response data.
     * @param reject - The rejection callback to handle errors.
     */
    private _handle;
    /**
     * Handles a rate-limited response, delaying the next request as required.
     *
     * @param parsedData - The response data containing rate limit details.
     * @throws RateLimitError - Thrown after the required delay.
     */
    private handleRateLimit;
    /**
     * Handles errors specific to the Discord API.
     *
     * @param res - The HTTP response object.
     * @param parsedData - The response data containing error details.
     * @param reject - The rejection callback to propagate the error.
     */
    private handleDiscordError;
    /**
     * Handles general HTTP errors.
     * @param res - The HTTP response object.
     * @param reject - The rejection callback to propagate the error.
     */
    private handleHttpError;
    /**
     * Pauses execution for the specified duration.
     *
     * @param ms - The duration to sleep in milliseconds.
     * @returns A promise that resolves after the delay.
     */
    private _sleep;
}
export declare class RESTResponse {
    status: number;
    data: any;
    error: boolean;
    constructor(data: any);
}
