import { type Client } from "../../client/Client";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
import { Collection } from "../../utils/Collection";
import { type Channel } from "../BaseChannel";
import { type CategoryChannel } from "../CategoryChannel";
import { ForumChannel } from "../ForumChannel";
import { TextBasedChannel } from "../TextBasedChannel";
import { type TextChannel } from "../TextChannel";
import { type ThreadChannel } from "../ThreadChannel";
import { type VoiceChannel } from "../VoiceChannel";
declare class GuildChannelManager {
    #private;
    readonly guildId: string;
    cache: Collection<string, Channel | TextChannel | VoiceChannel | ThreadChannel | CategoryChannel>;
    constructor(guildId: string, client: Client);
    _fetchAllChannels(): Promise<Collection<string, CategoryChannel | TextBasedChannel | ForumChannel> | ErrorResponseFromApi>;
    /**
     * Fetches a channel in the current guild (if param id is defined, otherwise, fetches the first 100 channels of the guild.)
     * @param {string|undefined|null} id - The Channel Id that will be fetched in the current guild.
     * @returns {Promise<Collection<string, CategoryChannel | TextBasedChannel | ForumChannel> | ErrorResponseFromApi | undefined | CategoryChannel | TextBasedChannel | ForumChannel> | ErrorResponseFromApi>}
     */
    fetch(id: string | undefined | null): Promise<Collection<string, CategoryChannel | TextBasedChannel | ForumChannel> | ErrorResponseFromApi | CategoryChannel | TextBasedChannel | ForumChannel | Channel>;
}
export { GuildChannelManager };
