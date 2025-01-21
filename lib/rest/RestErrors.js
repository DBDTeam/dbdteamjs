"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordAPIError = exports.HTTPError = exports.RateLimitError = void 0;
class DiscordAPIError extends Error {
    status;
    data;
    error;
    constructor(message, status, data) {
        super(message);
        this.name = "DiscordAPIError";
        this.status = status;
        this.data = data;
        this.error = true;
        Error.captureStackTrace(this, this.constructor);
    }
    toString() {
        return `${this.name}: ${this.message}\nStatus: ${this.status}\nData: ${JSON.stringify(this.data, null, 2)}`;
    }
}
exports.DiscordAPIError = DiscordAPIError;
class HTTPError extends Error {
    status;
    statusMessage;
    error;
    constructor(message, status, statusMessage) {
        super(message);
        this.name = "HTTPError";
        this.status = status;
        this.statusMessage = statusMessage;
        this.error = true;
        Error.captureStackTrace(this, this.constructor);
    }
    toString() {
        return `${this.name}: ${this.message}\nStatus: ${this.status}\nStatusMessage: ${this.statusMessage}`;
    }
}
exports.HTTPError = HTTPError;
class RateLimitError extends Error {
    retryAfter;
    global;
    error;
    constructor(message, retryAfter, global) {
        super(message);
        this.name = "RateLimitError";
        this.retryAfter = retryAfter;
        this.global = global;
        this.error = true;
        Error.captureStackTrace(this, this.constructor);
    }
    toString() {
        return `${this.name}: ${this.message}\nRetryAfter: ${this.retryAfter}ms\nGlobal: ${this.global}`;
    }
}
exports.RateLimitError = RateLimitError;
