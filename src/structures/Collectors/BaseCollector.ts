import { type Client } from "../../client";
import { EventNames } from "../../common";
import { Collection } from "../../utils/Collection";
import { TypedEmitter } from "../../utils/typed-emitter";

export interface CollectorOptions {
    time?: number;
    limit?: number;
}

export enum CollectorDefaultCodes {
    TIME_EXPIRED = 1001,
    LIMIT_REACHED = 1000,
}

interface BaseCollectorEvents<T> {
    end: (code: number) => void;
    collect: (data: T) => void;
    [event: string]: (...args: any[]) => void;
}

export class BaseCollector<T> extends TypedEmitter<BaseCollectorEvents<T>> {
    protected filter: (data: T) => boolean;
    public items: Collection<string, T>;
    protected options: CollectorOptions;
    private stopped: boolean;
    protected client: Client;
    private timeoutId?: NodeJS.Timeout;
    private eventName: EventNames;
    public listener!: (data: T) => void;

    constructor(
        client: Client,
        filter: (data: T) => boolean,
        options: CollectorOptions = {},
        eventName: EventNames
    ) {
        super();
        this.filter = filter;
        this.options = options;
        this.items = new Collection<string, T>();
        this.stopped = false;
        this.client = client;
        this.eventName = eventName;

        this.initializeTimeout();
    }

    private initializeTimeout() {
        if (this.options.time) {
            this.timeoutId = setTimeout(() => {
                this.stop(CollectorDefaultCodes.TIME_EXPIRED);
            }, this.options.time);
        }
    }

    public get count() {
        return this.items.size;
    }

    public stop(code: number | CollectorDefaultCodes) {
        if (this.stopped) return;
        this.cleanup();
        this.stopped = true;
        this.emit("end", code);
    }

    private cleanup() {
        this.client.off(this.eventName, this.listener);
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    }
}
