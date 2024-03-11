const { Collection } = require("../../Utils/Collection");
const { readOnly, setObj } = require("../../Utils/utils");
const Endpoints = require("../../REST/Endpoints")

class ApplicationCommandManager {
    #Data = {
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
    }
    #Mapping = {
        default_member_permissions: ["defaultMemberPermissions", "defaultMemberPerms"],
        default_permission: ["defaultPermissions", "defaultPerms"],
        name_localizations: ["nameLocalizations", "nameDictionary"],
        description_localizations: ["descriptionLocalizations", "descriptionDictionary"],
        dm_permission: "dmPermission",
    }
    constructor(client, guildId) {
        readOnly(this, "client", client)
        this.target = guildId || "global"
        this.cache = new Collection()
    }
    async add(obj) {
        //Reference: https://discord.com/developers/docs/interactions/application-commands#registering-a-command

        var data = setObj(this.#Data, obj, this.#Mapping)

        if (this.target !== "global") {
            var response = await this.client.rest.request("POST", Endpoints.ApplicationGuildCommands(this.client.user.id, this.target), true, { data })
        } else {
            var response = await this.client.rest.request("POST", Endpoints.ApplicationCommands(this.client.user.id, this.target), true, { data })
        }

        if (response.error) {
            return response
        } else {
            this.cache.set(response.data?.id, response.data)
            return this.cache.get(response.data?.id)
        }
    }
    async fetch(id) {
        if (this.target !== "global") {
            var response = await this.client.rest.request("GET", Endpoints.ApplicationGuildCommand(this.client.user.id, this.target, id), true)
        } else {
            var response = await this.client.rest.request("GET", Endpoints.ApplicationCommand(this.client.user.id, id), true)
        }

        if (response.error) {
            return response
        } else {
            this.cache.set(response.data?.id, response.data)
            return this.cache.get(response.data?.id)
        }
    }
    async set(commands) {
        // Reference: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
        if(commands instanceof Array) {
            var data = [];
            for(var i of commands) {
                data.push(setObj(this.#Data, i, this.#Mapping))
            }
            if (this.target !== "global") {
                var response = await this.client.rest.request("PUT", Endpoints.ApplicationGuildCommands(this.client.user.id, this.target), true, { data })
            } else {
                var response = await this.client.rest.request("PUT", Endpoints.ApplicationCommands(this.client.user.id), true, { data })
            }
            if(response.error) {

            } else {
                for(var i of response.data){
                    if(!i || typeof i !== "object" || !i instanceof Object) continue;
                    this.cache.set(i.id, i)
                }
            }
            return this.cache
        } else {
            return null;
        }
    }
    async remove(id) {
        if (this.target !== "global") {
            var response = await this.client.rest.request("DELETE", Endpoints.ApplicationGuildCommand(this.client.user.id, this.target, id), true)
        } else {
            var response = await this.client.rest.request("DELETE", Endpoints.ApplicationCommand(this.client.user.id, id), true)
        }

        return response
    }
}

module.exports = { ApplicationCommandManager }