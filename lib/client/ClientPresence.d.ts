import { ClientPresencePayload, Nullable } from "../common";
import { GatewayActivityPayload } from "../types/Presences";
import { type Client } from "./Client";
/**
 * Represents the client presence (WS presence)
 */
declare class ClientPresence {
    private client;
    status: string;
    activities: GatewayActivityPayload[];
    since: Nullable<number>;
    mobilePlatform: Nullable<boolean>;
    constructor(client: Client);
    /**
     *
     * @param obj - The object that will be used for update the presence of the client
     * @param shardId - The shardID
     * @returns {Promise<boolean>}
     * @async
     */
    update(obj: ClientPresencePayload, shardId?: number): Promise<boolean | null>;
}
export { ClientPresence };
