const { User } = require("../User.js")
const Endpoints = require("../../REST/Endpoints.js")
const { resolveImage } = require("../../Utils/ImageResolver.js");
const { Client } = require("./Client.js");

class ClientUser extends User {
    /**
     * Represents the client user
     * @param {User} - The user payload
     * @param {Client} - The Client
     */
    #client;
    constructor(user, client) {
        super(user, client)
        this.#client = client
    }

    /**
     * 
     * @param {obj} obj - The new info to edit the client
     * @example
     * client.edit({
     *  username: "DBDTeamJS",
     *  avatar: `https://cdn.discordapp.com/icons/759558437088264202/a_a54e72d76462c99427db0287b7312d02.png`
     * }).then((result) => {
     *  if(result.error){console.log(result)}
     *  console.log(`Changed avatar + username successfully!`)
     * })
     * @returns {ClientUser}
     */

    async edit(obj) {
        var modify = {}
        if (obj.username) {
            modify.username = obj.username
        }
        if (obj.avatar) {
            modify.avatar = await resolveImage(obj.avatar)
        }
        const result = await this.#client.rest.request("PATCH", Endpoints.User("@me"), true, {
            data: modify, headers: {
                "Content-Length": Buffer.byteLength(JSON.stringify(modify))
            }
        })
        if(result.error){
            return result
        } else {
            var bot = new ClientUser(result.data, this.#client)
            this.#client.users.cache.set(this.#client.user.id, bot)
            return bot
        }
    }

    /**
     * 
     * @param {obj} obj - The new username of the Client
     * @example
     * client.editUsername(`DBDTeamJS`).then((result) => {
     *  if(result.error){console.log(result)}
     *  console.log(`Changed username successfully!`)
     * })
     * @returns {ClientUser}
     */

    async editUsername(username) {
        return await this.edit({ username })
    }

    /**
     * 
     * @param {obj} obj - The new username of the Client
     * @example
     * const link = `https://cdn.discordapp.com/icons/759558437088264202/a_a54e72d76462c99427db0287b7312d02.png`
     * client.editAvatar(link).then((result) => {
     *  if(result.error){console.log(result)}
     *  console.log(`Changed avatar successfully!`)
     * })
     * @returns {ClientUser}
     */

    async editAvatar(url) {
        url = await resolveImage(url)

        return await this.edit({ avatar: url })
    }
}

module.exports = { ClientUser }