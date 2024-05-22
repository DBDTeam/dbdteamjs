"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumChannel = void 0;
const BaseChannel_1 = require("./BaseChannel");
class ForumChannel extends BaseChannel_1.Channel {
    #data;
    last_message_id;
    constructor(data, client) {
        super(data, client);
        this.#data = data;
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
exports.ForumChannel = ForumChannel;
