import { type Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { typeChannel } from "../../utils/utils";

class GuildChannelManager {
  private client: Client;
  private guildId: string;
  public cache: Collection;

  constructor(guildId: string, client: Client) {
    this.client = client;
    this.guildId = guildId;
    this.cache = new Collection();
    this._fetchAllChannels();
  }

  async _fetchAllChannels() {
    try {
      const result = await this.client.rest.request(
        "GET",
        Endpoints.GuildChannels(this.guildId),
        true
      );
      var _return = new Collection();
      if (!result) return null;
      var allChannels = result.data;

      if (!allChannels) return null;

      for (const i of allChannels as Array<any>) {
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

  async fetch(id: string) {
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
      if (!response.data) return null;

      const channel: Record<string, any> = response.data;
      this.cache.set(channel.id, channel);
      this.client.channels.cache.set(channel.id, channel);
      return channel;
    }
  }

  async create(channelObj = {}) {
    const reason = channelObj?.reason;
    const response = this.client.rest.request(
      "POST",
      Endpoints.GuildChannels(this.guildId),
      true,
      channelObj,
      reason
    );

    if (response.error) {
      return response.error;
    } else {
      return await typeChannel(response.data, this.client);
    }
  }

  async delete(channelId, reason) {
    const response = this.client.rest.request(
      "DELETE",
      Endpoints.Channel(channelId),
      true,
      channelObj,
      reason
    );

    if (response.error) {
      return response.error;
    } else {
      return await typeChannel(response.data, this.client);
    }
  }
}

class ChannelManager {
  constructor(client) {
    readOnly(this, "client", client);
    this.cache = new Collection();
  }

  async fetch(id) {
    var channel = await this.client.rest.request(
      "GET",
      Endpoints.CHANNEL(id),
      true
    );

    channel = channel.data;

    return channel;
  }
}

module.exports = { GuildChannelManager, ChannelManager };
