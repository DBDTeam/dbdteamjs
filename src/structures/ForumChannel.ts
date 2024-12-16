import {
  APIChannel,
  APIGuildForumChannel,
  APIGuildForumTag,
  RESTPostAPIGuildForumThreadsJSONBody,
} from "discord-api-types/v10";
import { type Client } from "../client";
import { Channel } from "./BaseChannel";
import { Nullable } from "../common";
import * as Endpoints from "../rest/Endpoints";
import { ForumThreadPayload } from "./Payloads/ForumThreadPayload";
import { MessagePayloadFileData } from "../interfaces/message/MessagePayload";
import { ForumThreadChannel } from "./ThreadForumChannel";
import { ErrorResponseFromApi } from "../interfaces/rest/requestHandler";

export class ForumChannel extends Channel {
  #data: APIGuildForumChannel;
  last_message_id: Nullable<string>;
  declare available_tags: APIGuildForumTag[];
  constructor(data: APIChannel, client: Client) {
    super(data, client);
    this.#data = data as APIGuildForumChannel;
    this.topic = this.#data.topic;
    this.last_message_id = this.#data.last_message_id;
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
  async createThread(
    object: RESTPostAPIGuildForumThreadsJSONBody & {
      files?: MessagePayloadFileData[];
      reason?: string;
    }
  ): Promise<ErrorResponseFromApi | ForumThreadChannel> {
    var search = new ForumThreadPayload(object, object?.files);
    var payload = search.payload();
    const result = await this.client.rest.request(
      "POST",
      Endpoints.ChannelThreads(this.id),
      true,
      { data: payload },
      object.reason,
      payload.files
    );

    if (result?.error || !result?.data) return result as ErrorResponseFromApi;

    var thread = new ForumThreadChannel(result.data, this.client);

    return thread;
  }
}
