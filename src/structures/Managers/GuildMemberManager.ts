import { Collection } from "../../utils/Collection";
import * as Endpoints from "../../rest/Endpoints";
import { User } from "../User";
import { type Client } from "../../client/Client"
import { type Guild } from "../Guild";
import { Member } from "../Member";

export interface FetchWithLimitAndAfter {
  limit?: number,
  after?: number
}

class GuildMemberManager {
  private client: Client;
  public guild: Guild;
  public guildId: string;
  public cache: Collection;
  constructor(client: Client, guild: Guild) {
    this.client = client;
    this.guild = guild;
    this.guildId = guild?.id || guild;
    this.cache = new Collection();
  }

  async _fetchAllMembers(config: FetchWithLimitAndAfter) {
    var endpoint = Endpoints.GuildMembers(this.guildId);

    const conditions = {
      limit:
        config?.limit &&
        Number.isInteger(config?.limit) &&
        (config?.limit >= 1 || config?.limit <= 100),
      after: config?.after && typeof config?.after == "string",
    };

    if (conditions.limit) {
      endpoint += "?limit=" + config?.limit;
    }
    if (conditions.after) {
      endpoint += (conditions.limit ? "&after=" : "?after=") + config.after;
    }
    const response = await this.client.rest.request("GET", endpoint, true);

    if(!response) return null;

    if (response.error) {
      return null;
    } else {
      for (var m of response.data as Array<any>) {
        var x = { ...m, id: m.user.id };
        this.cache.set(
          x.id,
          new Member(
            x,
            this.client.guilds.cache.get(this.guildId),
            this.client
          )
        );
      }

      return this.cache;
    }
  }
  async fetch(memberId: string | Record<string, any>) {
    if (typeof memberId === "string") {
      const result = await this.client.rest.request(
        "GET",
        Endpoints.GuildMember(this.guildId, memberId),
        true
      );

      if(!result) return null;

      if (result?.error) {
        return result;
      } else {
        if(!result.data) return null;
        var x: Record<string, any> = { ...result.data, id: result.data.user.id };
        this.client.users.cache.set(x.id, new User(x.user, this.client));
        var m = new Member(
          x,
          this.client.guilds.cache.get(this.guildId) || this.guild,
          this.client
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
    }
  }

  get me() {
    try {
      if(!this.client.user) return null;
      var member = this.cache.get(this.client.user.id);

      return member;
    } catch (err) {
      return err;
    }
  }
}

module.exports = { GuildMemberManager };
