const { Collection } = require("../../Utils/Collection");
const { setObj, readOnly } = require("../../Utils/utils");
const Endpoints = require("../../REST/Endpoints")

class MemberRolesManager {
    #client;
    constructor(guild, member, client) {
        readOnly(this, "guild", guild)
        readOnly(this, "member", member)
        this.#client = client
        this.cache = new Collection()
        this.___patch()
    }
    ___patch() {
        for (var i in (this.member.roles || [])) {
            var roleFound = this.guild.roles.cache.get(this.member.roles[i])
            this.cache.set(this.member.roles[i], roleFound)
        }
    }

    async add(obj) {
        var roles = setObj({role_ids: []}, obj, { roles: "role_ids" })?.role_ids || []

        var reason = obj.reason

        var errors = []
        var success = []

        for (var i in roles) {
            var response = await this.#client.rest.request("PUT", Endpoints.GuildMemberRole(this.guild.id, this.member.id, roles[i]), true, {}, reason)

            if (response.error) {
                errors.push(response)
            } else {
                success.push(response)
            }
        }

        return { errors, success }
    }
    async remove(obj) {
        var roles = setObj({role_ids: []}, obj, { roles: "role_ids" })?.role_ids || []

        var reason = obj.reason

        var errors = []
        var success = []

        for (var i in roles) {
            var response = await this.#client.rest.request("DELETE", Endpoints.GuildMemberRole(this.guild.id, this.member.id, roles[i]), true, {}, reason)

            if (response.error) {
                errors.push(response)
            } else {
                success.push(response)
            }
        }

        return { errors, success }
    }

    async fetch(roleId = null) {
        var response = await this.guild.roles.fetch(roleId)

        if (response?.error) {
            //"why are u watching this xd"; "idk"; "this is kinda crazy"; "well, maybe it's, but, i'm bored"; "me too bro"
            return response
        } else {
            if (response instanceof Collection) {
                var i = response.toJSON().filter((i) => this.member?.roles?.includes(i.id))

                for (var x of i) {
                    this.cache.set(x.id, x)
                }

                response = this.cache
            }
        }

        return response
    }
}

class GuildRolesManager {
    #client;
    constructor(guild, client) {
        this.#client = client
        this.guild = guild
        this.cache = new Collection()
    }

    async fetch(roleId) {
        const _allGuildRoles = await this.#client.rest.request("GET", Endpoints.GuildRoles(this.guild.id), true)
        var response;
        if (_allGuildRoles.error) {
            response = _allGuildRoles
        } else {
            for (var i of _allGuildRoles.data) {
                this.cache.set(i.id, i)

                if (roleId == i.id) {
                    response = i
                }
            }

            if (!response) {
                response = this.cache
            }

            return response
        }
    }

    async delete(obj) {
        var roles = setObj({role_ids: []}, obj, { roles: "role_ids" })?.role_ids || []

        var reason = obj.reason

        var errors = []
        var success = []

        for (var i in roles) {
            var response = await this.#client.rest.request("DELETE", Endpoints.GuildRole(this.guild.id, roles[i]), true, {}, reason)

            if (response.error) {
                errors.push(response)
            } else {
                success.push(response)
            }
        }

        return { errors, success }
    }

    async create(obj) {
        const base = {
            name: "New Role",
            permissions: "0",
            color: 0,
            hoist: false,
            icon: null,
            unicode_emoji: null,
            mentionable: false,
            reason: null
        }

        var data = setObj(base, obj, { unicodeEmoji: "unicode_emoji" })

        var reason = data.reason

        delete data.reason

        const response = await this.#client.rest.request("POST", Endpoints.GuildRoles(this.guild.id), true, { data }, reason)

        if (response.error) { return response } else {
            this.cache.set(response.data.id, response.data)

            return response.data
        }
    }
}

module.exports = { MemberRolesManager, GuildRolesManager }