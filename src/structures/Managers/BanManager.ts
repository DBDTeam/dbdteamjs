import { type Client } from "../../client";
import { Collection } from "../../utils/Collection";
import { type Guild } from "../Guild";
import * as Endpoints from "../../rest/Endpoints";
import { FetchWithLimitAfterAndBefore } from "./ThreadMemberManager";
import { Nullable } from "../../common";
import { User } from "../User";
import { Member } from "../Member";

export class GuildBanManager {
  cache: Collection<string, Record<string, any>>;
  id: string;
  constructor(guild: Guild, readonly client: Client) {
    this.cache = new Collection<string, Record<string, any>>();
    this.id = guild.id
  }

  get guild() {
    return this.client.guilds.cache.get(this.id) as Guild
  }

  async fetch(
    target: Nullable<string>,
    options?: FetchWithLimitAfterAndBefore
  ) {
    var url = Endpoints.GuildBans(this.guild.id);
    if (target) {
      url += "/" + target;
    }

    const opts = {
      limit: !!options?.limit,
      before: !!options?.before,
      after: !!options?.after,
    };

    if (opts.after) {
      url +=
        (opts.before || opts.limit ? "&" : "?") + "after=" + options?.after;
    }
    if (opts.before) {
      url +=
        (opts.after || opts.limit ? "&" : "?") + "before=" + options?.before;
    }
    if (opts.limit) {
      url +=
        (opts.after || opts.before ? "&" : "?") + "limit=" + options?.limit;
    }

    const response = await this.client.rest.request("GET", url, true);

    if (!response || response?.error || !response.data) return response;

    return response.data;
  }

  async create(userId: User | string | Member, reason?: string): Promise<boolean> {
    const id =
      userId instanceof User
        ? userId.id
        : userId instanceof Member
        ? userId.user.id
        : userId;

    const response = await this.client.rest.request(
      "PUT",
      Endpoints.GuildBan(this.guild.id, id),
      true,
      undefined,
      reason
    );

    return response?.error ? false : true
  }

  async remove(userId: User | string | Member, reason?: string): Promise<boolean> {
    const id =
      userId instanceof User
        ? userId.id
        : userId instanceof Member
        ? userId.user.id
        : userId;

    const response = await this.client.rest.request(
      "DELETE",
      Endpoints.GuildBan(this.guild.id, id),
      true,
      undefined,
      reason
    );

    return response?.error ? false : true
  }
}