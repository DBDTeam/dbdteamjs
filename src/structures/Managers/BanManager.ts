import { type Client } from "../../client";
import { Collection } from "../../utils/Collection";
import { type Guild } from "../Guild";
import * as Endpoints from "../../rest/Endpoints";
import { FetchWithLimitAfterAndBefore, Nullable } from "../../common";
import { User } from "../User";
import { Member } from "../Member";
import { Utilities } from "../../utils/utils";
import { APIBan } from "discord-api-types/v10";
import { RESTResponse } from "../../rest/requestHandler";

export class GuildBanManager {
  /**
   * Represents the Guild bans cache.
   */
  cache: Collection<string, Record<string, any>>;
  /**
   * Represents the guild id.
   */
  id: string;
  constructor(guild: Guild, readonly client: Client) {
    this.cache = new Collection<string, Record<string, any>>();
    this.id = guild.id;
  }
  get guild() {
    return this.client.guilds.cache.get(this.id) as Guild;
  }

  /**
   * Fetches a guild ban if target is defined, otherwise, it fetches the first 100 bans.
   * @param {Nullable<string>} target - The target id of the ban to fetch.
   * @param {FetchWithLimitAfterAndBefore} [options] - The options of the fetch. (Only when target is not defined.)
   * @returns {Promise<Nullable<RESTResponse | Record<string, any>>> }
   */

  async fetch(
    target?: string,
    options?: FetchWithLimitAfterAndBefore
  ): Promise<Nullable<RESTResponse | Record<string, any>>> {
    var url;
    if (target) {
      url = Endpoints.GuildBan(this.guild.id, target);
    } else {
      url = Utilities.buildUrl(
        Endpoints.GuildBans(this.guild.id),
        undefined,
        options
      );
    }

    const response = await this.client.rest.request<APIBan>(
      "GET",
      url
    );

    if (!response || response?.error)
      return response as RESTResponse;

    const user = new User(response.user, this.client);

    return { user, reason: response?.reason };
  }

  /**
   * Creates a ban in the current guild.
   * @param {string | User | Member} userId - The user to ban.
   * @param {string} [reason] - The reason of the ban.
   * @returns
   */

  async create(
    userId: User | string | Member,
    reason?: string
  ): Promise<boolean> {
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

    return response?.error ? false : true;
  }

  /**
   * Removes a ban in the current guild.
   * @param {string | User | Member} userId - The user to unban.
   * @returns
   */

  async remove(userId: User | string | Member): Promise<boolean> {
    const id =
      userId instanceof User
        ? userId.id
        : userId instanceof Member
        ? userId.user.id
        : userId;

    const response = await this.client.rest.request(
      "DELETE",
      Endpoints.GuildBan(this.guild.id, id),
      true
    );

    return response?.error ? false : true;
  }
}
