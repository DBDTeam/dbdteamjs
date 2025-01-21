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
exports.ApplicationCommandManager = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Collection_1 = require("../../utils/Collection");
const ClientError_1 = require("../../client/errors/ClientError");
const ErrorList_1 = require("../../client/errors/ErrorList");
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
        if (!body || typeof body !== "object")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "APIApplicationCommand", "body");
        if (!this.#client.user)
            return;
        body = Array.isArray(body) ? body : [body];
        const combined = body.concat(this.cache.toJSON());
        return await this.set(combined);
    }
    /**
     * Fetches a application command with their id.
     * @param {string} id - The ID of the application command to fetch.
     * @returns {Promise<Nullable<RESTResponse | APIApplicationCommand>>}
     */
    async fetch(id) {
        if (!id && typeof id !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "id");
        if (!this.#client.user)
            return;
        var response = await this.#client.rest.request("GET", this.target === "global"
            ? Endpoints.ApplicationCommand(this.#client.user.id, id)
            : Endpoints.ApplicationGuildCommand(this.#client.user.id, this.target, id), true);
        if (!response)
            return null;
        if (!response.hasData())
            return response;
        this.cache.set(response.data.id, response.data);
        return this.cache.get(response.data.id);
    }
    async set(commands) {
        if (!commands || typeof commands !== "object")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "APIApplicationCommand or APIApplicationCommand[]", "body");
        if (!this.#client.user)
            return;
        commands = Array.isArray(commands) ? commands : [commands];
        commands = [...new Set(commands)];
        const response = await this.#client.rest.request("PUT", this.target === "global"
            ? Endpoints.ApplicationCommands(this.#client.user.id)
            : Endpoints.ApplicationGuildCommands(this.#client.user.id, this.target), true, commands);
        if (!response)
            return null;
        if (!response.hasData())
            return response;
        for (const command of response.data) {
            if (!command || typeof command !== "object")
                continue;
            this.cache.set(command.id, command);
        }
        return this.cache;
    }
    /**
     * Removes a application command with their ID.
     * @param {string} id - The application command id to remove.
     * @returns {Promise<Nullable<RESTResponse | boolean>>}
     */
    async remove(id) {
        if (!id && typeof id !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "id");
        if (!this.#client.user)
            return;
        const response = await this.#client.rest.request("DELETE", this.target === "global"
            ? Endpoints.ApplicationCommand(this.#client.user.id, id)
            : Endpoints.ApplicationGuildCommand(this.#client.user.id, this.target, id), true);
        if (!response)
            return null;
        if (!response?.error)
            return response;
        return response?.error ? false : true;
    }
}
exports.ApplicationCommandManager = ApplicationCommandManager;
