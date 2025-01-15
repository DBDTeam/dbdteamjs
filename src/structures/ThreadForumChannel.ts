import { APIThreadMetadata, Snowflake } from "discord-api-types/v10";
import { type Client } from "../client";
import { Message } from "./Message";
import { Guild } from "./Guild";
import { ThreadMember } from "./ThreadMember";
import * as Endpoints from "../rest/Endpoints";
import { ClientTypeError } from "../client/errors/ClientError";
import { ErrorNames } from "../client/errors/ErrorList";
import { GuildChannel } from "./GuildChannel";

export class ForumThreadChannel extends GuildChannel {
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

  async setTags(tagsIds: Snowflake[], reason?: string) {
    if (!tagsIds || !Array.isArray(tagsIds))
      throw new ClientTypeError(
        ErrorNames.InvalidType,
        "Snowflake[]",
        "tagsIds"
      );
    if (!tagsIds || tagsIds.some((id) => typeof id !== "string")) return;

    const result = await this.client.rest.request(
      "PATCH",
      Endpoints.Channel(this.id),
      true,
      { applied_tags: tagsIds },
      reason
    );

    return result;
  }

  async addTags(tagsIds: string[], reason?: string) {
    if (!tagsIds || !Array.isArray(tagsIds))
      throw new ClientTypeError(
        ErrorNames.InvalidType,
        "Snowflake[]",
        "tagsIds"
      );
    if (!tagsIds || tagsIds.some((id) => typeof id !== "string")) return;

    let combinedTags = [... new Set(this.applied_tags.concat(tagsIds))];

    const result = await this.client.rest.request(
      "PATCH",
      Endpoints.Channel(this.id),
      true,
      { applied_tags: combinedTags },
      reason
    );

    return result;
  }

  async removeTags(tagsIds: string[], reason?: string) {
    if (!tagsIds || !Array.isArray(tagsIds))
      throw new ClientTypeError(
        ErrorNames.InvalidType,
        "Snowflake[]",
        "tagsIds"
      );
    if (!tagsIds || tagsIds.some((id) => typeof id !== "string")) return;

    let filteredTags = (this.applied_tags || []).filter(
      (tag) => !tagsIds.includes(tag)
    );

    const result = await this.client.rest.request(
      "PATCH",
      Endpoints.Channel(this.id),
      true,
      { applied_tags: filteredTags },
      reason
    );

    return result;
  }
}
