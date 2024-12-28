import { ErrorEnum } from "./ErrorList";
type ErrorMessageFunction = (...args: any[]) => string;
export declare const ErrorMessages: Record<keyof typeof ErrorEnum, string | ErrorMessageFunction>;
export {};
