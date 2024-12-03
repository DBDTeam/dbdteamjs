import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
import { Collection } from "../../utils/Collection";
import { type Channel } from "../BaseChannel";
import { type CategoryChannel } from "../CategoryChannel";
import { ForumChannel } from "../ForumChannel";
import { TextBasedChannel } from "../TextBasedChannel";
import { type TextChannel } from "../TextChannel";
import { type ThreadChannel } from "../ThreadChannel";
import { type VoiceChannel } from "../VoiceChannel";
import { ChannnelCreatePayload } from "./ChannelManager";
declare class GuildChannelManager {
    #private;
    private guildId;
    cache: Collection<string, Channel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>;
    /**
     * Constructs a new GuildChannelManager instance.
     * @param {string} guildId - The ID of the guild to manage channels for.
     * @param {Client} client - The client instance to interact with the Discord API.
     */
    constructor(guildId: string, client: Client);
    /**
     * Fetches all channels for the guild and populates the cache.
     * @private
     * @returns {Promise<Collection<string, Channel>> | null} - A collection of channels or null if an error occurs.
     */
    _fetchAllChannels(): Promise<Nullable<Collection<string, any>>>;
    /**
     * Fetches a specific channel by its ID.
     * @param {string} id - The ID of the channel to fetch.
     * @returns {Promise<Channel | null>} - The fetched channel or null if not found.
     */
    fetch(id: string): Promise<Nullable<Channel | Collection<string, any>>>;
    /**
     * Creates a new channel in the guild.
     * @param {ChannnelCreatePayload} channelObj - The channel creation payload.
     * @returns {Promise<Nullable<Channel | VoiceChannel | ThreadChannel | CategoryChannel | ForumChannel | TextBasedChannel | TextChannel | ErrorResponseFromApi>>} - The created channel or null if an error occurs.
     */
    create(channelObj: ChannnelCreatePayload): Promise<Nullable<Channel | VoiceChannel | ThreadChannel | CategoryChannel | ForumChannel | TextBasedChannel | TextChannel | ErrorResponseFromApi>>;
    /**
     * Deletes a channel from the guild.
     * @param {string} channelId - The ID of the channel to delete.
     * @param {string} [reason] - The reason for deleting the channel.
     * @returns {Promise<Nullable<Channel | ErrorResponseFromApi>>} - The deleted channel or null if an error occurs.
     */
    delete(channelId: string, reason?: string): Promise<Nullable<Channel | ErrorResponseFromApi>>;
}
export { GuildChannelManager };
