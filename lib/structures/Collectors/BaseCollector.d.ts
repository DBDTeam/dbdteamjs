import { type Client } from "../../client";
import { EventNames } from "../../common";
import { Collection } from "../../utils/Collection";
import { TypedEmitter } from "../../utils/typed-emitter";
export interface CollectorOptions {
    time?: number;
    limit?: number;
}
export declare enum CollectorDefaultCodes {
    TIME_EXPIRED = 1001,
    LIMIT_REACHED = 1000
}
interface BaseCollectorEvents<T> {
    end: (code: number) => void;
    collect: (data: T) => void;
    [event: string]: (...args: any[]) => void;
}
export declare class BaseCollector<T> extends TypedEmitter<BaseCollectorEvents<T>> {
    protected filter: (data: T) => boolean;
    items: Collection<string, T>;
    protected options: CollectorOptions;
    private stopped;
    readonly client: Client;
    private timeoutId?;
    private eventName;
    listener: (data: T) => void;
    constructor(client: Client, filter: (data: T) => boolean, options: CollectorOptions | undefined, eventName: EventNames);
    private initializeTimeout;
    get count(): number;
    stop(code: number | CollectorDefaultCodes): void;
    private cleanup;
}
export {};
