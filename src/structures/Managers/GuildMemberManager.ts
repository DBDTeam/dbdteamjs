import { Collection } from "../../utils/Collection";
import * as Endpoints from "../../rest/Endpoints";
import { User } from "../User";
import { type Client } from "../../client/Client";
import { type Guild } from "../Guild";
import { Member } from "../Member";
import { Nullable } from "../../common";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";

export interface FetchWithLimitAndAfter {
  limit?: number;
  after?: number;
}

class GuildMemberManager {
  #client: Client;
  public guild: Guild;
  public guildId: string;
  public cache: Collection<string, Member>;

  /**
   * Constructs a new GuildMemberManager instance.
   * @param {Client} client - The client instance to interact with the Discord API.
   * @param {Guild} guild - The guild instance for which to manage members.
   */
  constructor(client: Client, guild: Guild) {
    this.#client = client;
    this.guild = guild;
    this.guildId = guild?.id || guild;
    this.cache = new Collection();
  }

  /**
   * Fetches all members of the guild with optional configuration.
   * @param {FetchWithLimitAndAfter} config - The configuration for fetching members, including limit and after.
   * @returns {Promise<Collection<string, Member> | null>} - A collection of members or null if an error occurred.
   */
  async _fetchAllMembers(config: FetchWithLimitAndAfter): Promise<Collection<string, Member> | null> {
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

    const response = await this.#client.rest.request("GET", endpoint, true);

    if (!response) return null;

    if (response.error) {
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
   * Fetches a member by their ID or fetches all members if an object is provided.
   * @param {string | Record<string, any>} memberId - The ID of the member to fetch or a configuration object.
   * @returns {Promise<Nullable<Member | ErrorResponseFromApi | Collection<string, Member>>>} - The fetched member or collection of members, or null if an error occurred.
   */
  async fetch(memberId: string | Record<string, any>): Promise<Nullable<Member | ErrorResponseFromApi | Collection<string, Member>>> {
    if (typeof memberId === "string") {
      const result = await this.#client.rest.request(
        "GET",
        Endpoints.GuildMember(this.guildId, memberId),
        true
      );

      if (!result) return null;

      if (result?.error) {
        return result as ErrorResponseFromApi;
      } else {
        if (!result.data) return null;
        var x: Record<string, any> = {
          ...result.data,
          id: result.data.user.id,
        };
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
   * Gets the client user as a member of the guild.
   * @returns {Nullable<Member | unknown>} - The member instance or null if not found, or an error if an error occurred.
   */
  get me(): Nullable<Member | unknown> {
    try {
      if (!this.#client.user) return null;
      var member = this.cache.get(this.#client.user.id);

      return member;
    } catch (err) {
      return err;
    }
  }
}

export { GuildMemberManager };
