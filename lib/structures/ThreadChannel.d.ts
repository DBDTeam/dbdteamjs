import { type Client } from "../client/Client";
import { ErrorResponseFromApi } from "../interfaces/rest/requestHandler";
import { Channel } from "./BaseChannel";
import { CategoryChannel } from "./CategoryChannel";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import { ThreadMemberManager } from "./Managers/ThreadMemberManager";
import { Member } from "./Member";
import { TextBasedChannel } from "./TextBasedChannel";
import { TextChannel } from "./TextChannel";
import { VoiceChannel } from "./VoiceChannel";
/**
 * @typedef {import('./TextChannel').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel').VoiceChannel} VoiceChannel
 * @typedef {import('./ForumChannel')} ForumChannel
 * @typedef {import('./Guild').Guild} Guild
 * @typedef {import('../client/Client').Client} Client
 */
/** @extends {Channel} */
declare class ThreadChannel extends TextBasedChannel {
    readonly client: Client;
    message_count: number;
    locked: boolean;
    created: any;
    auto_archive_duration: number;
    archived: boolean;
    archive_stamp: any;
    channel_id: string;
    channel?: TextChannel | Channel;
    owner_id: string;
    owner?: Member;
    members: ThreadMemberManager;
    messages: ChannelMessageManager<ThreadChannel>;
    /**
     * Represents a ThreadChannel
     * @param {Object} data - The ThreadChannel payload
     * @param {Client} client - The Client
     */
    constructor(data: any, client: Client);
    /**
     * Edits the ThreadChannel
     * @param {object} obj - The new ThreadChannel Object
     * @returns {Promise<ThreadChannel>}
     * @async
     */
    edit(obj: any): Promise<Channel | VoiceChannel | TextChannel | CategoryChannel | ThreadChannel | null | ErrorResponseFromApi>;
    leave(): Promise<true | import("../interfaces/rest/requestHandler").ResponseFromApi>;
    archivedThreads(config: any): Promise<void>;
}
export { ThreadChannel };
