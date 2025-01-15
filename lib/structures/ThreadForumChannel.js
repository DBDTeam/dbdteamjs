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
exports.ForumThreadChannel = void 0;
const Message_1 = require("./Message");
const ThreadMember_1 = require("./ThreadMember");
const Endpoints = __importStar(require("../rest/Endpoints"));
const ClientError_1 = require("../client/errors/ClientError");
const ErrorList_1 = require("../client/errors/ErrorList");
const GuildChannel_1 = require("./GuildChannel");
class ForumThreadChannel extends GuildChannel_1.GuildChannel {
    thread_metadata;
    message_count;
    member_count;
    total_messages_sent;
    applied_tags;
    member;
    message;
    constructor(data, client) {
        super(data, client);
        this.thread_metadata = data.thread_metadata;
        this.message_count = data.message_count;
        this.member_count = data.member_count;
        this.total_messages_sent = data.total_messages_sent;
        this.applied_tags = data.applied_tags;
        this.member = new ThreadMember_1.ThreadMember(data.member, this.guild, this.client);
        if (("message" in data && data.message !== null) ||
            data.message !== undefined) {
            this.message = new Message_1.Message(data.message, this.client);
        }
    }
    async setTags(tagsIds, reason) {
        if (!tagsIds || !Array.isArray(tagsIds))
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "Snowflake[]", "tagsIds");
        if (!tagsIds || tagsIds.some((id) => typeof id !== "string"))
            return;
        const result = await this.client.rest.request("PATCH", Endpoints.Channel(this.id), true, { applied_tags: tagsIds }, reason);
        return result;
    }
    async addTags(tagsIds, reason) {
        if (!tagsIds || !Array.isArray(tagsIds))
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "Snowflake[]", "tagsIds");
        if (!tagsIds || tagsIds.some((id) => typeof id !== "string"))
            return;
        let combinedTags = [...new Set(this.applied_tags.concat(tagsIds))];
        const result = await this.client.rest.request("PATCH", Endpoints.Channel(this.id), true, { applied_tags: combinedTags }, reason);
        return result;
    }
    async removeTags(tagsIds, reason) {
        if (!tagsIds || !Array.isArray(tagsIds))
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "Snowflake[]", "tagsIds");
        if (!tagsIds || tagsIds.some((id) => typeof id !== "string"))
            return;
        let filteredTags = (this.applied_tags || []).filter((tag) => !tagsIds.includes(tag));
        const result = await this.client.rest.request("PATCH", Endpoints.Channel(this.id), true, { applied_tags: filteredTags }, reason);
        return result;
    }
}
exports.ForumThreadChannel = ForumThreadChannel;
