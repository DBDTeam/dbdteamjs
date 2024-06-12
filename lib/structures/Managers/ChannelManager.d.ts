import { APIChannelPatchOverwrite, APIGuildForumDefaultReactionEmoji, APIGuildForumTag, ChannelType, ForumLayoutType, SortOrderType, VideoQualityMode } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { type Channel } from "../BaseChannel";
import { type VoiceChannel } from "../VoiceChannel";
import { type TextChannel } from "../TextChannel";
import { type ThreadChannel } from "../ThreadChannel";
import { type CategoryChannel } from "../CategoryChannel";
import { Nullable } from "../../common";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
export interface ChannnelCreatePayload {
    name: string;
    type: ChannelType;
    topic?: string;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    position?: number;
    permission_overwrites?: APIChannelPatchOverwrite[];
    parent_id?: string;
    nsfw?: boolean;
    rtc_region?: string;
    video_quality_mode?: VideoQualityMode;
    default_auto_archive_duration?: number;
    default_reaction_emoji?: APIGuildForumDefaultReactionEmoji;
    available_tags?: APIGuildForumTag;
    default_sort_order?: SortOrderType;
    default_forum_layout?: ForumLayoutType;
    default_thread_rate_limit_per_user?: number;
    reason?: string;
}
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
     * @returns {Promise<Nullable<Channel | ErrorResponseFromApi>>} - The created channel or null if an error occurs.
     */
    create(channelObj: ChannnelCreatePayload): Promise<Nullable<Channel | ErrorResponseFromApi>>;
    /**
     * Deletes a channel from the guild.
     * @param {string} channelId - The ID of the channel to delete.
     * @param {string} [reason] - The reason for deleting the channel.
     * @returns {Promise<Nullable<Channel | ErrorResponseFromApi>>} - The deleted channel or null if an error occurs.
     */
    delete(channelId: string, reason?: string): Promise<Nullable<Channel | ErrorResponseFromApi>>;
}
declare class ChannelManager {
    #private;
    cache: Collection<string, Channel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>;
    /**
     * Constructs a new ChannelManager instance.
     * @param {Client} client - The client instance to interact with the Discord API.
     */
    constructor(client: Client);
    /**
     * Fetches a specific channel by its ID.
     * @param {string} id - The ID of the channel to fetch.
     * @returns {Promise<Channel | null>} - The fetched channel or null if an error occurs.
     */
    fetch(id: string): Promise<import("../../interfaces/rest/requestHandler").ResponseFromApi | Channel | null>;
}
export { GuildChannelManager, ChannelManager };
