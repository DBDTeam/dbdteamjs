import { APIUser } from "discord-api-types/v10";
import { Nullable } from "../../../lib/interfaces/other";
import { type Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { type Guild } from "../Guild";
import { Member } from "../Member";
import { User } from "../User";
import { FetchWithLimitAndAfter } from "./GuildMemberManager";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";

/**
 * Manages user-related operations such as fetching user data.
 */
class UserManager {
  #client: Client;
  public cache: Collection<string, User>;

  /**
   * Constructs a new UserManager.
   * @param client - The client instance.
   */
  constructor(client: Client) {
    this.#client = client;
    this.cache = new Collection();
  }

  /**
   * Fetches a user by their ID.
   * @param userId - The ID of the user to fetch.
   * @returns The fetched User instance or an error response.
   */
  async fetch(userId: string): Promise<Nullable<User | ErrorResponseFromApi>> {
    const result = await this.#client.rest.request(
      "GET",
      Endpoints.User(userId),
      true
    );

    if (result?.error || !result || !result?.data) {
      return result as ErrorResponseFromApi;
    } else {
      var x = new User(result.data as APIUser, this.#client);
      this.cache.set(result.data.id, x);
      return x;
    }
  }
}

/**
 * Manages guild member-related operations such as fetching and caching members.
 */
class GuildMemberManager {
  #client: Client;
  readonly guild: Guild;
  public guildId: string;
  public cache: Collection<string, Member>;

  /**
   * Constructs a new GuildMemberManager.
   * @param client - The client instance.
   * @param guild - The guild whose members are being managed.
   */
  constructor(client: Client, guild: Guild) {
    this.#client = client;
    this.guild = guild;
    this.guildId = guild?.id || guild;
    this.cache = new Collection();
  }

  /**
   * Fetches all members of the guild with specified options.
   * @param obj - Options for fetching members.
   * @returns A collection of guild members or null if an error occurs.
   * @private
   */
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
    const response = await this.#client.rest.request("GET", endpoint, true);

    if (response?.error || !response || response?.data) {
      return null;
    } else {
      for (var m of response.data as Array<any>) {
        var x = { ...m, id: m.user.id };
        this.cache.set(
          x.id,
          new Member(
            x,
            this.#client.guilds.cache.get(this.guildId) || this.guild,
            this.#client
          )
        );
      }

      return this.cache;
    }
  }

  /**
   * Fetches a guild member by their ID or fetches all members with specified options.
   * @param memberId - The ID of the member to fetch or options for fetching members.
   * @returns A guild member, a collection of guild members, or an error response.
   */
  async fetch(memberId: string | undefined | null): Promise<Nullable<Collection<string, Member> | Member | ErrorResponseFromApi>> {
    if (typeof memberId === "string") {
      const result = await this.#client.rest.request(
        "GET",
        Endpoints.GuildMember(this.guildId, memberId),
        true
      );

      if (result?.error || !result || !result?.data) {
        return result as ErrorResponseFromApi;
      } else {
        var x: Record<any, any> = { ...result.data, id: result.data.user.id };
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
    }
  }

  /**
   * Gets the member instance of the client user.
   * @returns The client user's member instance or null if not available.
   */
  get me(): Nullable<Member> {
    if (!this.#client.user) return null;
    var member = this.cache.get(this.#client.user.id);

    return member;
  }
}

export { GuildMemberManager, UserManager };
