import { Collection } from "./Collection";
export type ListenerSignature<L> = {
    [Event in keyof L]: (...args: any[]) => void;
};
export type DefaultListener = {
    [event: string]: (...args: any[]) => void;
};
export declare class TypedEmitter<L extends ListenerSignature<L> = DefaultListener> {
    protected listeners: Collection<keyof L, Function[]>;
    on<Event extends keyof L>(event: Event, listener: L[Event]): this;
    once<Event extends keyof L>(event: Event, listener: L[Event]): this;
    off<Event extends keyof L>(event: Event, listener: L[Event]): this;
    removeAllListeners(event?: keyof L): this;
    emit<Event extends keyof L>(event: Event, ...args: Parameters<L[Event]>): boolean;
    listenerCount(event: keyof L): number;
    eventNames(): (keyof L)[];
}
