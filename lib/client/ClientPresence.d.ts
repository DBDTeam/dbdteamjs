import { GatewayActivityUpdateData, GatewayPresenceUpdateData } from "discord-api-types/v10";
import { Nullable } from "../interfaces/other";
import { type Client } from "./Client";
/**
 * Represents the client presence (WS presence)
 */
declare class ClientPresence {
    private client;
    status: string;
    activities: GatewayActivityUpdateData[];
    since: Nullable<number>;
    mobilePlatform: boolean;
    constructor(client: Client);
    /**
     *
     * @param obj - The object that will be used for update the presence of the client
     * @param shardId - The shardID
     * @returns {Promise<boolean>}
     * @async
     */
    update(obj: Omit<GatewayPresenceUpdateData, "afk">, shardId?: number): Promise<boolean | null>;
}
export { ClientPresence };
