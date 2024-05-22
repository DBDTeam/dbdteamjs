import { APIChannel, APIGuildForumTag } from "discord-api-types/v10";
import { type Client } from "../client";
import { Channel } from "./BaseChannel";
import { Nullable } from "../common";
export declare class ForumChannel extends Channel {
    #private;
    last_message_id: Nullable<string>;
    available_tags: APIGuildForumTag[];
    constructor(data: APIChannel, client: Client);
}
