import {
  APIChannelPatchOverwrite,
  APIGuildForumDefaultReactionEmoji,
  APIGuildForumTag,
  ChannelType,
  ForumLayoutType,
  SortOrderType,
  VideoQualityMode,
} from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { typeChannel } from "../../utils/utils";
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

class GuildChannelManager {
  #client: Client;
  private guildId: string;
  public cache: Collection<
    string,
    Channel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel
  >;

  /**
   * Constructs a new GuildChannelManager instance.
   * @param {string} guildId - The ID of the guild to manage channels for.
   * @param {Client} client - The client instance to interact with the Discord API.
   */
  constructor(guildId: string, client: Client) {
    this.#client = client;
    this.guildId = guildId;
    this.cache = new Collection();
    this._fetchAllChannels();
  }

  /**
   * Fetches all channels for the guild and populates the cache.
   * @private
   * @returns {Promise<Collection<string, Channel>> | null} - A collection of channels or null if an error occurs.
   */
  async _fetchAllChannels(): Promise<Nullable<Collection<string, any>>> {
    try {
      const result = await this.#client.rest.request(
        "GET",
        Endpoints.GuildChannels(this.guildId),
        true
      );
      var _return = new Collection<string, any>();
      if (!result) return null;
      var allChannels = result.data;

      if (!allChannels) return null;

      for (const i of allChannels as Array<any>) {
        var guild =
          this.#client.channels.cache.get(i.id)?.guild ||
          this.cache.get(i.id)?.guild;
        i.guild = guild;
        this.#client.channels.cache.set(i.id, typeChannel(i, this.#client));
        this.cache.set(i.id, typeChannel(i, this.#client));
        _return.set(i.id, typeChannel(i, this.#client));
      }

      return _return;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Fetches a specific channel by its ID.
   * @param {string} id - The ID of the channel to fetch.
   * @returns {Promise<Channel | null>} - The fetched channel or null if not found.
   */
  async fetch(id: string): Promise<Nullable<Channel | Collection<string, any>>> {
    if (!id || id?.length >= 17 || id?.length <= 18) {
      var res = await this._fetchAllChannels();

      return res;
    } else {
      const response = await this.#client.rest.request(
        "GET",
        Endpoints.Channel(id),
        true
      );

      if (!response) return null;
      if (!response.data) return null;

      const channel= await typeChannel(response.data, this.#client);
      this.cache.set(channel.id, channel);
      this.#client.channels.cache.set(channel.id, channel);
      return channel;
    }
  }

  /**
   * Creates a new channel in the guild.
   * @param {ChannnelCreatePayload} channelObj - The channel creation payload.
   * @returns {Promise<Nullable<Channel | ErrorResponseFromApi>>} - The created channel or null if an error occurs.
   */
  async create(channelObj: ChannnelCreatePayload): Promise<Nullable<Channel | ErrorResponseFromApi>> {
    const reason = channelObj?.reason;
    const response = await this.#client.rest.request(
      "POST",
      Endpoints.GuildChannels(this.guildId),
      true,
      channelObj,
      reason
    );

    if (!response) return response;

    if (response?.error) {
      return response as ErrorResponseFromApi;
    } else {
      return await typeChannel(response.data, this.#client);
    }
  }

  /**
   * Deletes a channel from the guild.
   * @param {string} channelId - The ID of the channel to delete.
   * @param {string} [reason] - The reason for deleting the channel.
   * @returns {Promise<Nullable<Channel | ErrorResponseFromApi>>} - The deleted channel or null if an error occurs.
   */
  async delete(channelId: string, reason?: string): Promise<Nullable<Channel | ErrorResponseFromApi>> {
    const response = await this.#client.rest.request(
      "DELETE",
      Endpoints.Channel(channelId),
      true,
      undefined,
      reason
    );

    if (!response) return response;

    if (response.error) {
      return response as ErrorResponseFromApi;
    } else {
      return await typeChannel(response.data, this.#client);
    }
  }
}


class ChannelManager {
  #client: Client;
  public cache: Collection<
    string,
    Channel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel
  >;

  /**
   * Constructs a new ChannelManager instance.
   * @param {Client} client - The client instance to interact with the Discord API.
   */
  constructor(client: Client) {
    this.#client = client;
    this.cache = new Collection();
  }

  /**
   * Fetches a specific channel by its ID.
   * @param {string} id - The ID of the channel to fetch.
   * @returns {Promise<Channel | null>} - The fetched channel or null if an error occurs.
   */
  async fetch(id: string) {
    const response = await this.#client.rest.request(
      "GET",
      Endpoints.Channel(id),
      true
    );

    if (!response || response.status !== 200) return response;

    return await typeChannel(response.data, this.#client);
  }
}


export { GuildChannelManager, ChannelManager };
