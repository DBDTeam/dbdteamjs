import https from "https";
import { type Client } from "../client/Client";
import { Methods } from "../common/interfaces/rest/requestHandler";
import * as Endpoints from "./Endpoints";
import { Collection } from "../utils/Collection";
import { Bucket } from "./Bucket";
import { DiscordAPIError, HTTPError, RateLimitError } from "./RestErrors";
import { ClientRequest, IncomingMessage } from "http";
import { Nullable } from "../common";
import { resolveImage } from "../utils/ImageResolver";

export class RequestHandler {
    public client: Client; // Reference to the parent Client instance.
    public options: Record<string, any>; // Configuration options for requests.
    protected ping: number; // Time taken for the last request in ms.
    private buckets: Collection<string, Bucket>; // Stores rate limit buckets.

    /**
     * Initializes a new instance of RequestHandler.
     * @param client - The client using this handler.
     */
    constructor(client: Client) {
        this.client = client;
        this.options = {
            baseURL: Endpoints.BASE_URL, // Base URL for the API.
        };
        this.ping = 0; // Initial ping value.
        this.buckets = new Collection(); // Initialize rate limit buckets.
    }

    public async request<T = RESTResponse>(
        method: Methods | "PUT" | "POST" | "GET" | "DELETE" | "PATCH",
        endpoint: string,
        auth: boolean = true,
        data?: Record<string, any>,
        reason?: Nullable<string>,
        files?: Nullable<Array<Record<string, any>>>,
        headers?: Nullable<Record<any, any>>
    ): Promise<(T | Record<string, any>) & { error: boolean }> {
        try {
            const response = await this.fetchFromAPI(
                method,
                endpoint,
                auth,
                data,
                reason,
                files,
                headers
            );

            if (!response || response.error) return response as RESTResponse;

            return response.data as (T | Record<string, any>) & {
                error: boolean;
            };
        } catch (error) {
            return error as RESTResponse;
        }
    }

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
    private async fetchFromAPI(
        method: Methods | "PUT" | "POST" | "GET" | "DELETE" | "PATCH",
        url: string,
        auth: boolean = true,
        body?: Record<string, any>,
        reason?: Nullable<string>,
        files?: Nullable<Array<Record<string, any>>>,
        addHeaders?: Nullable<Record<any, any>>
    ): Promise<null | RESTResponse> {
        const routeKey = this.getRouteKey(url); // Generate a unique route key.
        const bucket = this.getBucket(routeKey); // Get or create a rate limit bucket.

        return new Promise((resolve, reject) => {
            bucket.addRequest(async () => {
                const finalURL = this.buildFinalURL(url); // Construct the final URL.
                const headers = this.buildHeaders(
                    method as Methods,
                    auth,
                    files,
                    reason,
                    addHeaders
                );

                try {
                    const response = await this.makeResponse(
                        finalURL,
                        { method, headers },
                        method,
                        body,
                        files
                    );
                    resolve(response);
                } catch (error) {
                    if (error instanceof RateLimitError) {
                        this.client.emit(
                            "debug",
                            "Rate limit encountered. Retrying after the specified delay."
                        );
                        resolve(
                            await this.fetchFromAPI(
                                method,
                                url,
                                auth,
                                body,
                                reason,
                                files
                            )
                        );
                    } else {
                        reject(error);
                    }
                }
            });
        });
    }

    /**
     * Generates a consistent key for rate-limiting based on the URL.
     * @param url - The API endpoint URL.
     * @returns A normalized route key.
     */
    private getRouteKey(url: string): string {
        const [baseUrl] = url.split("?"); // Ignorar parámetros de consulta.
    
        return baseUrl
            .replace(/\/\d+/g, "/:id") // Normalizar IDs numéricos.
            .replace(/\/[a-zA-Z0-9_-]{200,}/g, "/:token") // Normalizar segmentos de 200 o más caracteres.
            .replace(/\/$/, ""); // Eliminar slashes finales.
    }
    

