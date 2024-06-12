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
exports.GuildMemberManager = void 0;
const Collection_1 = require("../../utils/Collection");
const Endpoints = __importStar(require("../../rest/Endpoints"));
const User_1 = require("../User");
const Member_1 = require("../Member");
class GuildMemberManager {
    #client;
    guild;
    guildId;
    cache;
    /**
     * Constructs a new GuildMemberManager instance.
     * @param {Client} client - The client instance to interact with the Discord API.
     * @param {Guild} guild - The guild instance for which to manage members.
     */
    constructor(client, guild) {
        this.#client = client;
        this.guild = guild;
        this.guildId = guild?.id || guild;
        this.cache = new Collection_1.Collection();
    }
    /**
     * Fetches all members of the guild with optional configuration.
     * @param {FetchWithLimitAndAfter} config - The configuration for fetching members, including limit and after.
     * @returns {Promise<Collection<string, Member> | null>} - A collection of members or null if an error occurred.
     */
    async _fetchAllMembers(config) {
        var endpoint = Endpoints.GuildMembers(this.guildId);
        const conditions = {
            limit: config?.limit &&
                Number.isInteger(config?.limit) &&
                (config?.limit >= 1 || config?.limit <= 100),
            after: config?.after && typeof config?.after == "string",
        };
        if (conditions.limit) {
            endpoint += "?limit=" + config?.limit;
        }
        if (conditions.after) {
            endpoint += (conditions.limit ? "&after=" : "?after=") + config.after;
        }
        const response = await this.#client.rest.request("GET", endpoint, true);
        if (!response)
            return null;
        if (response.error) {
            return null;
        }
        else {
            for (var m of response.data) {
                var x = { ...m, id: m.user.id };
                this.cache.set(x.id, new Member_1.Member(x, this.#client.guilds.cache.get(this.guildId) || this.guild, this.#client));
            }
            return this.cache;
        }
    }
    /**
     * Fetches a member by their ID or fetches all members if an object is provided.
     * @param {string | Record<string, any>} memberId - The ID of the member to fetch or a configuration object.
     * @returns {Promise<Nullable<Member | ErrorResponseFromApi | Collection<string, Member>>>} - The fetched member or collection of members, or null if an error occurred.
     */
    async fetch(memberId) {
        if (typeof memberId === "string") {
            const result = await this.#client.rest.request("GET", Endpoints.GuildMember(this.guildId, memberId), true);
            if (!result)
                return null;
            if (result?.error) {
                return result;
            }
            else {
                if (!result.data)
                    return null;
                var x = {
                    ...result.data,
                    id: result.data.user.id,
                };
                this.#client.users.cache.set(x.id, new User_1.User(x.user, this.#client));
                var m = new Member_1.Member(x, this.#client.guilds.cache.get(this.guildId) || this.guild, this.#client);
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
    /**
     * Gets the client user as a member of the guild.
     * @returns {Nullable<Member | unknown>} - The member instance or null if not found, or an error if an error occurred.
     */
    get me() {
        try {
            if (!this.#client.user)
                return null;
            var member = this.cache.get(this.#client.user.id);
            return member;
        }
        catch (err) {
            return err;
        }
    }
}
exports.GuildMemberManager = GuildMemberManager;
