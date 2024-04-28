import { APIChannel, APIGuildCreatePartialChannel, APIOverwrite, ChannelType, Snowflake, VideoQualityMode } from "discord-api-types/v10";
import { type Client } from "../client/Client";
import { Nullable } from "../common";
import { ErrorResponseFromApi } from "../interfaces/rest/requestHandler";
import { Base } from "./Base";
import { type CategoryChannel } from "./CategoryChannel";
import { ChannelPermissionManager } from "./Managers/ChannelPermissionManager";
import { type TextChannel } from "./TextChannel";
import { type ThreadChannel } from "./ThreadChannel";
import { type VoiceChannel } from "./VoiceChannel";
/**
 * Represents a BaseChannel (for easier usage)
 * @param {object} data - The Channel payload
 * @param {Client} client - The Client
 *
 * @extends {Base}
 */
declare class Channel extends Base {
    readonly data: APIChannel;
    /**
     * The client associated with the channel.
     * @type {Client}
     */
    readonly client: Client;
    /**
     * The ID of the channel.
     * @type {Snowflake}
     */
    id: Snowflake;
    /**
     * The type of the channel.
     * @type {ChannelType}
     */
    type: ChannelType;
    /**
     * The name of the channel.
     * @type {Nullable<string>}
     */
    name: Nullable<string>;
    /**
     * The topic of the channel.
     * @type {Nullable<string>}
     */
    topic: Nullable<string>;
    /**
     * The bitrate of the channel.
     * @type {Nullable<number>}
     */
    bitrate: Nullable<number>;
    /**
     * The user limit of the channel.
     * @type {Nullable<number>}
     */
    user_limit: Nullable<number>;
    /**
     * The rate limit per user of the channel.
     * @type {Nullable<number>}
     */
    rate_limit_per_user: Nullable<number>;
    /**
     * The position of the channel.
     * @type {number}
     */
    position: number;
    /**
     * The permission overwrites of the channel.
     * @type {APIOverwrite[]}
     */
    permission_overwrites?: APIOverwrite[];
    /**
     * The parent ID of the channel.
     * @type {Nullable<Snowflake>}
     */
    parent_id: Nullable<Snowflake>;
    /**
     * Indicates whether the channel is NSFW.
     * @type {Nullable<boolean>}
     */
    nsfw?: Nullable<boolean>;
    /**
     * The RTC region of the channel.
     * @type {Nullable<string>}
     */
    rtc_region: Nullable<string>;
    /**
     * The video quality mode of the channel.
     * @type {Nullable<VideoQualityMode>}
     */
    video_quality_mode: Nullable<VideoQualityMode>;
    /**
     * The default auto archive duration of the channel.
     * @type {Nullable<number>}
     */
    default_auto_archive_duration: Nullable<number>;
    /**
     * The ID of the guild where the channel is located.
     * @type {Snowflake}
     */
    guildId?: Snowflake;
    /**
     * The flags of the channel.
     * @type {number}
     */
    flags?: number;
    /**
     * The permissions manager of the channel.
     * @type {ChannelPermissionManager}
     */
    permissions?: ChannelPermissionManager;
    /**
     * The default reaction emoji of the channel.
     * @type {any}
     */
    default_reaction_emoji: any;
    /**
     * The available tags of the channel.
     * @type {any}
     */
    available_tags: any;
    /**
     * The default sort order of the channel.
     * @type {any}
     */
    default_sort_order: any;
    /**
     * The default forum layout of the channel.
     * @type {any}
     */
    default_forum_layout: any;
    /**
     * The default thread rate limit per user of the channel.
     * @type {any}
     */
    default_thread_rate_limit_per_user: any;
    /**
     * Creates an instance of BaseChannel.
     * @param {APIChannel} data - The channel payload.
     * @param {Client} client - The client.
     */
    constructor(data: APIChannel, client: Client);
    private patch;
    /**
     * The guild where the channel is located.
     * @type {Guild}
     */
    get guild(): import("./Guild").Guild | undefined;
    /**
     * Clones the channel
     * @returns {Promise<DefaultChannel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>}
     * @async
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     * channel.clone().then((result) => {
     *  if(result?.error){
     *      console.log(`Error :()`)
     *  } else {
     *      console.log(`Channel cloned successfully`)
     *  }
     * })
     */
    clone(obj: APIGuildCreatePartialChannel): Promise<Nullable<ThreadChannel | VoiceChannel | Channel | TextChannel | CategoryChannel | ErrorResponseFromApi>>;
    /**
     *
     * @param {object} obj - The Channel Edit payload
     * @returns {Promise<DefaultChannel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>}
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     * channel.edit({ name: "hello" }).then((result) => {
     *  if(result?.error){
     *      console.log(`Error :()`)
     *  } else {
     *      console.log(`Channel edited successfully`)
     *  }
     * })
     * @async
     */
    edit(obj: APIGuildCreatePartialChannel, reason?: string): Promise<Nullable<ThreadChannel | VoiceChannel | Channel | TextChannel | CategoryChannel | ErrorResponseFromApi>>;
    /**
     * Deletes the Channel
     * @param {string} reason - The reason
     * @returns {Promise<boolean>}
     */
    delete(reason?: string): Promise<boolean>;
    /**
     * Returns the mention of the channel
     * @returns {string}
     * @example
     * const channel = client.channels.cache.get("1234567890123456")
     * channel.send(`Im sending this message in ${channel.toString()}`)
     */
    toString(): string;
    isTextBased(): boolean;
}
export { Channel };
