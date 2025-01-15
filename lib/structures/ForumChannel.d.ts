import { APIGuildForumChannel, APIGuildForumDefaultReactionEmoji, APIGuildForumTag, ForumLayoutType, RESTPostAPIGuildForumThreadsJSONBody, SortOrderType, ThreadAutoArchiveDuration } from "discord-api-types/v10";
import { type Client } from "../client";
import { Nullable } from "../common";
import { MessagePayloadFileData } from "../common/interfaces/message/MessagePayload";
import { ForumThreadChannel } from "./ThreadForumChannel";
import { RESTResponse } from "../rest/requestHandler";
import { GuildChannel } from "./GuildChannel";
export declare class ForumChannel extends GuildChannel {
    #private;
    last_message_id: Nullable<string>;
    available_tags: APIGuildForumTag[];
    topic: Nullable<string>;
    default_auto_archive_duration: Nullable<ThreadAutoArchiveDuration>;
    default_forum_layout: ForumLayoutType;
    default_reaction_emoji: Nullable<APIGuildForumDefaultReactionEmoji>;
    default_sort_order: Nullable<SortOrderType>;
    default_thread_rate_limit_per_user: Nullable<number>;
    rate_limit_per_user: Nullable<number>;
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
    }): Promise<RESTResponse | ForumThreadChannel>;
}
