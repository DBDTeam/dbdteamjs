import { type Client } from "./Client";
import { PresenceStatus, ActivityPayload } from "../types/Presences";
interface PresencePayload {
    activities: Array<ActivityPayload>;
    status: PresenceStatus;
    afk: boolean;
    since: number;
}
/**
  * Represents the client presence (WS presence)
  */
declare class ClientPresence {
    private client;
    status: string;
    activities: Array<ActivityPayload>;
    since: number;
    mobilePlatform: boolean;
    constructor(client: Client);
    /**
     *
     * @param obj - The object that will be used for update the presence of the client
     * @param shardId - The shardID
     * @returns {Promise<boolean>}
     * @async
     */
    update(obj: PresencePayload, shardId?: number): Promise<boolean | null>;
}
export { ClientPresence };
