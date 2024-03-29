const { readOnly } = require("../../utils/utils");
const { Collection } = require("../../utils/Collection");
const Endpoints = require("../../rest/Endpoints");

class GuildManager {
  constructor(client) {
    this.client = client;
    readOnly(this, "client", client);
    this.cache = new Collection();
  }
  async fetch(id) {
    var guild = await this.client.rest.request(
      "GET",
      Endpoints.Guild(id),
      true
    );

    guild = guild.data;

    return guild;
  }
}

module.exports = { GuildManager };
