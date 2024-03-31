const { readOnly, getAllStamps } = require("../utils/utils");
const { Member } = require("./Member");
const Endpoints = require("../rest/Endpoints");

/**
 * @typedef {import('./TextChannel').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel').VoiceChannel} VoiceChannel
 * @typedef {import('./ThreadChannel').ThreadChannel} ThreadChannel
 * @typedef {import('./Guild').Guild} Guild
 * @typedef {import('../client/Client').Client} Client
 */

class ThreadMember {
  #client;
  /**
   * Represents a Thread Member
   * @param {object} data - The Thread Member payload
   * @param {Guild} guild - The Guild where the user is
   * @param {Client} client - The Client
   */
  constructor(data, guild, client) {
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
    this.guild = data.guild || guild;
    /**
     * The flags of the Thread Member
     * @type {number}
     */
    this.flags = data.flags || 0;
    /**
     * The Member of the Thread User.
     * @type {Member}
     */
    this.member = data.member
      ? new Member({ ...data.member, id: this.id }, guild, this.#client)
      : this.guild.members.cache.get(this.id);
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
      this.thread = this.#client.channels.cache.get(data.id);
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
    readOnly(this, "remove", () => this.kick());
  }

  /**
   * Kick the ThreadMember from the ThreadChannel. Returns true when success, and a object when error.
   * @async
   * @returns {Promise<Object | boolean>}
   */

  async kick() {
    const response = await this.#client.rest.request(
      "DELETE",
      Endpoints.ChannelThreadMember(this.id),
      true
    );

    return response?.error ? response : true;
  }
}

module.exports = { ThreadMember };
