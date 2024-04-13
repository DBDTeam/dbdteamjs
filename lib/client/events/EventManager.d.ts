import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { Event } from "./Event";
export declare class EventManager {
    client: Client;
    events: Collection<string, Event<unknown>>;
    constructor(client: Client);
    _handle(event: string, d: any, shard: any): void;
    _r(e: string): void;
}
