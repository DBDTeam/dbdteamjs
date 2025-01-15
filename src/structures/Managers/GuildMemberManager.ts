import { Collection } from "../../utils/Collection";
import * as Endpoints from "../../rest/Endpoints";
import { User } from "../User";
import { type Client } from "../../client/Client";
import { type Guild } from "../Guild";
import { Member } from "../Member";
import { FetchWithLimitAndAfter, Nullable } from "../../common";
import { ClientError } from "../../client/errors/ClientError";
import { ErrorNames } from "../../client/errors/ErrorList";
import { Utilities } from "../../utils/utils";
import { RESTResponse } from "../../rest/requestHandler";
import { APIGuildMember } from "discord-api-types/v10";

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
  async #fetchAllMembers(config: FetchWithLimitAndAfter): Promise<Collection<string, Member> | null> {
    const endpoint = Endpoints.GuildMembers(this.guildId);

    const url = Utilities.buildUrl(endpoint, '', config);

    const response = await this.#client.rest.request<APIGuildMember[]>(
      "GET",
      url
    );

    if (!response || response.error) return null;

    var fetched = new Collection<string, Member>()

    for (let memberData of response as APIGuildMember[]) {
      const userData = { ...memberData, id: memberData.user?.id };
      const member = new Member(
        userData,
        this.#client.guilds.cache.get(this.guildId) || this.guild,
        this.#client
      )
      fetched.set(userData.id as string, member)
      this.cache.set(
        userData.id as string,
        member
      );
    }

    return fetched;
  }

  /**
   * Fetches a member by their ID or fetches all members if an object is provided.
   * @param {string | FetchWithLimitAndAfter} memberId - The ID of the member to fetch or a configuration object.
   * @returns {Promise<Nullable<Member | ErrorResponseFromApi | Collection<string, Member>>>} - The fetched member or collection of members, or null if an error occurred.
   */
  async fetch(memberId: string | FetchWithLimitAndAfter): Promise<Nullable<Member | RESTResponse | Collection<string, Member>>> {
    if (typeof memberId === "string") {
      const result = await this.#client.rest.request(
        "GET",
        Endpoints.GuildMember(this.guildId, memberId)
      );
    
      if (!result || result?.error) return result as RESTResponse;
    
      const { user } = result as Record<any, any>;
      const userData = { ...result, id: user.id };
    
      this.#client.users.cache.set(userData.id, new User(user, this.#client));
      const member = new Member(userData, this.#client.guilds.cache.get(this.guildId) || this.guild, this.#client);
      this.cache.set(userData.id, member);
    
      return member;
    } else {
      return await this.#fetchAllMembers(memberId || {});
    }    
  }

  /**
   * Gets the client user as a member of the guild.
   * @returns {Member} - The member instance or null if not found, or an error if an error occurred.
   */
  get me(): Member {
    const member = this.cache.get(this.#client.user.id) as Member;
    if (!member) throw new ClientError(ErrorNames.GuildMemberMeUncached);
    return member;
  }
}

export { GuildMemberManager };
