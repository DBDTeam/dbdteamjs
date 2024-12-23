import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { Event } from "./Event";
export declare class EventManager {
    client: Client;
    events: Collection<string, Event<unknown>>;
    constructor(client: Client);
    runEvent(event: string, d: any, shard: any): Promise<void>;
    addEvent(e: string): void;
}
