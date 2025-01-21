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
exports.ClientUser = void 0;
const Endpoints = __importStar(require("../rest/Endpoints"));
const User_1 = require("../structures/User");
const ImageResolver_1 = require("../utils/ImageResolver");
const ErrorList_1 = require("./errors/ErrorList");
const ClientError_1 = require("./errors/ClientError");
/**
 * @extends {User}
 */
class ClientUser extends User_1.User {
    #client;
    constructor(data, client) {
        super(data, client);
        this.#client = client;
    }
    /**
     *
     * @param {object} object - The new info to edit the client
     * @example
     * client.edit({
     *  username: "DBDTeamJS",
     *  avatar: `https://cdn.discordapp.com/icons/759558437088264202/a_a54e72d76462c99427db0287b7312d02.png`
     * }).then((result) => {
     *  if(result.error){console.log(result)}
     *  console.log(`Changed avatar + username successfully!`)
     * })
     * @returns {Promise<ClientUser>}
     */
    async edit(newInfo) {
        if (!newInfo || typeof newInfo !== "object")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "object", "newInfo");
        let avatar = null;
        if (newInfo.avatar) {
            avatar = await (0, ImageResolver_1.resolveImage)(newInfo.avatar);
        }
        const payload = {
            username: newInfo.username,
            avatar: avatar?.uri ?? (newInfo.avatar === "" ? "" : null),
        };
        const result = await this.#client.rest.request("PATCH", Endpoints.User("@me"), true, payload, null, null);
        if (!result || !result.hasData())
            return result;
        var bot = new ClientUser(result.data, this.#client);
        this.#client.users.cache.set(this.#client.user.id, bot);
        return bot;
    }
    /**
     *
     * @param {string} username - The new username of the Client
     *
     * @example
     * client.editUsername(`DBDTeamJS`).then((result) => {
     *  if(result.error){console.log(result)}
     *  console.log(`Changed username successfully!`)
     * })
     *
     * @returns {Promise<ClientUser>}
     */
    async editUsername(username) {
        return await this.edit({ username });
    }
    /**
     *
     * @param {string} url - The new username of the Client
     *
     * @example
     * const link = `https://cdn.discordapp.com/icons/759558437088264202/a_a54e72d76462c99427db0287b7312d02.png`
     * client.editAvatar(link).then((result) => {
     *  if(result.error){console.log(result)}
     *  console.log(`Changed avatar successfully!`)
     * })
     *
     * @returns {Promise<ClientUser>}
     */
    async editAvatar(url) {
        return await this.edit({ avatar: url });
    }
}
exports.ClientUser = ClientUser;
