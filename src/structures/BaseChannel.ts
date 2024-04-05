import { Base } from "./Base.js";
import * as Endpoints from "../rest/Endpoints.js";
import { typeChannel, setObj } from "../utils/utils.js";
import { ChannelPermissionManager } from "./Managers/ChannelPermissionManager";
import { type Client } from "../client/Client";
import { APIGuildCreatePartialChannel, ChannelType, VideoQualityMode } from "discord-api-types/v10";
import { type Guild } from "./Guild";
import { type ThreadChannel } from "./ThreadChannel.js";
import { type VoiceChannel } from "./VoiceChannel.js";
import { type TextChannel } from "./TextChannel.js";
import { type CategoryChannel } from "./CategoryChannel.js";
import { Channel } from "./BaseChannel.js";
import { ErrorResponseFromApi } from "../interfaces/rest/requestHandler.js";
import { Nullded } from "../interfaces/other.js";

/**
 * @typedef {import('./TextChannel.js').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel.js').VoiceChannel} VoiceChannel
 * @typedef {import('./ThreadChannel.js').ThreadChannel} ThreadChannel
 * @typedef {import('./CategoryChannel.js').CategoryChannel} CategoryChannel
 * @typedef {import('./Guild.js').Guild} Guild
 */

/**
 * Represents a BaseChannel (for a easier usage)
 * @extends {Base}
 */
class BaseChannel extends Base {
  private data: any;
  /**
   * Represents a BaseChannel (for a easier usage)
   * @param {object} data - The Channel payload
   * @param {import("./Interactions/BaseInteraction.js").Client} client - The Client
   */
  readonly client: Client;
  id: string;
  type: ChannelType;
  name: string;
  topic: string | Nullded;
  bitrate: number | Nullded;
  user_limit: number | Nullded;
  rate_limit_per_user: number | Nullded;
  position: number;
  permission_overwrites: Record<any, any>[];
  parent_id: number | Nullded;
  nsfw: number;
  rtc_region: string | Nullded;
  video_quality_mode: VideoQualityMode | Nullded;
  default_auto_archive_duration: number | Nullded;
  guild: Guild;
  guildId: string;
  flags: number;
  permissions: ChannelPermissionManager;
  default_reaction_emoji: any;
  available_tags: any;
  default_sort_order: any;
  default_forum_layout: any;
  default_thread_rate_limit_per_user: any;
  constructor(data: Record<any, any>, client: Client) {
    super(client);
    this.data = data;
    this.client = client;

    /**
     * The Channel ID
     * @type {string}
     */
    this.id = data.id;
    /**
     * The Channel type
     * @type {string}
     */
    this.type = data.type;
    /**
     * The Channel name
     * @type {string}
     */
    this.name = data.name;
    /**
     * The Channel topic
     * @type {string}
     */
    this.topic = data.topic;
    /**
     * The Channel bitrate
     * @type {unknown}
     */
    this.bitrate = data.bitrate;
    /**
     * The Channel user_limit
     * @type {unknown}
     */
    this.user_limit = data.user_limit;
    /**
     * The Channel rate limit
     * @type {unknown}
     */
    this.rate_limit_per_user = data.rate_limit_per_user;
    /**
     * The Channel position
     * @type {unknown}
     */
    this.position = data.position;
    /**
     * The Channel permission overwrites
     * @type {unknown}
     */
    this.permission_overwrites = data.permission_overwrites;
    /**
     * The Channel parent_id
     * @type {unknown}
     */
    this.parent_id = data.parent_id;
    /**
     * The Channel NSFW
     * @type {unknown}
     */
    this.nsfw = data.nsfw;
    /**
     * The Channel RTC region
     * @type {unknown}
     */
    this.rtc_region = data.rtc_region;
    /**
     * The Channel video quality mode
     * @type {unknown}
     */
    this.video_quality_mode = data.video_quality_mode;
    /**
     * The Channel default auto archive durations
     * @type {unknown}
     */
    this.default_auto_archive_duration = data.default_auto_archive_duration;
    /**
     * The Guild where the Channel is it
     * @type {Guild}
     */
    this.guild = data.guild;
    /**
     * The Guild id where the Channel is it
     * @type {number}
     */
    this.guildId = data.guild_id || data.guild.id;
    /**
     * The Channel flags
     * @type {number}
     */
    this.flags = data.flags;
    /**
     * The Channel permissions manager
     * @type {ChannelPermissionManager}
     */
    this.permissions = new ChannelPermissionManager(
      data.permission_overwrites || [],
      this.id,
      client
    );
  }

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

  async clone(obj: APIGuildCreatePartialChannel): Promise<ThreadChannel | VoiceChannel | Channel | TextChannel | CategoryChannel | Nullded | ErrorResponseFromApi> {
    const channelObj = {
      name: null,
      type: null,
      topic: null,
      bitrate: null,
      user_limit: null,
      rate_limit_per_user: null,
      position: null,
      permission_overwrites: null,
      parent_id: null,
      nsfw: null,
      rtc_region: null,
      video_quality_mode: null,
      default_auto_archive_duration: null,
      default_reaction_emoji: null,
      available_tags: null,
      default_sort_order: null,
      default_forum_layout: null,
      default_thread_rate_limit_per_user: null,
    };

    const data = setObj(channelObj, obj, {
      parent_id: "parent",
      permission_overwrites: "permissions",
      rtc_region: "rtc",
      video_quality_mode: "videoQuality",
      default_auto_archive_duration: "defaultAutoArchiveDuration",
      default_reaction_emoji: "defaultReactionEmoji",
    });

    var result = await this.client.rest.request(
      "POST",
      Endpoints.GuildChannels(this.guildId),
      true,
      { data }
    );

    if(!result || !result?.data) return null;

    return result?.error ? result as ErrorResponseFromApi : typeChannel(result.data, this.client);
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

  async edit(obj: APIGuildCreatePartialChannel, reason?: string): Promise<ThreadChannel | VoiceChannel | Channel | TextChannel | CategoryChannel | Nullded | ErrorResponseFromApi> {
    const channelObj = {
      name: this.name,
      topic: this.topic,
      bitrate: this.bitrate,
      user_limit: this.user_limit,
      rate_limit_per_user: this.rate_limit_per_user,
      position: this.position,
      permission_overwrites: this.permission_overwrites,
      parent_id: this.parent_id,
      nsfw: this.nsfw,
      rtc_region: this.rtc_region,
      video_quality_mode: this.video_quality_mode,
      default_auto_archive_duration: this.default_auto_archive_duration,
      default_reaction_emoji: this.default_reaction_emoji,
      available_tags: this.available_tags,
      default_sort_order: this.default_sort_order,
      default_forum_layout: this.default_forum_layout,
      default_thread_rate_limit_per_user:
        this.default_thread_rate_limit_per_user,
    };

    const data = setObj(channelObj, obj, {
      parent_id: "parent",
      permission_overwrites: "permissions",
      rtc_region: "rtc",
      video_quality_mode: "videoQuality",
      default_auto_archive_duration: "defaultAutoArchiveDuration",
      default_reaction_emoji: "defaultReactionEmoji",
    });

    var result = await this.client.rest.request(
      "PATCH",
      Endpoints.Channel(this.id),
      true,
      { data },
      reason
    );

    if(!result || !result?.data) return null;

    return result?.error ? result as ErrorResponseFromApi : typeChannel(result.data, this.client);
  }

  /**
   * Deletes the Channel
   * @param {string} reason - The reason
   * @returns {Promise<boolean>}
   */

  async delete(reason?: string): Promise<boolean> {
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
}

export { BaseChannel as Channel };
