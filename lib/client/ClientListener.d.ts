import { ClientEvents } from "../common";
import { Collection } from "../utils/Collection";
type EventNames = keyof ClientEvents;
export declare class Listener<K extends EventNames> {
    code: ClientEvents[K];
    once: boolean;
    constructor(code: ClientEvents[K], once?: boolean);
}
export declare class ListenerManager {
    listeners: Collection<EventNames, Array<Listener<EventNames>>>;
    constructor();
    addListener<K extends EventNames>(eventName: K, listener: Listener<K>): void;
    on<K extends EventNames>(eventName: K, listener: ClientEvents[K]): void;
    once<K extends EventNames>(eventName: K, listener: ClientEvents[K]): void;
    emit<K extends EventNames>(eventName: K, ...args: Parameters<ClientEvents[K]>): void;
    removeListener<K extends EventNames>(eventName: K, listener: Listener<K>): void;
    removeAllListeners<K extends EventNames>(eventName: K): this;
    listenerCount<K extends EventNames>(eventName: K): number;
}
export {};
