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
exports.GuildRolesManager = exports.MemberRolesManager = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Collection_1 = require("../../utils/Collection");
const utils_1 = require("../../utils/utils");
const Role_1 = require("../Role");
/**
 * Manages the roles of a member in a guild.
 */
class MemberRolesManager {
    #client;
    guild;
    member;
    cache;
    /**
     * Constructs a new MemberRolesManager.
     * @param guild - The guild the member belongs to.
     * @param member - The member whose roles are being managed.
     * @param client - The client instance.
     */
    constructor(guild, member, client) {
        this.guild = guild;
        this.member = member;
        this.#client = client;
        this.cache = new Collection_1.Collection();
        this.#patch();
    }
    /**
     * Patches the cache with the member's roles.
     */
    #patch() {
        for (var i in this.member.role_ids) {
            if (!this.guild?.roles)
                return null;
            var roleFound = this.guild.roles.cache.get(this.member.role_ids[i]);
            if (roleFound instanceof Role_1.GuildRole) {
                this.cache.set(roleFound.id, roleFound);
            }
        }
    }
    /**
     * Adds roles to a member.
     * @param addObject - An object containing roles to add and a reason.
     * @returns An object containing errors and success responses.
     */
    async add(addObject) {
        var roles = addObject.roles;
        var reason = addObject.reason;
        var errors = [];
        var success = [];
        for (var i in roles) {
            var response = await this.#client.rest.request("PUT", Endpoints.GuildMemberRole(this.guild.id, this.member.id, roles[i]), true, {}, reason);
            if (!response)
                return null;
            if (response.error) {
                errors.push(response);
            }
            else {
                success.push(response);
            }
        }
        return {
            error: errors,
            success,
        };
    }
    /**
     * Removes roles from a member.
     * @param removeObject - An object containing roles to remove and a reason.
     * @returns An object containing errors and success responses.
     */
    async remove(removeObject) {
        var roles = removeObject.roles;
        var reason = removeObject.reason;
        var errors = [];
        var success = [];
        for (var i in roles) {
            var response = await this.#client.rest.request("DELETE", Endpoints.GuildMemberRole(this.guild.id, this.member.id, roles[i]), true, {}, reason);
            if (!response)
                return null;
            if (response.error) {
                errors.push(response);
            }
            else {
                success.push(response);
            }
        }
        return { error: errors, success };
    }
    /**
     * Fetches roles of a member.
     * @param roleId - The role ID to fetch, or null to fetch all roles.
     * @returns A collection of guild roles or null if not found.
     */
    async fetch(roleId = null) {
        if (!this.guild.roles)
            return null;
        var response = await this.guild.roles.fetch(roleId);
        if (!response)
            return null;
        var check = response;
        if (!check.error) {
            if (response instanceof Collection_1.Collection) {
                var i = response
                    .toJSON()
                    .filter((i) => this.member?.role_ids?.includes(i.id));
                for (var x of i) {
                    this.cache.set(x.id, x);
                }
                response = this.cache;
            }
        }
        return response;
    }
}
exports.MemberRolesManager = MemberRolesManager;
/**
 * Manages the roles in a guild.
 */
class GuildRolesManager {
    #client;
    guild;
    cache;
    /**
     * Constructs a new GuildRolesManager.
     * @param guild - The guild whose roles are being managed.
     * @param client - The client instance.
     */
    constructor(guild, client) {
        this.#client = client;
        this.guild = guild;
        this.cache = new Collection_1.Collection();
    }
    /**
     * Fetches roles from the guild.
     * @param roleId - The role ID to fetch, or null to fetch all roles.
     * @returns A collection of guild roles, a single guild role, or an error response.
     */
    async fetch(roleId) {
        const response = await this.#client.rest.request("GET", Endpoints.GuildRoles(this.guild.id), true);
        if (!response || !response.data)
            return this.cache;
        var r;
        var _allGuildRoles = response.data;
        for (var i of _allGuildRoles) {
            var x = new Role_1.GuildRole(i, this.guild, this.#client);
            this.cache.set(i.id, x);
            if (roleId == i.id) {
                r = x;
            }
        }
        return r;
    }
    /**
     * Deletes roles from the guild.
     * @param deleteObject - An object containing roles to delete and a reason.
     * @returns An object containing errors and success responses or the current cache.
     */
    async delete(deleteObject) {
        var roles = deleteObject.roles;
        var reason = deleteObject.reason;
        var errors = [];
        var success = [];
        for (var i in roles) {
            var response = await this.#client.rest.request("DELETE", Endpoints.GuildRole(this.guild.id, roles[i]), true, {}, reason);
            if (!response)
                return this.cache;
            if (response.error) {
                errors.push(response);
            }
            else {
                success.push(response);
            }
        }
        return { error: errors, success };
    }
    /**
     * Creates a new role in the guild.
     * @param createObject - An object containing the role creation data.
     * @returns The created role data or an error response.
     */
    async create(createObject) {
        const base = {
            name: "New Role",
            permissions: "0",
            color: 0,
            hoist: false,
            icon: null,
            unicode_emoji: null,
            mentionable: false,
            reason: null,
        };
        var data = (0, utils_1.setObj)(base, createObject, { unicode_emoji: "unicodeEmoji" });
        var reason = data.reason;
        delete data.reason;
        const response = await this.#client.rest.request("POST", Endpoints.GuildRoles(this.guild.id), true, { data }, reason);
        if (!response)
            return null;
        if (response.error) {
            return response;
        }
        else {
            if (!response.data)
                return null;
            this.cache.set(response.data.id, new Role_1.GuildRole(response.data, this.guild.id, this.#client));
            return response.data;
        }
    }
}
exports.GuildRolesManager = GuildRolesManager;