    /**
     * Retrieves or initializes a rate limit bucket for a specific route key.
     * @param routeKey - The route key for the API endpoint.
     * @returns The corresponding Bucket instance.
     */
    private getBucket(routeKey: string): Bucket {
        let bucket = this.buckets.get(routeKey);
        if (!bucket) {
            bucket = new Bucket(10); // Default limit of 10 requests.
            this.buckets.set(routeKey, bucket);
        }
        return bucket;
    }

    /**
     * Constructs the final API URL including the base URL.
     * @param url - The API endpoint URL.
     * @returns The complete API URL.
     */
    private buildFinalURL(url: string): string {
        return `https://discord.com${this.options.baseURL}${url}`;
    }

    /**
     * Builds the headers for an API request.
     * @param method - HTTP method being used.
     * @param auth - Whether the request needs authentication.
     * @param files - Files to include, if any.
     * @param reason - Reason for the request, if provided.
     * @returns A record containing request headers.
     */
    private buildHeaders(
        method: Methods,
        auth: boolean,
        files: Nullable<Array<Record<string, any>>>,
        reason: Nullable<string>,
        heads: Nullable<any>
    ): Record<string, any> {
        const headers: Record<string, any> = {
            "User-Agent": "DiscordBot (https://discord.com)",
        };
        this._setHeaders(method, headers, auth, files, reason, heads);
        return headers;
    }

