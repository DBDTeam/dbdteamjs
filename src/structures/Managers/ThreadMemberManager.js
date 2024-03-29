const { Collection } = require("../../utils/Collection");
const { readOnly } = require("../../utils/utils");
const { ThreadMember } = require("../ThreadMember");
const Endpoints = require("../../rest/Endpoints");

class ThreadMemberManager {
  #client;
  constructor(client, thread) {
    this.id = thread.id;
    readOnly(this, "guild", thread.guild);
    this.#client = client;
    this.memberCount = 0;
    this.cache = new Collection();
  }

  async _fetchAllMembersInThread(obj) {
    var endpoint =
      Endpoints.ChannelThreadMembers(this.id) + `?with_member=true`;

    if (
      obj?.limit &&
      Number.isInteger(obj?.limit) &&
      (obj?.limit >= 1 || obj?.limit <= 100)
    ) {
      endpoint += "&limit=" + obj?.limit;
    }
    if (obj?.after && typeof obj?.after == "string") {
      endpoint += "&after=" + obj?.after;
    }
    if (obj?.before && typeof obj?.before == "string") {
      endpoint += "&before=" + obj?.before;
    }
    const response = await this.#client.rest.request("GET", endpoint, true);

    if (response.error) {
      return null;
    } else {
      for (var m of response.data) {
        var x = new ThreadMember(m, this.guild, this.#client);
        this.cache.set(x.id, x);
      }

      return this.cache;
    }
  }
  async fetch(memberId) {
    if (typeof memberId === "string") {
      const result = await this.#client.rest.request(
        "GET",
        Endpoints.ChannelThreadMember(this.id, memberId)
      );

      if (result?.error) {
        return result;
      } else {
        var x = new ThreadMember(result.data, this.guild, this.#client);
        this.cache.set(x.id, x);

        return m;
      }
    } else if (
      typeof memberId === "object" ||
      memberId === null ||
      memberId === undefined
    ) {
      return await this._fetchAllMembersInThread(memberId || {});
    }
  }

  async remove(memberId) {
    memberId = memberId?.id || memberId;

    const response = await this.#client.rest.request(
      "DELETE",
      Endpoints.ChannelThreadMember(this.id, memberId),
      true
    );

    return response;
  }
}

module.exports = { ThreadMemberManager };
