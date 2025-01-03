import { RESTPostAPIGuildForumThreadsJSONBody, Snowflake } from "discord-api-types/v10";
import { MessagePayloadFileData } from "../../common/interfaces/message/MessagePayload";
import { MessageBodyRequest, Nullable } from "../../common";

export class ForumThreadPayload {
  name: string;
  auto_archieve_duration: Nullable<number>;
  rate_limit_per_user: Nullable<number>;
  message: MessageBodyRequest;
  applied_tags: Nullable<Snowflake[]>;
  files: Nullable<MessagePayloadFileData[]>;
  constructor(
    object: RESTPostAPIGuildForumThreadsJSONBody,
    files?: MessagePayloadFileData[]
  ) {
    this.name = object.name;
    this.auto_archieve_duration = object.auto_archive_duration ?? 0;
    this.rate_limit_per_user = object.rate_limit_per_user ?? 0;
    this.message = object.message;
    this.files = files || [];
    this.applied_tags = object.applied_tags || [];
  }

  payload() {
    return this
  }
}
