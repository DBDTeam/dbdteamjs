import { Collection } from "../../utils/Collection";
import * as Endpoints from "../../rest/Endpoints";
import { User } from "../User";
import { Member } from "../Member";
import { type Client } from "../../client/Client";
import { type Guild } from "../Guild";
import { FetchWithLimitAndAfter } from "./GuildMemberManager";

class UserManager {
  private client: Client;
  public cache: Collection<string, User>;
  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection();
  }

  async fetch(userId: string) {
    const result = await this.client.rest.request(
      "GET",
      Endpoints.User(userId),
      true
    );

    if (result?.error || !result || !result?.data) {
      return result;
    } else {
      var x = new User(result.data, this.client);
      this.cache.set(result.data.id, x);
      return x;
    }
  }
}

class GuildMemberManager {
  private client: Client;
  readonly guild: Guild;
  public guildId: string;
  public cache: Collection<string, Member>;
  constructor(client: Client, guild: Guild) {
    this.client = client;
    this.guild = guild;
    this.guildId = guild?.id || guild;
    this.cache = new Collection();
  }

  private async _fetchAllMembers(obj: FetchWithLimitAndAfter) {
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
    const response = await this.client.rest.request("GET", endpoint, true);

    if (response?.error || !response || response?.data) {
      return null;
    } else {
      for (var m of response.data as Array<any>) {
        var x = { ...m, id: m.user.id };
        this.cache.set(
          x.id,
          new Member(
            x,
            this.client.guilds.cache.get(this.guildId) || this.guild,
            this.client
          )
        );
      }

      return this.cache;
    }
  }
  async fetch(memberId: string | undefined | null) {
    if (typeof memberId === "string") {
      const result = await this.client.rest.request(
        "GET",
        Endpoints.GuildMember(this.guildId, memberId),
        true
      );

      if (result?.error || !result || !result?.data) {
        return result;
      } else {
        var x: Record<any, any> = { ...result.data, id: result.data.user.id };
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
      if (!this.client.user) return null;
      var member = this.cache.get(this.client.user.id);

      return member;
    } catch (err) {
      return err;
    }
  }
}

export { UserManager, GuildMemberManager };
