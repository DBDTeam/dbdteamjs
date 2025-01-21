"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTResponse = exports.RequestHandler = void 0;
const https_1 = __importDefault(require("https"));
const Endpoints = __importStar(require("./Endpoints"));
const Collection_1 = require("../utils/Collection");
const Bucket_1 = require("./Bucket");
const RestErrors_1 = require("./RestErrors");
const ImageResolver_1 = require("../utils/ImageResolver");
class RequestHandler {
    client; // Reference to the parent Client instance.
    options; // Configuration options for requests.
    ping; // Time taken for the last request in ms.
    buckets; // Stores rate limit buckets.
    /**
     * Initializes a new instance of RequestHandler.
     * @param client - The client using this handler.
     */
    constructor(client) {
        this.client = client;
        this.options = {
            baseURL: Endpoints.BASE_URL, // Base URL for the API.
        };
        this.ping = 0; // Initial ping value.
        this.buckets = new Collection_1.Collection(); // Initialize rate limit buckets.
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
    async request(method, url, auth = true, body, reason, files, addHeaders) {
        const routeKey = this.getRouteKey(url); // Generate a unique route key.
        const bucket = this.getBucket(routeKey); // Get or create a rate limit bucket.
        return new Promise((resolve, reject) => {
            bucket.addRequest(async () => {
                const finalURL = this.buildFinalURL(url); // Construct the final URL.
                const headers = this.buildHeaders(method, auth, files, reason, addHeaders);
                try {
                    const response = await this.makeResponse(finalURL, { method, headers }, method, body, files);
                    resolve(response);
                }
                catch (error) {
                    if (error instanceof RestErrors_1.RateLimitError) {
                        this.client.emit("debug", "Rate limit encountered. Retrying after the specified delay.");
                        resolve(await this.request(method, url, auth, body, reason, files));
                    }
                    else {
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
    getRouteKey(url) {
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
    getBucket(routeKey) {
        let bucket = this.buckets.get(routeKey);
        if (!bucket) {
            bucket = new Bucket_1.Bucket(10); // Default limit of 10 requests.
            this.buckets.set(routeKey, bucket);
        }
        return bucket;
    }
    /**
     * Constructs the final API URL including the base URL.
     * @param url - The API endpoint URL.
     * @returns The complete API URL.
     */
    buildFinalURL(url) {
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
    buildHeaders(method, auth, files, reason, heads) {
        const headers = {
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
    async makeResponse(finalURL, options, method, body, files) {
        const startTime = Date.now(); // Track request start time.
        return new Promise(async (resolve, reject) => {
            const req = https_1.default.request(finalURL, options, (res) => {
                let responseData = "";
                res.on("data", (chunk) => (responseData += chunk)); // Collect response data.
                res.on("end", async () => {
                    const parsedData = responseData.includes("{")
                        ? JSON.parse(responseData)
                        : responseData;
                    try {
                        await this._handle(res, parsedData, reject); // Handle response errors.
                        this.ping = Date.now() - startTime; // Calculate request ping.
                        resolve(new RESTResponse({
                            status: res.statusCode,
                            data: parsedData,
                            error: false,
                        }));
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            });
            req.on("error", (error) => reject(new RestErrors_1.HTTPError(error.message, 500, "Internal Server Error")));
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
    async _setHeaders(method, headers, auth, files, reason, heads) {
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
    async _writeBody(req, body, files) {
        if ((files || []).length <= 0 && body) {
            req.write(JSON.stringify(body));
        }
        else if (files && files.length > 0) {
            // Handle multipart form-data when files are present.
            if (body) {
                req.write(`--boundary\r\n`);
                req.write(`Content-Disposition: form-data; name="payload_json"\r\n`);
                req.write(`Content-Type: application/json\r\n\r\n`);
                req.write(JSON.stringify(body));
                req.write("\r\n");
            }
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const resolvedImage = await (0, ImageResolver_1.resolveImage)(file.url);
                const imageBuffer = typeof resolvedImage === "string"
                    ? resolvedImage
                    : resolvedImage?.buffer;
                req.write(`--boundary\r\n`);
                req.write(`Content-Disposition: form-data; name="files[${index}]"; filename="${file.name}"\r\n\r\n`);
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
    async _handle(res, parsedData, reject) {
        res.statusCode = res.statusCode;
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
    async handleRateLimit(parsedData) {
        const retry_after = parsedData.retry_after * 1000;
        this.client.emit("debug", `Rate limit encountered: waiting for ${retry_after / 1000} seconds (global: ${parsedData.global})`);
        const rateLimitError = new RestErrors_1.RateLimitError("You are being rate limited.", retry_after, parsedData.global || false);
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
    handleDiscordError(res, parsedData, reject) {
        const discordError = new RestErrors_1.DiscordAPIError(parsedData?.message || "Discord API error.", res.statusCode, parsedData);
        reject(discordError);
    }
    /**
     * Handles general HTTP errors.
     * @param res - The HTTP response object.
     * @param reject - The rejection callback to propagate the error.
     */
    handleHttpError(res, reject) {
        const httpError = new RestErrors_1.HTTPError(res.statusMessage || "HTTP error.", res.statusCode, res.statusMessage);
        reject(httpError);
    }
    /**
     * Pauses execution for the specified duration.
     *
     * @param ms - The duration to sleep in milliseconds.
     * @returns A promise that resolves after the delay.
     */
    _sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
exports.RequestHandler = RequestHandler;
class RESTResponse {
    status;
    data;
    error;
    constructor(data) {
        this.status = data.status;
        this.data = data.data;
        this.error = data.error;
    }
    isError() {
        return this.error;
    }
    // Ahora este método asegura que 'data' no es null y TypeScript puede inferirlo.
    hasData() {
        return this.data !== null && !this.error;
    }
}
exports.RESTResponse = RESTResponse;
