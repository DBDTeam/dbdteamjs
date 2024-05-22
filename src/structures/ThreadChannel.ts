import { type Client } from "../client/Client";
import { ErrorResponseFromApi } from "../interfaces/rest/requestHandler";
import * as Endpoints from "../rest/Endpoints";
import { getAllStamps, setObj, typeChannel } from "../utils/utils";
import { Channel } from "./BaseChannel";
import { CategoryChannel } from "./CategoryChannel";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import { ThreadMemberManager } from "./Managers/ThreadMemberManager";
import { Member } from "./Member";
import { TextBasedChannel } from "./TextBasedChannel";
import { TextChannel } from "./TextChannel";
import { VoiceChannel } from "./VoiceChannel";

/**
 * @typedef {import('./TextChannel').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel').VoiceChannel} VoiceChannel
 * @typedef {import('./ForumChannel')} ForumChannel
 * @typedef {import('./Guild').Guild} Guild
 * @typedef {import('../client/Client').Client} Client
 */

/** @extends {Channel} */
class ThreadChannel extends TextBasedChannel {
  readonly client: Client;
  message_count: number;
  locked: boolean;
  created: any;
  auto_archive_duration: number;
  archived: boolean;
  archive_stamp: any;
  channel_id: string;
  channel?: TextChannel | Channel;
  owner_id: string;
  owner?: Member;
  members: ThreadMemberManager;
  messages: ChannelMessageManager<ThreadChannel>;
  /**
   * Represents a ThreadChannel
   * @param {Object} data - The ThreadChannel payload
   * @param {Client} client - The Client
   */
  constructor(data: any, client: Client) {
    super(data, client);
    this.client = client;
    /**
     * The message count of the thread (stops when reaches 50 messages)
     * @type {number}
     */
    this.message_count = data.total_message_sent;
    /**
     * If the ThreadChannel is locked
     * @type {boolean | undefined}
     */
    this.locked = data.thread_metadata?.locked;
    /**
     * The time information when the ThreadChannel was created
     * @type {object}
     */
    this.created = getAllStamps(data.thread_metadata?.create_timestamp);
    /**
     * The auto archive dration of the ThreadChannel in seconds.
     * @type {number}
     */
    this.auto_archive_duration = data.thread_metadata?.auto_archive_duration;
    /**
     * If the ThreadChannel is archived
     * @type {boolean}
     */
    this.archived = data.thread_metadata.archived;
    /**
     * The time information when the ThreadChannel was archived (only if the ThreadChannel is archived)
     * @type {object | undefined}
     */
    this.archive_stamp = getAllStamps(data.thread_metadata?.archive_timestamp);
    /**
     * The cooldown of the ThreadChannel in seconds.
     * @type {string | undefined}
     */
    this.rate_limit_per_user = data.rate_limit_per_user;
    /**
     * The Channel Id where the ThreadChannel was created.
     * @type {number}
     */
    this.channel_id = data.parent_id;
    if (this.client.channels.cache.get(this.channel_id)) {
      /**
       * The Channel where the ThreadChannel was created.
       * @type {ForumChannel | TextChannel | VoiceChannel | undefined}
       */
      this.channel = this.client.channels.cache.get(
        this.channel_id
      ) as TextChannel;
    }
    /**
     * The owner id of the ThreadChannel (The owner id means the creator of the ThreadChannel)
     * @type {number}
     */
    this.owner_id = data.owner_id;
    if (this.guild?.members?.cache?.get(this.owner_id)) {
      /**
       * The owner of the ThreadChannel (The owner means the creator of the ThreadChannel)
       * @type {number | undefined}
       */
      this.owner = this.guild.members.cache.get(this.owner_id);
    }
    /**
     * The ThreadMemberManager of the ThreadChannel.
     * @type {ThreadMemberManager}
     */
    this.members = new ThreadMemberManager(this.client, this);
    /**
     * The ChannelMessageManager of the ThreadChannel.
     * @type {ChannelMessageManager}
     */
    this.messages = new ChannelMessageManager(this, this.client);
  }

  /**
   * Edits the ThreadChannel
   * @param {object} obj - The new ThreadChannel Object
   * @returns {Promise<ThreadChannel>}
   * @async
   */

  async leave() {
    const response = await this.client.rest.request(
      "DELETE",
      Endpoints.ChannelThreadMember(this.id, "@me"),
      true
    );

    return response?.error ? response : true;
  }

  async archivedThreads(config: any) {
    config = setObj({ before: null, limit: 5, type: "public" }, config);

    // let endpoint = Endpoints.ChannelThreadsArchived(this.id, config.type);

    // if (config.before) {
    //   // @ts-ignore
    //   endpoint = +`?before=${config.before}`;
    // }
    // if (config.limit) {
    //   endpoint = +config.before
    //     ? `&limit=${config.limit}`
    //     : `?limit=${config.limit}`;
    // }
  }

  async setTags(tagsIds: string[], reason?: string) {
    let tags = this.available_tags;
    if(!tagsIds || !tagsIds.some((id) => typeof id !== "string")) return;

    let combinedTags = Array.from(new Set([...tags, tagsIds]))

    let tagsAsUnion: Record<any, any>[]= []

    for(var id in combinedTags) {
        tagsAsUnion.push({ id: id })
    }

    const result = await this.edit({ //@ts-ignore
        available_tags: tagsAsUnion
    }, reason)

    return result
}
}

export { ThreadChannel };
