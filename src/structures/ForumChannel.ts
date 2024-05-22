import { APIChannel, APIGuildForumChannel, APIGuildForumTag } from "discord-api-types/v10";
import { type Client } from "../client";
import { Channel } from "./BaseChannel";
import { Nullable } from "../common";

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
        this.default_auto_archive_duration = this.#data.default_auto_archive_duration;
        this.default_forum_layout = this.#data.default_forum_layout;
        this.default_reaction_emoji = this.#data.default_reaction_emoji;
        this.default_sort_order = this.#data.default_sort_order;
        this.default_thread_rate_limit_per_user = this.#data.default_thread_rate_limit_per_user;
        this.rate_limit_per_user = this.#data.rate_limit_per_user;
    }
}