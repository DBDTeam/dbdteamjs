import {
  APIChannel,
  APIOverwrite,
  ChannelType,
  RESTPatchAPIChannelJSONBody,
  Snowflake,
  ThreadAutoArchiveDuration,
  VideoQualityMode,
} from "discord-api-types/v10";
import { type Client } from "../client/Client";
import { Nullable } from "../common";
import * as Endpoints from "../rest/Endpoints";
import { Base } from "./Base";
import { type CategoryChannel } from "./CategoryChannel";
import { ChannelPermissionManager } from "./Managers/ChannelPermissionManager";
import { type TextChannel } from "./TextChannel";
import { type ThreadChannel } from "./ThreadChannel";
import { type VoiceChannel } from "./VoiceChannel";
import { ChannelTypes } from "../common/types/ChannelTypes";
import { type TextBasedChannel } from "./TextBasedChannel";
import { Guild } from "./Guild";
import { ClientTypeError } from "../client/errors/ClientError";
import { ErrorNames } from "../client/errors/ErrorList";
import { Utilities } from "../utils/utils";
import { RESTResponse } from "../rest/requestHandler";
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
  position!: number;

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
   * @type {Nullable<ThreadAutoArchiveDuration>}
   */
  default_auto_archive_duration: ThreadAutoArchiveDuration | undefined;

  /**
   * The guild where the channel is located.
   * @type {Guild}
   */
  guild!: Guild;

  /**
   * The ID of the guild where the channel is located.
   * @type {Snowflake}
   */
  guildId!: Snowflake;

  /**
   * The flags of the channel.
   * @type {number}
   */
  flags?: number;

  /**
   * The permissions manager of the channel.
   * @type {ChannelPermissionManager}
   */
  permissions!: ChannelPermissionManager;

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
  constructor(private data: APIChannel, client: Client) {
    super(data.id);

    this.data = data;
    this.client = client;
    this.id = data.id;
    this.type = data.type;
    this.name = data.name as string | undefined;

    this.patch(data);
  }

  private patch(data: APIChannel) {
    if ("position" in data) {
      this.position = data.position;
    }

    if ("permission_overwrites" in data) {
      this.permission_overwrites = data.permission_overwrites;
    }

    if ("parent_id" in data) {
      this.parent_id = data.parent_id;
    }

    if ("nsfw" in data) {
      this.nsfw = data.nsfw;
    }

    if ("rtc_region" in data) {
      this.rtc_region = data.rtc_region;
    }

    if ("video_quality_mode" in data) {
      this.video_quality_mode = data.video_quality_mode;
    }

    if ("default_auto_archive_duration" in data) {
      this.default_auto_archive_duration = data.default_auto_archive_duration;
    }

    if ("guild_id" in data) {
      this.guildId = data.guild_id as string;
      this.guild = this.client.guilds.cache.get(
        this.guildId as string
      ) as Guild;
    }

    if ("flags" in data) {
      this.flags = data.flags;
    }

    if ("permission_overwrites" in data) {
      this.permissions = new ChannelPermissionManager(this.id, this.client);
    }

    if ("topic" in data) {
      this.topic = data.topic;
    }

    if ("bitrate" in data) {
      this.bitrate = data.bitrate;
    }

    if ("user_limit" in data) {
      this.user_limit = data.user_limit;
    }

    if ("rate_limit_per_user" in data) {
      this.rate_limit_per_user = data.rate_limit_per_user;
    }
  }

  /**
   * Clones the channel
   * @returns {Promise<Nullable<ThreadChannel | VoiceChannel | Channel | TextChannel | CategoryChannel | RESTResponse>> }
   * @async
   * @example
   * const channel = client.channels.cache.get("766497696604487691")
   * channel.clone().then((result) => {
   *  if(result?.error){
   *      console.log(`Error :(`)
   *  } else {
   *      console.log(`Channel cloned successfully`)
   *  }
   * })
   */

  async clone(
    reason?: string
  ): Promise<
    Nullable<
      | ThreadChannel
      | VoiceChannel
      | Channel
      | TextChannel
      | CategoryChannel
      | RESTResponse
    >
  > {
    const data = {
      name: this.name,
      type: this.type,
      parent_id: this.parent_id,
      topic: this.topic,
      bitrate: this.bitrate,
      user_limit: this.user_limit,
      rate_limit_per_user: this.rate_limit_per_user,
      nsfw: this.nsfw,
      permission_overwrites: this.permission_overwrites,
      position: this.position,
      default_auto_archive_duration: this.default_auto_archive_duration,
      flags: this.flags,
      default_reaction_emoji: this.default_reaction_emoji,
      available_tags: this.available_tags,
      default_sort_order: this.default_sort_order,
      default_forum_layout: this.default_forum_layout,
    };

    if (reason && typeof reason !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "reason");

    var result = await this.client.rest.request<APIChannel>(
      "POST",
      Endpoints.GuildChannels(this.guildId),
      true,
      data,
      reason
    );

    if (!result || !result?.error) return null;

    return result?.error
      ? (result as RESTResponse)
      : Utilities.typeChannel(result, this.client);
  }

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

  async edit(
    data: RESTPatchAPIChannelJSONBody,
    reason?: string
  ): Promise<
    Nullable<
      | ThreadChannel
      | VoiceChannel
      | Channel
      | TextChannel
      | CategoryChannel
      | RESTResponse
    >
  > {
    if (!data || typeof data !== "object")
      throw new ClientTypeError(ErrorNames.InvalidType, "object", "data");

    var result = await this.client.rest.request<APIChannel>(
      "PATCH",
      Endpoints.Channel(this.id),
      true,
      data,
      reason
    );

    if (!result || !result?.error) return null;

    return result?.error
      ? (result as RESTResponse)
      : Utilities.typeChannel(result, this.client);
  }

  /**
   * Deletes the Channel
   * @param {string} reason - The reason
   * @returns {Promise<boolean>}
   */

  async delete(reason?: string): Promise<boolean> {
    if (reason && typeof reason !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "reason");

    var result = await this.client.rest.request(
      "DELETE",
      Endpoints.Channel(this.id),
      true,
      {},
      reason?.trim() || null
    );

    return result?.error ? false : true;
  }

  /**
   * Returns the mention of the channel
   * @returns {string}
   * @example
   * const channel = client.channels.cache.get("1234567890123456")
   * channel.send(`Im sending this message in ${channel.toString()}`)
   */

  toString(): string {
    return `<#${this.id}>`;
  }

  isTextBased(): this is TextBasedChannel {
    return [
      ChannelTypes.Text,
      ChannelTypes.Voice,
      ChannelTypes.PublicThread,
      ChannelTypes.PrivateThread,
    ].includes(this.type);
  }
}
