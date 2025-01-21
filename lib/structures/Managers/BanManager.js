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
exports.GuildBanManager = void 0;
const Collection_1 = require("../../utils/Collection");
const Endpoints = __importStar(require("../../rest/Endpoints"));
const User_1 = require("../User");
const Member_1 = require("../Member");
const utils_1 = require("../../utils/utils");
class GuildBanManager {
    client;
    /**
     * Represents the Guild bans cache.
     */
    cache;
    /**
     * Represents the guild id.
     */
    id;
    constructor(guild, client) {
        this.client = client;
        this.cache = new Collection_1.Collection();
        this.id = guild.id;
    }
    get guild() {
        return this.client.guilds.cache.get(this.id);
    }
    /**
     * Fetches a guild ban if target is defined, otherwise, it fetches the first 100 bans.
     * @param {Nullable<string>} target - The target id of the ban to fetch.
     * @param {FetchWithLimitAfterAndBefore} [options] - The options of the fetch. (Only when target is not defined.)
     * @returns {Promise<Nullable<RESTResponse | Record<string, any>>> }
     */
    async fetch(target, options) {
        var url;
        if (target) {
            url = Endpoints.GuildBan(this.guild.id, target);
        }
        else {
            url = utils_1.Utilities.buildUrl(Endpoints.GuildBans(this.guild.id), undefined, options);
        }
        const response = await this.client.rest.request("GET", url);
        if (!response || !response?.hasData())
            return response;
        const user = new User_1.User(response.data.user, this.client);
        return { user, reason: response.data?.reason };
    }
    /**
     * Creates a ban in the current guild.
     * @param {string | User | Member} userId - The user to ban.
     * @param {string} [reason] - The reason of the ban.
     * @returns
     */
    async create(userId, reason) {
        const id = userId instanceof User_1.User
            ? userId.id
            : userId instanceof Member_1.Member
                ? userId.user.id
                : userId;
        const response = await this.client.rest.request("PUT", Endpoints.GuildBan(this.guild.id, id), true, undefined, reason);
        return response?.error ? false : true;
    }
    /**
     * Removes a ban in the current guild.
     * @param {string | User | Member} userId - The user to unban.
     * @returns
     */
    async remove(userId) {
        const id = userId instanceof User_1.User
            ? userId.id
            : userId instanceof Member_1.Member
                ? userId.user.id
                : userId;
        const response = await this.client.rest.request("DELETE", Endpoints.GuildBan(this.guild.id, id), true);
        return response?.error ? false : true;
    }
}
exports.GuildBanManager = GuildBanManager;
