import { APIChannel, ChannelType, Snowflake } from "discord-api-types/v10";
import { type Client } from "../client/Client";
import { Base } from "./Base";
import { type TextChannel } from "./TextChannel";
import { type ThreadChannel } from "./ThreadChannel";
import { type VoiceChannel } from "./VoiceChannel";
import { type TextBasedChannel } from "./TextBasedChannel";
import { ForumChannel } from "./ForumChannel";
import { DMChannel } from "./DMChannel";
import { GuildChannel } from "./GuildChannel";
import { CategoryChannel } from "./CategoryChannel";
/**
 * Represents a BaseChannel (for easier usage)
 * @param {object} data - The Channel payload
 * @param {Client} client - The Client
 *
 * @extends {Base}
 */
export declare class Channel extends Base {
    private data;
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
    name: string | undefined;
    /**
     * The flags of the channel.
     * @type {number}
     */
    flags?: number;
    /**
     * Creates an instance of BaseChannel.
     * @param {APIChannel} data - The channel payload.
     * @param {Client} client - The client.
     */
    constructor(data: APIChannel, client: Client);
    toString(): string;
    isTextBased(): this is TextBasedChannel;
    isCategory(): this is CategoryChannel;
    isVoice(): this is VoiceChannel;
    isText(): this is TextChannel;
    isThread(): this is ThreadChannel;
    isForum(): this is ForumChannel;
    isDM(): this is DMChannel;
    isGuildChannel(): this is GuildChannel;
}
