const { Collection } = require("../../utils/Collection");
const Endpoints = require("../../rest/Endpoints");
const { User } = require("../User");
const { Member } = require("../Member");

class UserManager {
  #client;
  constructor(client) {
    this.#client = client;
    this.cache = new Collection();
  }

  async fetch(userId) {
    const result = await this.#client.rest.request(
      "GET",
      Endpoints.User(userId),
      true
    );

    if (result?.error) {
      return result;
    } else {
      var x = new User(result.data, this.#client);
      this.cache.set(result.data.id, x);
      return x;
    }
  }
}

class GuildMemberManager {
  #client;
  constructor(client, guild) {
    this.#client = client;
    this.guild = guild;
    this.guildId = guild?.id || guild;
    this.cache = new Collection();
  }

  async _fetchAllMembers(obj) {
    var endpoint = Endpoints.GuildMembers(this.guildId);

    const conditions = {
      limit:
        obj?.limit &&
        Number.isInteger(obj?.limit) &&
        (obj?.limit >= 1 || obj?.limit <= 100),
      after: obj?.after && typeof obj?.after == "string",
    };

    if (conditions.limit) {
      endpoint += "?limit=" + obj?.limit;
    }
    if (conditions.after) {
      endpoint += (conditions.limit ? "&after=" : "?after=") + obj.after;
    }
    const response = await this.#client.rest.request("GET", endpoint, true);

    if (response.error) {
      return null;
    } else {
      for (var m of response.data) {
        var x = { ...m, id: m.user.id };
        this.cache.set(
          x.id,
          new Member(
            x,
            this.#client.guilds.cache.get(this.guildId),
            this.#client
          )
        );
      }

      return this.cache;
    }
  }
  async fetch(memberId) {
    if (typeof memberId === "string") {
      const result = await this.#client.rest.request(
        "GET",
        Endpoints.GuildMember(this.guildId, memberId),
        true
      );

      if (result?.error) {
        return result;
      } else {
        var x = { ...result.data, id: result.data.user.id };
        this.#client.users.cache.set(x.id, new User(x.user, this.#client));
        var m = new Member(
          x,
          this.#client.guilds.cache.get(this.guildId) || this.guild,
          this.#client
        );
        this.cache.set(x.id, m);

        return m;
      }
    } else if (
      typeof memberId === "object" ||
      memberId === null ||
      memberId === undefined
    ) {
      return await this._fetchAllMembers(memberId || {});
      // return await this._fetchAllMembersInThread(memberId || {})
    }
  }

  get me() {
    try {
      var member = this.cache.get(this.#client.user.id);

      return member;
    } catch (err) {
      return err;
    }
  }
}

module.exports = { UserManager, GuildMemberManager };
