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
exports.GuildBanManager = void 0;
const Collection_1 = require("../../utils/Collection");
const Endpoints = __importStar(require("../../rest/Endpoints"));
const User_1 = require("../User");
const Member_1 = require("../Member");
class GuildBanManager {
    client;
    cache;
    id;
    constructor(guild, client) {
        this.client = client;
        this.cache = new Collection_1.Collection();
        this.id = guild.id;
    }
    get guild() {
        return this.client.guilds.cache.get(this.id);
    }
    async fetch(target, options) {
        var url = Endpoints.GuildBans(this.guild.id);
        if (target) {
            url += "/" + target;
        }
        const opts = {
            limit: !!options?.limit,
            before: !!options?.before,
            after: !!options?.after,
        };
        if (opts.after) {
            url +=
                (opts.before || opts.limit ? "&" : "?") + "after=" + options?.after;
        }
        if (opts.before) {
            url +=
                (opts.after || opts.limit ? "&" : "?") + "before=" + options?.before;
        }
        if (opts.limit) {
            url +=
                (opts.after || opts.before ? "&" : "?") + "limit=" + options?.limit;
        }
        const response = await this.client.rest.request("GET", url, true);
        if (!response || response?.error || !response.data)
            return response;
        return response.data;
    }
    async create(userId, reason) {
        const id = userId instanceof User_1.User
            ? userId.id
            : userId instanceof Member_1.Member
                ? userId.user.id
                : userId;
        const response = await this.client.rest.request("PUT", Endpoints.GuildBan(this.guild.id, id), true, undefined, reason);
        return response?.error ? false : true;
    }
    async remove(userId, reason) {
        const id = userId instanceof User_1.User
            ? userId.id
            : userId instanceof Member_1.Member
                ? userId.user.id
                : userId;
        const response = await this.client.rest.request("DELETE", Endpoints.GuildBan(this.guild.id, id), true, undefined, reason);
        return response?.error ? false : true;
    }
}
exports.GuildBanManager = GuildBanManager;
