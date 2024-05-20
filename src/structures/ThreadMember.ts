import { Client } from "../client/Client";
import { Nullable } from "../common";
import * as Endpoints from "../rest/Endpoints";
import { getAllStamps } from "../utils/utils";
import { type Guild } from "./Guild";
import { Member } from "./Member";
import { ThreadChannel } from "./ThreadChannel";

/**
 * @typedef {import('./TextChannel').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel').VoiceChannel} VoiceChannel
 * @typedef {import('./ThreadChannel').ThreadChannel} ThreadChannel
 * @typedef {import('./Guild').Guild} Guild
 * @typedef {import('../client/Client').Client} Client
 */

interface StampInformation {
  stamp: any;
  unix: number;
  date: Date;
}

class ThreadMember {
  #client: Client;
  id: string;
  guild: Nullable<Guild>;
  flags: number;
  member: Member;
  threadId: string;
  thread: ThreadChannel | undefined | null;
  joined: any;
  readonly remove: Function;
  /**
   * Represents a Thread Member
   * @param {object} data - The Thread Member payload
   * @param {Guild} guild - The Guild where the user is
   * @param {Client} client - The Client
   */
  constructor(
    data: Record<string, any>,
    guild: Nullable<Guild>,
    client: Client
  ) {
    this.thread = null;
    this.#client = client;
    /**
     * The thread user ID
     * @type {string}
     */
    this.id = data.user_id;
    /**
     * The Guild this member is from
     * @type {Guild}
     */
    this.guild = guild;
    /**
     * The flags of the Thread Member
     * @type {number}
     */
    this.flags = data.flags || 0;
    /**
     * The Member of the Thread User.
     * @type {Member}
     */
    this.member = this.guild?.members?.cache.get(this.id) as Member;
    /**
     * The ID of the Thread
     * @type {string}
     */
    this.threadId = data.id;
    if (this.#client.channels.cache.get(data.id)) {
      /**
       * The Thread Channel (if it can be finded in the cache)
       * @type {ThreadChannel}
       */
      this.thread = this.#client.channels.cache.get(data.id) as ThreadChannel;
    }
    /**
     * The time information when the user joined to the Thread
     */
    this.joined = getAllStamps(data.joined_timestamp);
    /**
     * Removes the user (alias of {@link ThreadMember.kick})
     * @async
     * @readonly
     */
    this.remove = () => this.kick();
  }

  /**
   * Kick the ThreadMember from the ThreadChannel. Returns true when success, and a object when error.
   * @async
   * @returns {Promise<Object | boolean>}
   */

  async kick() {
    const response = await this.#client.rest.request(
      "DELETE",
      Endpoints.ChannelThreadMember(this.threadId, this.id),
      true
    );

    return response?.error ? response : true;
  }
}

export { ThreadMember };
