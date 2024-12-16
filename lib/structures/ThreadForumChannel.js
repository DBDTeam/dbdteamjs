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
exports.ForumThreadChannel = void 0;
const BaseChannel_1 = require("./BaseChannel");
const Message_1 = require("./Message");
const ThreadMember_1 = require("./ThreadMember");
const Endpoints = __importStar(require("../rest/Endpoints"));
class ForumThreadChannel extends BaseChannel_1.Channel {
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
        if (!tagsIds || tagsIds.some((id) => typeof id !== "string"))
            return;
        const result = await this.client.rest.request("PATCH", Endpoints.Channel(this.id), true, { data: { applied_tags: tagsIds } }, reason);
        return result;
    }
    async addTags(tagsIds, reason) {
        if (!tagsIds || tagsIds.some((id) => typeof id !== "string"))
            return;
        let combinedTags = Array.from(new Set([...tagsIds, ...this.applied_tags]));
        const result = await this.client.rest.request("PATCH", Endpoints.Channel(this.id), true, { data: { applied_tags: combinedTags } }, reason);
        return result;
    }
    async removeTags(tagsIds, reason) {
        if (!tagsIds || tagsIds.some((id) => typeof id !== "string"))
            return;
        let filteredTags = (this.applied_tags || []).filter((tag) => !tagsIds.includes(tag));
        const result = await this.client.rest.request("PATCH", Endpoints.Channel(this.id), true, { data: { applied_tags: filteredTags } }, reason);
        return result;
    }
}
exports.ForumThreadChannel = ForumThreadChannel;
