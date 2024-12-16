"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumChannel = void 0;
const BaseChannel_1 = require("./BaseChannel");
const Endpoints = __importStar(require("../rest/Endpoints"));
const ForumThreadPayload_1 = require("./Payloads/ForumThreadPayload");
const ThreadForumChannel_1 = require("./ThreadForumChannel");
class ForumChannel extends BaseChannel_1.Channel {
    #data;
    last_message_id;
    constructor(data, client) {
        super(data, client);
        this.#data = data;
        this.topic = this.#data.topic;
        this.last_message_id = this.#data.last_message_id;
        this.available_tags = this.#data.available_tags;
        this.default_auto_archive_duration =
            this.#data.default_auto_archive_duration;
        this.default_forum_layout = this.#data.default_forum_layout;
        this.default_reaction_emoji = this.#data.default_reaction_emoji;
        this.default_sort_order = this.#data.default_sort_order;
        this.default_thread_rate_limit_per_user =
            this.#data.default_thread_rate_limit_per_user;
        this.rate_limit_per_user = this.#data.rate_limit_per_user;
    }
    async createThread(object) {
        var search = new ForumThreadPayload_1.ForumThreadPayload(object, object?.files);
        var payload = search.payload();
        const result = await this.client.rest.request("POST", Endpoints.ChannelThreads(this.id), true, { data: payload }, object.reason, payload.files);
        if (result?.error || !result?.data)
            return result;
        var thread = new ThreadForumChannel_1.ForumThreadChannel(result.data, this.client);
        return thread;
    }
}
exports.ForumChannel = ForumChannel;