    /**
     * Handles the API response, including errors and rate limits.
     * @param finalURL - The API URL.
     * @param options - Request options.
     * @param method - HTTP method used.
     * @param body - Optional request body.
     * @param files - Optional files to upload.
     * @returns Parsed response data or throws an error.
     */
    private async makeResponse(
        finalURL: string,
        options: Record<string, any>,
        method: Methods | "PUT" | "POST" | "GET" | "DELETE" | "PATCH",
        body?: Record<string, any>,
        files?: Nullable<Array<Record<string, any>>>
    ): Promise<null | RESTResponse> {
        const startTime = Date.now(); // Track request start time.

        return new Promise(async (resolve, reject) => {
            const req = https.request(
                finalURL,
                options,
                (res: IncomingMessage) => {
                    let responseData = "";

                    res.on("data", (chunk) => (responseData += chunk)); // Collect response data.

                    res.on("end", async () => {
                        const parsedData = responseData.includes("{")
                            ? JSON.parse(responseData)
                            : responseData;

                        try {
                            await this._handle(res, parsedData, reject); // Handle response errors.
                            this.ping = Date.now() - startTime; // Calculate request ping.
                            resolve(
                                new RESTResponse({
                                    status: res.statusCode as number,
                                    data: parsedData,
                                    error: false,
                                })
                            );
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
            );

            req.on("error", (error) =>
                reject(
                    new HTTPError(error.message, 500, "Internal Server Error")
                )
            );

            if (["PATCH", "POST", "PUT"].includes(method)) {
                await this._writeBody(req, body, files);
            }

            req.end();
        });
    }

    /**
     * Configures the headers for an API request.
     *
     * @param method - The HTTP method being used (e.g., GET, POST, DELETE).
     * @param headers - A mutable object to populate with headers.
     * @param auth - Whether the request requires authentication.
     * @param files - Optional list of files to include in the request.
     * @param reason - An optional audit log reason for the request.
     */
    private async _setHeaders(
        method: Methods,
        headers: Record<string, any>,
        auth: boolean,
        files: Nullable<Array<Record<string, any>>>,
        reason: Nullable<string>,
        heads: Nullable<any>
    ) {
        Object.assign(headers, {
            ...(method !== "DELETE" && {
                "Content-Type": files
                    ? "multipart/form-data; boundary=boundary"
                    : "application/json",
            }),
            ...(auth && { Authorization: "Bot " + this.client.token }),
            ...(reason && { "X-Audit-Log-Reason": reason }),
            ...heads,
        });
    }

    /**
     * Writes the body data or files to the HTTP request.
     *
     * @param req - The HTTP client request object.
     * @param body - Optional payload data to include in the request.
     * @param files - Optional files to attach as part of a multipart form-data request.
     */
    private async _writeBody(
        req: ClientRequest,
        body: Nullable<Record<string, any>>,
        files: Nullable<Array<Record<string, any>>>
    ) {
        if ((files || []).length <= 0 && body) {
            req.write(JSON.stringify(body));
        } else if (files && files.length > 0) {
            // Handle multipart form-data when files are present.
            if (body) {
                req.write(`--boundary\r\n`);
                req.write(
                    `Content-Disposition: form-data; name="payload_json"\r\n`
                );
                req.write(`Content-Type: application/json\r\n\r\n`);
                req.write(JSON.stringify(body));
                req.write("\r\n");
            }

            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const resolvedImage = await resolveImage(file.url);
                const imageBuffer =
                    typeof resolvedImage === "string"
                        ? resolvedImage
                        : resolvedImage?.buffer;

                req.write(`--boundary\r\n`);
                req.write(
                    `Content-Disposition: form-data; name="files[${index}]"; filename="${file.name}"\r\n\r\n`
                );
                req.write(imageBuffer);
                req.write("\r\n");
            }

            req.write(`--boundary--\r\n`);
        }
    }

    /**
     * Processes the response from the API and determines the appropriate action.
     *
     * @param res - The HTTP response object.
     * @param parsedData - The parsed response data.
     * @param reject - The rejection callback to handle errors.
     */
    private async _handle(
        res: IncomingMessage,
        parsedData: Record<any, any>,
        reject: any
    ) {
        res.statusCode = res.statusCode as number;

        if (res.statusCode === 429) {
            // Handle rate-limited responses.
            return this.handleRateLimit(parsedData);
        }

        if (res.statusCode >= 400 && res.statusCode < 500) {
            // Handle Discord API-specific errors.
            return this.handleDiscordError(res, parsedData, reject);
        }

        if (res.statusCode < 200 || res.statusCode >= 300) {
            // Handle generic HTTP errors.
            return this.handleHttpError(res, reject);
        }
    }

    /**
     * Handles a rate-limited response, delaying the next request as required.
     *
     * @param parsedData - The response data containing rate limit details.
     * @throws RateLimitError - Thrown after the required delay.
     */
    private async handleRateLimit(parsedData: any) {
        const retry_after = parsedData.retry_after * 1000;
        this.client.emit(
            "debug",
            `Rate limit encountered: waiting for ${
                retry_after / 1000
            } seconds (global: ${parsedData.global})`
        );

        const rateLimitError = new RateLimitError(
            "You are being rate limited.",
            retry_after,
            parsedData.global || false
        );

        this.client.emit("error", rateLimitError);

        // Wait for the specified retry delay before proceeding.
        await this._sleep(retry_after);
        throw rateLimitError;
    }

    /**
     * Handles errors specific to the Discord API.
     *
     * @param res - The HTTP response object.
     * @param parsedData - The response data containing error details.
     * @param reject - The rejection callback to propagate the error.
     */
    private handleDiscordError(
        res: IncomingMessage,
        parsedData: any,
        reject: any
    ) {
        const discordError = new DiscordAPIError(
            parsedData?.message || "Discord API error.",
            res.statusCode as number,
            parsedData
        );

        reject(discordError);
    }

    /**
     * Handles general HTTP errors.
     * @param res - The HTTP response object.
     * @param reject - The rejection callback to propagate the error.
     */
    private handleHttpError(res: IncomingMessage, reject: any) {
        const httpError = new HTTPError(
            res.statusMessage || "HTTP error.",
            res.statusCode as number,
            res.statusMessage as string
        );

        reject(httpError);
    }

    /**
     * Pauses execution for the specified duration.
     *
     * @param ms - The duration to sleep in milliseconds.
     * @returns A promise that resolves after the delay.
     */
    private _sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

export class RESTResponse {
    status: number;
    data: any;
    error: boolean;
    constructor(data: any) {
        this.status = data.statusCode;
        this.data = data.data;
        this.error = data.error;
    }
}
