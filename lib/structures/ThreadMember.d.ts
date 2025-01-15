import { Client } from "../client/Client";
import { type Guild } from "./Guild";
import { Member } from "./Member";
import { ThreadChannel } from "./ThreadChannel";
/**
 * @typedef {import('./TextChannel').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel').VoiceChannel} VoiceChannel
 * @typedef {import('./ThreadChannel').ThreadChannel} ThreadChannel
 * @typedef {import('./Guild').Guild} Guild
 * @typedef {import('../client/Client').Client} Client
 */
declare class ThreadMember {
    #private;
    id: string;
    guild: Guild;
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
    constructor(data: Record<string, any>, guild: Guild, client: Client);
    /**
     * Kick the ThreadMember from the ThreadChannel. Returns true when success, and a object when error.
     * @async
     * @returns {Promise<Object | boolean>}
     */
    kick(): Promise<true | ((Record<string, any> | import("../rest/requestHandler").RESTResponse) & {
        error: boolean;
    })>;
    static type: string;
}
export { ThreadMember };
