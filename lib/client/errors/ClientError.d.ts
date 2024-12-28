import { ErrorEnum } from "./ErrorList";
declare class ClientError extends Error {
    code: keyof typeof ErrorEnum;
    constructor(code: keyof typeof ErrorEnum, ...args: unknown[]);
    static formatMessage(code: keyof typeof ErrorEnum, args: unknown[]): string;
    get name(): string;
}
declare class ClientTypeError extends ClientError {
    get name(): string;
}
declare class ClientRangeError extends ClientError {
    get name(): string;
}
export { ClientError, ClientTypeError, ClientRangeError };
