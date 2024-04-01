import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection.js";
declare class ActionManager {
    private client;
    actions: Collection;
    constructor(client: Client);
    _handle(action: string, d: Record<string, any>, shard: number): void;
    _r(e: any): void;
}
export { ActionManager };
