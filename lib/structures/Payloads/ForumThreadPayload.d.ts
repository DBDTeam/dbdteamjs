import { RESTPostAPIGuildForumThreadsJSONBody, Snowflake } from "discord-api-types/v10";
import { MessagePayloadFileData } from "../../common/interfaces/message/MessagePayload";
import { MessageBodyRequest, Nullable } from "../../common";
export declare class ForumThreadPayload {
    name: string;
    auto_archieve_duration: Nullable<number>;
    rate_limit_per_user: Nullable<number>;
    message: MessageBodyRequest;
    applied_tags: Nullable<Snowflake[]>;
    files: Nullable<MessagePayloadFileData[]>;
    constructor(object: RESTPostAPIGuildForumThreadsJSONBody, files?: MessagePayloadFileData[]);
    payload(): this;
}
