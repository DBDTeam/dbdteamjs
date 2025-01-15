import {
  APIGuildForumChannel,
  APIGuildForumDefaultReactionEmoji,
  APIGuildForumTag,
  ForumLayoutType,
  RESTPostAPIChannelThreadsResult,
  RESTPostAPIGuildForumThreadsJSONBody,
  SortOrderType,
  ThreadAutoArchiveDuration,
} from "discord-api-types/v10";
import { type Client } from "../client";
import { Channel } from "./BaseChannel";
import { Nullable } from "../common";
import * as Endpoints from "../rest/Endpoints";
import { ForumThreadPayload } from "./Payloads/ForumThreadPayload";
import { MessagePayloadFileData } from "../common/interfaces/message/MessagePayload";
import { ForumThreadChannel } from "./ThreadForumChannel";
import { RESTResponse } from "../rest/requestHandler";
import { GuildChannel } from "./GuildChannel";

export class ForumChannel extends GuildChannel {
  #data: APIGuildForumChannel;
  last_message_id: Nullable<string>;
  declare available_tags: APIGuildForumTag[];
  topic: Nullable<string>
  default_auto_archive_duration: Nullable<ThreadAutoArchiveDuration>
  default_forum_layout: ForumLayoutType
  default_reaction_emoji: Nullable<APIGuildForumDefaultReactionEmoji>
  default_sort_order: Nullable<SortOrderType>
  default_thread_rate_limit_per_user: Nullable<number>
  rate_limit_per_user: Nullable<number>
  constructor(data: APIGuildForumChannel, client: Client) {
    super(data, client);
    this.#data = data;
    this.topic = this.#data.topic;
    this.available_tags = this.#data.available_tags;
    this.default_auto_archive_duration =
      this.#data.default_auto_archive_duration;
    this.default_forum_layout = this.#data.default_forum_layout;
    this.default_reaction_emoji = this.#data.default_reaction_emoji;
    this.default_sort_order = this.#data.default_sort_order;
    this.default_thread_rate_limit_per_user =
      this.#data.default_thread_rate_limit_per_user;
    this.rate_limit_per_user = this.#data.rate_limit_per_user;
  }
  /**
   * Creates a new thread in the forum channel.
   *
   * @param {RESTPostAPIGuildForumThreadsJSONBody} object - The data required to create a new forum thread, including optional files and a reason.
   * @param {string} [reason] - Optional reason.
   * @returns {Promise<ErrorResponseFromApi | ForumThreadChannel>} A promise that resolves to either an `ErrorResponseFromApi` if an error occurs, or a `ForumThreadChannel` representing the newly created thread.
   */
  async createThread(
    object: RESTPostAPIGuildForumThreadsJSONBody & {
      files?: MessagePayloadFileData[];
      reason?: string;
    }
  ): Promise<RESTResponse | ForumThreadChannel> {
    var search = new ForumThreadPayload(object, object?.files);
    var payload = search.payload();
    const result = await this.client.rest.request<RESTPostAPIChannelThreadsResult>(
      "POST",
      Endpoints.ChannelThreads(this.id),
      true,
      payload,
      object.reason,
      payload.files
    );

    if (result?.error || !result?.error) return result as RESTResponse;

    var thread = new ForumThreadChannel(result, this.client);

    return thread;
  }
}
