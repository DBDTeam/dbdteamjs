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
exports.GuildMemberManager = exports.UserManager = void 0;
const Collection_1 = require("../../utils/Collection");
const Endpoints = __importStar(require("../../rest/Endpoints"));
const User_1 = require("../User");
const Member_1 = require("../Member");
class UserManager {
    client;
    cache;
    constructor(client) {
        this.client = client;
        this.cache = new Collection_1.Collection();
    }
    async fetch(userId) {
        const result = await this.client.rest.request("GET", Endpoints.User(userId), true);
        if (result?.error || !result || !result?.data) {
            return result;
        }
        else {
            var x = new User_1.User(result.data, this.client);
            this.cache.set(result.data.id, x);
            return x;
        }
    }
}
exports.UserManager = UserManager;
class GuildMemberManager {
    client;
    guild;
    guildId;
    cache;
    constructor(client, guild) {
        this.client = client;
        this.guild = guild;
        this.guildId = guild?.id || guild;
        this.cache = new Collection_1.Collection();
    }
    async _fetchAllMembers(obj) {
        var endpoint = Endpoints.GuildMembers(this.guildId);
        const conditions = {
            limit: obj?.limit &&
                Number.isInteger(obj?.limit) &&
                (obj?.limit >= 1 || obj?.limit <= 100),
            after: obj?.after && typeof obj?.after == "string",
        };
        if (conditions.limit) {
            endpoint += "?limit=" + obj?.limit;
        }
        if (conditions.after) {
            endpoint += (conditions.limit ? "&after=" : "?after=") + obj.after;
        }
        const response = await this.client.rest.request("GET", endpoint, true);
        if (response?.error || !response || response?.data) {
            return null;
        }
        else {
            for (var m of response.data) {
                var x = { ...m, id: m.user.id };
                this.cache.set(x.id, new Member_1.Member(x, this.client.guilds.cache.get(this.guildId) || this.guild, this.client));
            }
            return this.cache;
        }
    }
    async fetch(memberId) {
        if (typeof memberId === "string") {
            const result = await this.client.rest.request("GET", Endpoints.GuildMember(this.guildId, memberId), true);
            if (result?.error || !result || !result?.data) {
                return result;
            }
            else {
                var x = { ...result.data, id: result.data.user.id };
                this.client.users.cache.set(x.id, new User_1.User(x.user, this.client));
                var m = new Member_1.Member(x, this.client.guilds.cache.get(this.guildId) || this.guild, this.client);
                this.cache.set(x.id, m);
                return m;
            }
        }
        else if (typeof memberId === "object" ||
            memberId === null ||
            memberId === undefined) {
            return await this._fetchAllMembers(memberId || {});
        }
    }
    get me() {
        try {
            if (!this.client.user)
                return null;
            var member = this.cache.get(this.client.user.id);
            return member;
        }
        catch (err) {
            return err;
        }
    }
}
exports.GuildMemberManager = GuildMemberManager;
