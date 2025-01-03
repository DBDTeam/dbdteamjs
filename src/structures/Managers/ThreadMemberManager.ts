import { type Client } from "../../client/Client";
import { FetchWithLimitAfterAndBefore } from "../../common";
import * as Endpoints from "../../rest/Endpoints";
import { RESTResponse } from "../../rest/requestHandler";
import { Collection } from "../../utils/Collection";
import { Utilities } from "../../utils/utils";
import { type Guild } from "../Guild";
import { type ThreadChannel } from "../ThreadChannel";
import { ThreadMember } from "../ThreadMember";

/**
 * Manages the members of a thread in a guild.
 */
class ThreadMemberManager {
  #client: Client;
  id: string;
  guild: Guild;
  memberCount: number;
  cache: Collection<string, ThreadMember>;

  /**
   * Constructs a new ThreadMemberManager.
   * @param client - The client instance.
   * @param thread - The thread channel whose members are being managed.
   */
  constructor(client: Client, thread: ThreadChannel) {
    this.id = thread.id;
    this.guild = thread.guild;
    this.#client = client;
    this.memberCount = 0;
    this.cache = new Collection();
  }

  /**
   * Fetches all members in a thread with specified options.
   * @param obj - Options for fetching members.
   * @returns A collection of thread members or null if an error occurs.
   * @private
   */
  async #fetchAllMembersInThread(config: FetchWithLimitAfterAndBefore) {
    const endpoint = Endpoints.ChannelThreadMembers(this.id);

    const url = Utilities.buildUrl(endpoint, "", config);

    const response = await this.#client.rest.request("GET", url);

    var fetched = new Collection<string, ThreadMember>();

    if (response?.error || !response) {
      return response as RESTResponse;
    } else {
      for (var member of response.data) {
        var thread_member = new ThreadMember(member, this.guild, this.#client);
        this.cache.set(thread_member.id, thread_member);
        fetched.set(thread_member.id, thread_member);
      }

      return fetched;
    }
  }

  /**
   * Fetches a thread member by ID or fetches all members with specified options.
   * @param memberId - The ID of the member to fetch or options for fetching members.
   * @returns A thread member, a collection of thread members, or an error response.
   */
  async fetch(memberId: string | FetchWithLimitAfterAndBefore) {
    if (typeof memberId === "string") {
      const result = await this.#client.rest.request(
        "GET",
        Endpoints.ChannelThreadMember(this.id, memberId)
      );

      if (result?.error || !result) {
        return result as RESTResponse;
      } else {
        var thread_member = new ThreadMember(
          result as Record<string, any>,
          this.guild as Guild,
          this.#client
        );
        this.cache.set(thread_member.id, thread_member);

        return thread_member;
      }
    } else {
      return await this.#fetchAllMembersInThread(memberId || {});
    }
  }

  /**
   * Removes a member from a thread.
   * @param memberId - The ID of the member to remove.
   * @returns {boolean} - Returns true or false if the member was removed from the thread.
   */
  async remove(memberId: string) {
    const response = await this.#client.rest.request(
      "DELETE",
      Endpoints.ChannelThreadMember(this.id, memberId)
    );

    if (response?.error) return false;

    this.cache.delete(memberId);
    return true;
  }
}

export { ThreadMemberManager };
