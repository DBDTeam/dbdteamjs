import { APIChannel } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import * as Endpoints from "../../rest/Endpoints";
import { RESTResponse } from "../../rest/requestHandler";
import { Collection } from "../../utils/Collection";
import { Utilities } from "../../utils/utils";
import { Channel } from "../BaseChannel";
import { type CategoryChannel } from "../CategoryChannel";
import { ForumChannel } from "../ForumChannel";
import { TextBasedChannel } from "../TextBasedChannel";
import { type TextChannel } from "../TextChannel";
import { type ThreadChannel } from "../ThreadChannel";
import { type VoiceChannel } from "../VoiceChannel";
import { ChannnelCreatePayload } from "./ChannelManager";

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
  }

  /**
   * Fetches all channels for the guild and populates the cache.
   * @private
   * @returns {Promise<Collection<string, Channel>> | null} - A collection of channels or null if an error occurs.
   */
  async #fetchAllChannels(): Promise<Collection<string, any> | RESTResponse> {
    const endpoint = Endpoints.GuildChannels(this.guildId);

    const response = await this.#client.rest.request<APIChannel[]>(
      "GET",
      endpoint,
    );


    if (!response || response.error) return response as RESTResponse;

    var fetched = new Collection<string, Channel>()

    for (let channelData of response as APIChannel[]) {
      const channel = await Utilities.typeChannel(channelData, this.#client)
      fetched.set(channel.id, channel)
      this.cache.set(
        channel.id,
        channel
      );
    }

    return fetched;
  }

  /**
   * Fetches a specific channel by its ID.
   * @param {string} id - The ID of the channel to fetch.
   * @returns {Promise<Channel | null>} - The fetched channel or null if not found.
   */
  async fetch(
    id?: string
  ): Promise<Nullable<Channel | Collection<string, any>> | RESTResponse> {
    if (typeof id !== "string") {
      return await this.#fetchAllChannels();
    } else {
      const response = await this.#client.rest.request(
        "GET",
        Endpoints.Channel(id),
      )
      
      if(!response || response?.error) return response as RESTResponse

      const channel = await Utilities.typeChannel(response, this.#client);
      this.cache.set(channel.id, channel);
      this.#client.channels.cache.set(channel.id, channel);
      return channel;
    }
  }

  /**
   * Creates a new channel in the guild.
   * @param {ChannnelCreatePayload} channelObj - The channel creation payload.
   * @returns {Promise<Nullable<Channel | VoiceChannel | ThreadChannel | CategoryChannel | ForumChannel | TextBasedChannel | TextChannel | ErrorResponseFromApi>>} - The created channel or null if an error occurs.
   */
  async create(
    channelObj: ChannnelCreatePayload
  ): Promise<
    Nullable<
      | Channel
      | VoiceChannel
      | ThreadChannel
      | CategoryChannel
      | ForumChannel
      | TextBasedChannel
      | TextChannel
      | RESTResponse
    >
  > {
    const reason = channelObj?.reason;
    const response = await this.#client.rest.request<APIChannel>(
      "POST",
      Endpoints.GuildChannels(this.guildId),
      true,
      channelObj,
      reason
    );

    if (!response) return response;

    if (response?.error) {
      return response as RESTResponse;
    } else {
      return await Utilities.typeChannel(response, this.#client);
    }
  }

  /**
   * Deletes a channel from the guild.
   * @param {string} channelId - The ID of the channel to delete.
   * @param {string} [reason] - The reason for deleting the channel.
   * @returns {Promise<Nullable<Channel | RESTResponse>>} - The deleted channel or null if an error occurs.
   */
  async delete(
    channelId: string,
    reason?: string
  ): Promise<Nullable<Channel | RESTResponse>> {
    const response = await this.#client.rest.request(
      "DELETE",
      Endpoints.Channel(channelId),
      true,
      undefined,
      reason
    );

    if (!response) return response;

    if (response.error) {
      return response as RESTResponse;
    } else {
      return await Utilities.typeChannel(response.data, this.#client);
    }
  }
}

export { GuildChannelManager };
