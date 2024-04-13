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
exports.ThreadMemberManager = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Collection_1 = require("../../utils/Collection");
const ThreadMember_1 = require("../ThreadMember");
class ThreadMemberManager {
    client;
    id;
    guild;
    memberCount;
    cache;
    constructor(client, thread) {
        this.id = thread.id;
        this.guild = thread.guild;
        this.client = client;
        this.memberCount = 0;
        this.cache = new Collection_1.Collection();
    }
    async _fetchAllMembersInThread(obj) {
        var endpoint = Endpoints.ChannelThreadMembers(this.id) + `?with_member=true`;
        if (obj?.limit &&
            Number.isInteger(obj?.limit) &&
            (obj?.limit >= 1 || obj?.limit <= 100)) {
            endpoint += "&limit=" + obj?.limit;
        }
        if (obj?.after && typeof obj?.after == "string") {
            endpoint += "&after=" + obj?.after;
        }
        if (obj?.before && typeof obj?.before == "string") {
            endpoint += "&before=" + obj?.before;
        }
        const response = await this.client.rest.request("GET", endpoint, true);
        if (response?.error || !response || !response.data) {
            return null;
        }
        else {
            for (var m of response.data) {
                var x = new ThreadMember_1.ThreadMember(m, this.guild, this.client);
                this.cache.set(x.id, x);
            }
            return this.cache;
        }
    }
    async fetch(memberId) {
        if (typeof memberId === "string") {
            const result = await this.client.rest.request("GET", Endpoints.ChannelThreadMember(this.id, memberId));
            if (result?.error || !result) {
                return result;
            }
            else {
                var x = new ThreadMember_1.ThreadMember(result.data, this.guild, this.client);
                this.cache.set(x.id, x);
                return x;
            }
        }
        else if (typeof memberId === "object" ||
            memberId === null ||
            memberId === undefined) {
            return await this._fetchAllMembersInThread(memberId || {});
        }
    }
    async remove(memberId) {
        const response = await this.client.rest.request("DELETE", Endpoints.ChannelThreadMember(this.id, memberId), true);
        return response;
    }
}
exports.ThreadMemberManager = ThreadMemberManager;
