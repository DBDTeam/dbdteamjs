import { APIThreadMetadata, Snowflake } from "discord-api-types/v10";
import { type Client } from "../client";
import { Channel } from "./BaseChannel";
import { Message } from "./Message";
import { Guild } from "./Guild";
import { ThreadMember } from "./ThreadMember";
import * as Endpoints from "../rest/Endpoints";

export class ForumThreadChannel extends Channel {
  thread_metadata: APIThreadMetadata;
  message_count: number;
  member_count: number;
  total_messages_sent: number;
  applied_tags: Snowflake[];
  member: ThreadMember;
  message?: Message;
  constructor(data: any, client: Client) {
    super(data, client);
    this.thread_metadata = data.thread_metadata;
    this.message_count = data.message_count;
    this.member_count = data.member_count;
    this.total_messages_sent = data.total_messages_sent;
    this.applied_tags = data.applied_tags;
    this.member = new ThreadMember(
      data.member,
      this.guild as Guild,
      this.client
    );
    if (
      ("message" in data && data.message !== null) ||
      data.message !== undefined
    ) {
      this.message = new Message(data.message, this.client);
    }
  }

  async setTags(tagsIds: string[], reason?: string) {
    if (!tagsIds || tagsIds.some((id) => typeof id !== "string")) return;

    const result = await this.client.rest.request(
      "PATCH",
      Endpoints.Channel(this.id),
      true,
      { data: { applied_tags: tagsIds } },
      reason
    );

    return result;
  }

  async addTags(tagsIds: string[], reason?: string) {
    if (!tagsIds || tagsIds.some((id) => typeof id !== "string")) return;

    let combinedTags = Array.from(new Set([...tagsIds, ...this.applied_tags]));

    const result = await this.client.rest.request(
      "PATCH",
      Endpoints.Channel(this.id),
      true,
      { data: { applied_tags: combinedTags } },
      reason
    );

    return result;
  }

  async removeTags(tagsIds: string[], reason?: string) {
    if (!tagsIds || tagsIds.some((id) => typeof id !== "string")) return;

    let filteredTags = (this.applied_tags || []).filter(
      (tag) => !tagsIds.includes(tag)
    );

    const result = await this.client.rest.request(
      "PATCH",
      Endpoints.Channel(this.id),
      true,
      { data: { applied_tags: filteredTags } },
      reason
    );

    return result;
  }
}
