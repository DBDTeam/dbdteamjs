const { readOnly } = require("../../Utils/utils");
const { Member } = require("../Member");
const Endpoints = require("../../REST/Endpoints");
const { InteractionPayload } = require("../Payloads/InteractionPayload");
const { EditMessagePayload } = require("../Payloads/EditMessagePayload");
const { MessagePayload } = require("../Payloads/MessagePayload");
const { Message } = require("../Message");
const { InteractionResponse } = require("./InteractionResponse");

class InteractionBase {
    #d;
    constructor(data, client) {
        readOnly(this, "token", data.token)
        readOnly(this, "client", client)
        readOnly(this, "interactionId", data.id)
        this.type = data.type
        this.guildId = data.guild_id
        this.guild = this.client.guilds.cache.get(this.guildId)
        this.member = new Member({...data.member, id: data.member.user.id}, this.guild, this.client)
        this.channel = this.guild.channels.cache.get(data.channel_id)
        this.user = this.author
        this.permissions = data.app_permissions
        this.guildLocale = data.guild_locale
        this.rawData = data.data
        this.#d = data;
        this.id = data.data.id
    }

    get isComponent() {
        return !!this.rawData.custom_id
    }

    get isSlash() {
        return this.#d.type === 1
    }

    get isUser() {
        return this.#d.type === 2
    }

    get isMessage() {
        return this.#d.type === 3
    }

    get author() { return this.member.user}

    async makeReply(obj) {
        const payload = new InteractionPayload(obj, obj.files)
        var _d = payload.payload, files = payload.files

        const data = { type: 4, data: _d }

        const response = await this.client.rest.request("POST", Endpoints.Interaction(this.interactionId, this.token), true, { data }, null, files)

        return response
    }

    async deferReply(ephemeral) {
        const data = { type: 5, data: {flags: ephemeral === true ? 64 : 0} }
        const response = await this.client.rest.request("POST", Endpoints.Interaction(this.interactionId, this.token), true, { data })

        return response
    }

    async editReply(obj) {
        const payload = new EditMessagePayload(obj, obj.files)
        var data = payload.payload, files = payload.files

        const response = await this.client.rest.request("PATCH", Endpoints.InteractionOriginal(this.client.user.id, this.token), true, { data }, null, files)
        
        if(response.error) {
            return error
        } else {
            return new InteractionResponse({...response.data, guild_id: this.guildId, token: this.token, interactionId: this.interactionId}, this.client)
        }
    }

    async followUp(obj) {
        const payload = new MessagePayload(obj, obj.files)
        var data = payload.payload; var files = payload.files

        if(obj.ephemeral === true) {
            data.flags |= 64
        }

        const response = await this.client.rest.request("POST", Endpoints.InteractionCreateFollowUp(this.client.user.id, this.token), true, { data }, null, files)

        if(response.error) {
            return error
        } else {
            return new InteractionResponse({...response.data, guild_id: this.guildId, token: this.token, interactionId: this.interactionId}, this.client)
        }
    }

    async editFollowUp(obj, id) {
        const payload = new MessagePayload(obj, obj.files)
        var data = payload.payload; var files = payload.files

        const response = await this.client.rest.request("PATCH", Endpoints.InteractionFollowUp(this.client.user.id, this.token, id), true, { data }, null, files)

        if(response.error) {
            return error
        } else {
            return new InteractionResponse({...response.data, guild_id: this.guildId, token: this.token, interactionId: this.interactionId}, this.client)
        }
    }
}

module.exports = { InteractionBase }