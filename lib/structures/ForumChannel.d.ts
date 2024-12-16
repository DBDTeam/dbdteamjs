import { APIGuildForumChannel, APIGuildForumTag, RESTPostAPIGuildForumThreadsJSONBody } from "discord-api-types/v10";
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
    constructor(data: APIGuildForumChannel, client: Client);
    /**
     * Creates a new thread in the forum channel.
     *
     * @param {RESTPostAPIGuildForumThreadsJSONBody} object - The data required to create a new forum thread, including optional files and a reason.
     * @param {string} [reason] - Optional reason.
     * @returns {Promise<ErrorResponseFromApi | ForumThreadChannel>} A promise that resolves to either an `ErrorResponseFromApi` if an error occurs, or a `ForumThreadChannel` representing the newly created thread.
     */
    createThread(object: RESTPostAPIGuildForumThreadsJSONBody & {
        files?: MessagePayloadFileData[];
        reason?: string;
    }): Promise<ErrorResponseFromApi | ForumThreadChannel>;
}
