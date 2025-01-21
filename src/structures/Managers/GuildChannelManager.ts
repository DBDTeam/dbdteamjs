import { APIChannel } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import * as Endpoints from "../../rest/Endpoints";
import { RESTResponse } from "../../rest/requestHandler";
import { Collection } from "../../utils/Collection";
import { Utilities } from "../../utils/utils";
import { ChannnelCreatePayload } from "./ChannelManager";
import { GuildChannel } from "../GuildChannel";

class GuildChannelManager {
  #client: Client;
  private guildId: string;
  public cache: Collection<
    string,
    GuildChannel
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
   * @returns {Promise<Collection<string, GuildChannel>> | null} - A collection of channels or null if an error occurs.
   */
  async #fetchAllChannels(): Promise<Collection<string, GuildChannel> | RESTResponse> {
    const endpoint = Endpoints.GuildChannels(this.guildId);

    const response = await this.#client.rest.request<APIChannel[]>(
      "GET",
      endpoint,
    );


    if (!response) return this.cache;

    if(!response.hasData()) return response;

    var fetched = new Collection<string, GuildChannel>()

    for (let channelData of response.data) {
      const channel = await Utilities.typeChannel(channelData, this.#client)
      fetched.set(channel.id, channel as GuildChannel)
      this.cache.set(
        channel.id,
        channel as GuildChannel
      );
    }

    return fetched;
  }

  /**
   * Fetches a specific channel by its ID.
   * @param {string} id - The ID of the channel to fetch.
   * @returns {Promise<Nullable<GuildChannel | Collection<string, any>> | RESTResponse>} - The fetched channel or null if not found.
   */
  async fetch(
    id?: string
  ): Promise<Nullable<GuildChannel | Collection<string, any>> | RESTResponse> {
    if (typeof id !== "string") {
      return await this.#fetchAllChannels();
    } else {
      const response = await this.#client.rest.request<APIChannel>(
        "GET",
        Endpoints.Channel(id),
      )
      
      if(!response || response?.error) return response as RESTResponse

      const channel = await Utilities.typeChannel(response, this.#client);
      this.cache.set(channel.id, channel as GuildChannel);
      this.#client.channels.cache.set(channel.id, channel);
      return channel as GuildChannel;
    }
  }

  /**
   * Creates a new channel in the guild.
   * @param {ChannnelCreatePayload} channelObj - The channel creation payload.
   * @returns {Promise<Nullable<GuildChannel | RESTResponse>>} - The created channel or null if an error occurs.
   */
  async create(
    channelObj: ChannnelCreatePayload
  ): Promise<
    Nullable<GuildChannel | RESTResponse>
  > {
    const reason = channelObj?.reason;
    const response = await this.#client.rest.request<APIChannel>(
      "POST",
      Endpoints.GuildChannels(this.guildId),
      true,
      channelObj,
      reason
    );

    if (!response || response.error) return response as RESTResponse;

      return await Utilities.typeChannel(response, this.#client) as GuildChannel;
  }

  /**
   * Deletes a channel from the guild.
   * @param {string} channelId - The ID of the channel to delete.
   * @param {string} [reason] - The reason for deleting the channel.
   * @returns {Promise<Nullable<GuildChannel | RESTResponse>>} - The deleted channel or null if an error occurs.
   */
  async delete(
    channelId: string,
    reason?: string
  ): Promise<Nullable<GuildChannel | RESTResponse>> {
    const response = await this.#client.rest.request<APIChannel>(
      "DELETE",
      Endpoints.Channel(channelId),
      true,
      undefined,
      reason
    );

    if (!response || response.error) return response as RESTResponse;

      return await Utilities.typeChannel(response, this.#client) as GuildChannel;
  }
}

export { GuildChannelManager };
