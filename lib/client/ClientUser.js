"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientUser = void 0;
const User_1 = require("../structures/User");
const Endpoints_js_1 = __importDefault(require("../rest/Endpoints.js"));
const ImageResolver_js_1 = require("../utils/ImageResolver.js");
/**
 * @extends {User}
 */
class ClientUser extends User_1.User {
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
    async edit(object) {
        object.avatar = await (0, ImageResolver_js_1.resolveImage)(object.avatar);
        const result = await this.client.rest.request("PATCH", Endpoints_js_1.default.User("@me"), true, {
            data: object,
            headers: {
                "Content-Length": Buffer.byteLength(JSON.stringify(object)),
            },
        });
        if (result.error) {
            return result;
        }
        else {
            var bot = new ClientUser(result.data, this.client);
            this.client.users.cache.set(this.client.user.id, bot);
            return bot;
        }
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
        const imageUrl = await (0, ImageResolver_js_1.resolveImage)(url);
        return await this.edit({ avatar: imageUrl });
    }
}
exports.ClientUser = ClientUser;
