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
exports.ApplicationCommandManager = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Collection_1 = require("../../utils/Collection");
const utils_1 = require("../../utils/utils");
const Data = {
    name: "",
    name_localizations: null,
    type: 1,
    guild_id: null,
    description: null,
    description_localizations: null,
    options: null,
    default_member_permissions: null,
    dm_permission: null,
    default_permission: null,
    nsfw: null,
};
const Mapping = {
    default_member_permissions: [
        "defaultMemberPermissions",
        "defaultMemberPerms",
    ],
    default_permission: ["defaultPermissions", "defaultPerms"],
    name_localizations: ["nameLocalizations", "nameDictionary"],
    description_localizations: [
        "descriptionLocalizations",
        "descriptionDictionary",
    ],
    dm_permission: "dmPermission",
};
class ApplicationCommandManager {
    #client;
    /**
     * The current target to add commands. ("global" for add in all guilds.)
     */
    target;
    /**
     * The cache of the commands that are already created. (only if they are created in the same sesion as the client is.)
     */
    cache;
    constructor(client, guildId = "global") {
        this.#client = client;
        this.target = guildId || "global";
        this.cache = new Collection_1.Collection();
    }
    /**
     * Creates a command in the current target.
     * @param {ApplicationCommand} body - The body of the new application command.
     * @returns {}
     */
    async add(body) {
        var data = (0, utils_1.setObj)(Data, body, Mapping);
        if (!this.#client.user)
            return;
        if (this.target !== "global") {
            var response = await this.#client.rest.request("POST", Endpoints.ApplicationGuildCommands(this.#client.user.id, this.target), true, { data });
        }
        else {
            var response = await this.#client.rest.request("POST", Endpoints.ApplicationCommands(this.#client.user.id), true, { data });
        }
        if (!response)
            return null;
        if (response.error) {
            return response;
        }
        else {
            this.cache.set(response.data?.id, response.data);
            return this.cache.get(response.data?.id);
        }
    }
    /**
     * Fetches a application command with their id.
     * @param {string} id - The ID of the application command to fetch.
     * @returns {Promise<Nullable<ErrorResponseFromApi | APIApplicationCommand>>}
     */
    async fetch(id) {
        if (!this.#client.user)
            return;
        if (this.target !== "global") {
            var response = await this.#client.rest.request("GET", Endpoints.ApplicationGuildCommand(this.#client.user.id, this.target, id), true);
        }
        else {
            var response = await this.#client.rest.request("GET", Endpoints.ApplicationCommand(this.#client.user.id, id), true);
        }
        if (!response)
            return null;
        if (response.error) {
            return response;
        }
        else {
            this.cache.set(response.data?.id, response.data);
            return this.cache.get(response.data?.id);
        }
    }
    async set(commands) {
        // Reference: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
        if (commands instanceof Array) {
            var data = [];
            for (var i of commands) {
                data.push((0, utils_1.setObj)(Data, i, Mapping));
            }
            if (!this.#client.user)
                return;
            if (this.target !== "global") {
                var response = await this.#client.rest.request("PUT", Endpoints.ApplicationGuildCommands(this.#client.user.id, this.target), true, { data });
            }
            else {
                var response = await this.#client.rest.request("PUT", Endpoints.ApplicationCommands(this.#client.user.id), true, { data });
            }
            if (!response)
                return null;
            if (response.error) {
                return response;
            }
            else {
                for (const i of response.data) {
                    if (!i || typeof i !== "object")
                        continue;
                    this.cache.set(i.id, i);
                }
            }
            return this.cache;
        }
        else {
            return null;
        }
    }
    /**
     * Removes a application command with their ID.
     * @param {string} id - The application command id to remove.
     * @returns {Promise<Nullable<ErrorResponseFromApi | boolean>>}
     */
    async remove(id) {
        if (!this.#client.user)
            return;
        if (this.target !== "global") {
            var response = await this.#client.rest.request("DELETE", Endpoints.ApplicationGuildCommand(this.#client.user.id, this.target, id), true);
        }
        else {
            var response = await this.#client.rest.request("DELETE", Endpoints.ApplicationCommand(this.#client.user.id, id), true);
        }
        if (!response)
            return null;
        if (!response?.error) {
            return response;
        }
        return response?.error ? false : true;
    }
}
exports.ApplicationCommandManager = ApplicationCommandManager;
