import { Client } from "../client/Client";
import { Nullable } from "../interfaces/other";
import { type Guild } from "./Guild";
import { Member } from "./Member";
import { ThreadChannel } from "./ThreadChannel";
declare class ThreadMember {
    private client;
    id: string;
    guild: Nullable<Guild>;
    flags: number;
    member: Member;
    threadId: string;
    thread: ThreadChannel | undefined | null;
    joined: any;
    readonly remove: Function;
    /**
     * Represents a Thread Member
     * @param {object} data - The Thread Member payload
     * @param {Guild} guild - The Guild where the user is
     * @param {Client} client - The Client
     */
    constructor(data: Record<string, any>, guild: Nullable<Guild>, client: Client);
    /**
     * Kick the ThreadMember from the ThreadChannel. Returns true when success, and a object when error.
     * @async
     * @returns {Promise<Object | boolean>}
     */
    kick(): Promise<true | import("../interfaces/rest/requestHandler").ResponseFromApi>;
}
export { ThreadMember };
