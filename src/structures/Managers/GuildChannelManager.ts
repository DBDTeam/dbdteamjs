import { type Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { typeChannel } from "../../utils/utils";
import { type Channel } from "../BaseChannel";
import { type CategoryChannel } from "../CategoryChannel";
import { type TextChannel } from "../TextChannel";
import { type ThreadChannel } from "../ThreadChannel";
import { type VoiceChannel } from "../VoiceChannel";

class GuildChannelManager {
  readonly client: Client;
  readonly guildId: string;
  public cache: Collection<
    string,
    Channel | TextChannel | VoiceChannel | ThreadChannel | CategoryChannel
  >;
  constructor(guildId: string, client: Client) {
    this.client = client;
    this.guildId = guildId;
    this.cache = new Collection();
    this._fetchAllChannels();
  }

  async _fetchAllChannels() {
    try {
      const response = await this.client.rest.request(
        "GET",
        Endpoints.GuildChannels(this.guildId),
        true
      );
      var _return = new Collection();

      if (!response) return;

      var allChannels = response.data;

      for (var i of allChannels as Array<any>) {
        var guild =
          this.client.channels.cache.get(i.id)?.guild ||
          this.cache.get(i.id)?.guild;
        i.guild = guild;
        this.client.channels.cache.set(i.id, typeChannel(i, this.client));
        this.cache.set(i.id, typeChannel(i, this.client));
        _return.set(i.id, typeChannel(i, this.client));
      }

      return _return;
    } catch (err) {
      console.log(err);
    }
  }

  async fetch(id: string | undefined | null) {
    if (!id || id?.length >= 17 || id?.length <= 18) {
      var res = await this._fetchAllChannels();

      return res;
    } else {
      const response = await this.client.rest.request(
        "GET",
        Endpoints.Channel(id),
        true
      );

      if (!response) return null;

      var channel = response.data;

      if (!channel) return null;

      this.cache.set(channel.id, channel);
      this.client.channels.cache.set(channel.id, channel);
      return channel;
    }
  }
}

export { GuildChannelManager };
