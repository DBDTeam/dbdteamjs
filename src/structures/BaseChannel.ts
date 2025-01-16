import {
  APIChannel,
  ChannelType,
  Snowflake,
} from "discord-api-types/v10";
import { type Client } from "../client/Client";
import { Base } from "./Base";
import { type TextChannel } from "./TextChannel";
import { type ThreadChannel } from "./ThreadChannel";
import { type VoiceChannel } from "./VoiceChannel";
import { ChannelTypes } from "../common/types/ChannelTypes";
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
export class Channel extends Base {
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
  constructor(private data: APIChannel, client: Client) {
    super(data.id);

    this.data = data;
    this.client = client;
    this.id = data.id;
    this.type = data.type;
    this.name = data.name as string | undefined;
  }

  toString(): string {
    return `<#${this.id}>`;
  }

  isTextBased(): this is TextBasedChannel {
    return [
      ChannelTypes.Text,
      ChannelTypes.Voice,
      ChannelTypes.PublicThread,
      ChannelTypes.PrivateThread,
      ChannelTypes.DM,
    ].includes(this.type);
  }

  isCategory(): this is CategoryChannel {
    return ChannelTypes.Category === this.type
  }

  isVoice(): this is VoiceChannel {
    return ChannelTypes.Voice === this.type
  }

  isText(): this is TextChannel {
    return ChannelTypes.Text === this.type
  };

  isThread(): this is ThreadChannel {
    return [ChannelTypes.PublicThread, ChannelTypes.PrivateThread].includes(this.type)
  }

  isForum(): this is ForumChannel {
    return this.type === ChannelTypes.Forum
  }

  isDM(): this is DMChannel {
    return this.type === ChannelTypes.DM
  }

  isGuildChannel(): this is GuildChannel {
    return this.isText() || this.isThread() || this.isVoice() || this.isCategory()
  }
}
