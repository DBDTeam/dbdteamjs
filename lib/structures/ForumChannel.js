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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumChannel = void 0;
const Endpoints = __importStar(require("../rest/Endpoints"));
const ForumThreadPayload_1 = require("./Payloads/ForumThreadPayload");
const ThreadForumChannel_1 = require("./ThreadForumChannel");
const GuildChannel_1 = require("./GuildChannel");
class ForumChannel extends GuildChannel_1.GuildChannel {
    #data;
    last_message_id;
    topic;
    default_auto_archive_duration;
    default_forum_layout;
    default_reaction_emoji;
    default_sort_order;
    default_thread_rate_limit_per_user;
    rate_limit_per_user;
    constructor(data, client) {
        super(data, client);
        this.#data = data;
        this.topic = this.#data.topic;
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
    /**
     * Creates a new thread in the forum channel.
     *
     * @param {RESTPostAPIGuildForumThreadsJSONBody} object - The data required to create a new forum thread, including optional files and a reason.
     * @param {string} [reason] - Optional reason.
     * @returns {Promise<ErrorResponseFromApi | ForumThreadChannel>} A promise that resolves to either an `ErrorResponseFromApi` if an error occurs, or a `ForumThreadChannel` representing the newly created thread.
     */
    async createThread(object) {
        var search = new ForumThreadPayload_1.ForumThreadPayload(object, object?.files);
        var payload = search.payload();
        const result = await this.client.rest.request("POST", Endpoints.ChannelThreads(this.id), true, payload, object.reason, payload.files);
        if (result?.error || !result?.error)
            return result;
        var thread = new ThreadForumChannel_1.ForumThreadChannel(result, this.client);
        return thread;
    }
}
exports.ForumChannel = ForumChannel;
