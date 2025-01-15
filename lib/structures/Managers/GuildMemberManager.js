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
exports.GuildMemberManager = void 0;
const Collection_1 = require("../../utils/Collection");
const Endpoints = __importStar(require("../../rest/Endpoints"));
const User_1 = require("../User");
const Member_1 = require("../Member");
const ClientError_1 = require("../../client/errors/ClientError");
const ErrorList_1 = require("../../client/errors/ErrorList");
const utils_1 = require("../../utils/utils");
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
    async #fetchAllMembers(config) {
        const endpoint = Endpoints.GuildMembers(this.guildId);
        const url = utils_1.Utilities.buildUrl(endpoint, '', config);
        const response = await this.#client.rest.request("GET", url);
        if (!response || response.error)
            return null;
        var fetched = new Collection_1.Collection();
        for (let memberData of response) {
            const userData = { ...memberData, id: memberData.user?.id };
            const member = new Member_1.Member(userData, this.#client.guilds.cache.get(this.guildId) || this.guild, this.#client);
            fetched.set(userData.id, member);
            this.cache.set(userData.id, member);
        }
        return fetched;
    }
    /**
     * Fetches a member by their ID or fetches all members if an object is provided.
     * @param {string | FetchWithLimitAndAfter} memberId - The ID of the member to fetch or a configuration object.
     * @returns {Promise<Nullable<Member | ErrorResponseFromApi | Collection<string, Member>>>} - The fetched member or collection of members, or null if an error occurred.
     */
    async fetch(memberId) {
        if (typeof memberId === "string") {
            const result = await this.#client.rest.request("GET", Endpoints.GuildMember(this.guildId, memberId));
            if (!result || result?.error)
                return result;
            const { user } = result;
            const userData = { ...result, id: user.id };
            this.#client.users.cache.set(userData.id, new User_1.User(user, this.#client));
            const member = new Member_1.Member(userData, this.#client.guilds.cache.get(this.guildId) || this.guild, this.#client);
            this.cache.set(userData.id, member);
            return member;
        }
        else {
            return await this.#fetchAllMembers(memberId || {});
        }
    }
    /**
     * Gets the client user as a member of the guild.
     * @returns {Member} - The member instance or null if not found, or an error if an error occurred.
     */
    get me() {
        const member = this.cache.get(this.#client.user.id);
        if (!member)
            throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.GuildMemberMeUncached);
        return member;
    }
}
exports.GuildMemberManager = GuildMemberManager;
