"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRangeError = exports.ClientTypeError = exports.ClientError = void 0;
const ErrorMessages_1 = require("./ErrorMessages");
class ClientError extends Error {
    code;
    constructor(code, ...args) {
        const message = ClientError.formatMessage(code, args);
        super(message);
        this.code = code;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, new.target); // Captura en la clase derivada
        }
    }
    static formatMessage(code, args) {
        const msg = ErrorMessages_1.ErrorMessages[code];
        if (!msg) {
            throw new Error(`No message associated with error code: ${code}`);
        }
        if (typeof msg === "function") {
            return msg(...args);
        }
        return msg;
    }
    get name() {
        return `ClientError [${this.code}]`;
    }
}
exports.ClientError = ClientError;
class ClientTypeError extends ClientError {
    get name() {
        return `ClientTypeError [${this.code}]`;
    }
}
exports.ClientTypeError = ClientTypeError;
class ClientRangeError extends ClientError {
    get name() {
        return `ClientRangeError [${this.code}]`;
    }
}
exports.ClientRangeError = ClientRangeError;
