import { APIChannel, APIGuildForumTag, RESTPostAPIGuildForumThreadsJSONBody } from "discord-api-types/v10";
import { type Client } from "../client";
import { Channel } from "./BaseChannel";
import { Nullable } from "../common";
import { MessagePayloadFileData } from "../interfaces/message/MessagePayload";
import { ForumThreadChannel } from "./ThreadForumChannel";
import { ErrorResponseFromApi } from "../interfaces/rest/requestHandler";
export declare class ForumChannel extends Channel {
    #private;
    last_message_id: Nullable<string>;
    available_tags: APIGuildForumTag[];
    constructor(data: APIChannel, client: Client);
    createThread(object: RESTPostAPIGuildForumThreadsJSONBody & {
        files?: MessagePayloadFileData[];
        reason?: string;
    }): Promise<ErrorResponseFromApi | ForumThreadChannel>;
}
