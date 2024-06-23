import { type Client } from "../../client/Client";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { typeChannel } from "../../utils/utils";
import { type Channel } from "../BaseChannel";
import { type CategoryChannel } from "../CategoryChannel";
import { ForumChannel } from "../ForumChannel";
import { TextBasedChannel } from "../TextBasedChannel";
import { type TextChannel } from "../TextChannel";
import { type ThreadChannel } from "../ThreadChannel";
import { type VoiceChannel } from "../VoiceChannel";

class GuildChannelManager {
  #client: Client;
  readonly guildId: string;
  public cache: Collection<
    string,
    Channel
  >;
  constructor(guildId: string, client: Client) {
    this.#client = client;
    this.guildId = guildId;
    this.cache = new Collection();
  }

  async _fetchAllChannels(): Promise<
    | Collection<string, CategoryChannel | TextBasedChannel | ForumChannel | Channel>
    | ErrorResponseFromApi
  > {
    try {
      const response = await this.#client.rest.request(
        "GET",
        Endpoints.GuildChannels(this.guildId),
        true
      );
      var _return = new Collection<
        string,
        CategoryChannel | TextBasedChannel | ForumChannel | Channel
      >();

      if (!response?.error) return response as ErrorResponseFromApi;

      var allChannels = response.data;

      for (var i of allChannels as Array<any>) {
        var guild =
          this.#client.channels.cache.get(i.id)?.guild ||
          this.cache.get(i.id)?.guild;
        i.guild = guild;
        const ch = typeChannel(i, this.#client)
        this.#client.channels.cache.set(i.id, ch);
        this.cache.set(i.id, ch);
        _return.set(i.id, ch);
      }

      return _return;
    } catch (err) {
      return err as ErrorResponseFromApi;
    }
  }

  /**
   * Fetches a channel in the current guild (if param id is defined, otherwise, fetches the first 100 channels of the guild.)
   * @param {string|undefined|null} id - The Channel Id that will be fetched in the current guild.
   * @returns {Promise<Collection<string, CategoryChannel | TextBasedChannel | ForumChannel> | ErrorResponseFromApi | undefined | CategoryChannel | TextBasedChannel | ForumChannel> | ErrorResponseFromApi>}
   */

  async fetch(
    id: string | undefined | null
  ): Promise<
    | Collection<string, CategoryChannel | TextBasedChannel | ForumChannel>
    | ErrorResponseFromApi
    | CategoryChannel
    | TextBasedChannel
    | ForumChannel
    | Channel
  > {
    if (!id || id?.length >= 17 || id?.length <= 18) {
      var res = await this._fetchAllChannels();

      return res as Collection<string, CategoryChannel | TextBasedChannel | ForumChannel>;
    } else {
      const response = await this.#client.rest.request(
        "GET",
        Endpoints.Channel(id),
        true
      );

      if (!response || response?.error === true)
        return response as ErrorResponseFromApi;

      var channel = typeChannel(response.data, this.#client);

      if (!channel) return response as ErrorResponseFromApi;

      this.cache.set(channel.id, channel);
      this.#client.channels.cache.set(channel.id, channel);
      return channel;
    }
  }
}

export { GuildChannelManager };
