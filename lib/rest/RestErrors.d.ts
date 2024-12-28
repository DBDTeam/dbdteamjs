declare class DiscordAPIError extends Error {
    status: number;
    data: any;
    constructor(message: string, status: number, data: any);
    toString(): string;
}
declare class HTTPError extends Error {
    status: number;
    statusMessage: string;
    constructor(message: string, status: number, statusMessage: string);
    toString(): string;
}
declare class RateLimitError extends Error {
    retryAfter: number;
    global: boolean;
    constructor(message: string, retryAfter: number, global: boolean);
    toString(): string;
}
export { RateLimitError, HTTPError, DiscordAPIError };
