const { User } = require("../User");
const { Member } = require("../Member")
const { ComponentTypes } = require("../../Types/Interactions");
const { Message } = require("../Message");
const { InteractionBase } = require("./BaseInteraction");
const { InteractionPayload } = require("../Payloads/InteractionPayload");
const Endpoints = require("../../REST/Endpoints");
const { readOnly } = require("../../Utils/utils");

class ComponentInteraction extends InteractionBase {
    #d;
    constructor(data, client) {
        super(data, client);
        this.customId = data.data.custom_id;
        this.componentType = data.data.component_type;
        this.#d = data;
        readOnly(this, "update", this.updateReply)
        this._patch()
    }
    get isButton() {
        return this.#d.data?.component_type === ComponentTypes.Button;
    }
    get isSelectMenu() {
        return [ComponentTypes.String, ComponentTypes.User, ComponentTypes.Role, ComponentTypes.Mentionable, ComponentTypes.Channel].includes(this.#d.data?.component_type);
    }

    get isModal() {
        return this.#d.type === 5
    }

    async updateReply(obj) {
        const payload = new InteractionPayload(obj, obj.files)
        var _d = payload.payload, files = payload.files

        const data = { type: 7, data: _d }

        const response = await this.client.rest.request("POST", Endpoints.Interaction(this.interactionId, this.token), true, { data }, null, files)

        if(obj.fetchResponse || obj.fetchReply){
            response = await this.client.rest.request("GET", Endpoints.InteractionOriginal(this.client.user.id, this.token), true)

            response = new InteractionResponse({...response.data, guild_id: this.guildId, token: this.token, interactionId: this.interactionId}, this.client)
        }

        return response
    }

    _patch() {
        this.message = new Message(this.#d.message, this.client);
        const userData = this.#d.member.user;
        this.member = new Member({ ...this.#d.member, id: userData.id }, this.guild, this.client);
        this.user = new User(userData, this.client);
    }
}

module.exports = { ComponentInteraction };