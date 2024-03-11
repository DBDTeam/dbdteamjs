const { User } = require("../User.js")
const Endpoints = require("../../REST/Endpoints.js")
const { resolveImage } = require("../../Utils/ImageResolver.js")

class ClientUser extends User {
    #client;
    constructor(user, client) {
        super(user, client)
        this.#client = client
    }

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
        return result
    }

    async editUsername(username) {
        return await this.edit({ username })
    }
    async editAvatar(url) {
        url = await resolveImage(url)

        return await this.edit({ avatar: url })
    }
}

module.exports = { ClientUser }