const { readOnly } = require("../../Utils/utils")
const { Message } = require("../Message")
const { EditMessagePayload } = require("../Payloads/EditMessagePayload")
const Endpoints = require("../../REST/Endpoints")

class InteractionResponse extends Message {
    constructor(data, client) {
        super(data, client)
        readOnly(this, "client", client)
        readOnly(this, "token", data.token)
        readOnly(this, "interactionId", data.interactionId)
        this.interactionData = {
            name: data.interaction?.name ?? data.interaction_metadata.name,
            id: data.interaction?.id ?? data.interaction_metadata.id,
            type: data.interaction?.type ?? data.interaction_metadata.type,
            user: client.users.cache.get(data.interaction.user.id ?? data.interaction_metadata.user_id),
            userId: data.interaction.user.id ?? data.interaction_metadata.user_id
        }
    }

    async editInteractionResponse(obj) {
        //Remember that the tokens of interaction only works for 15 minutes, so, it's recommended to use <Message>.edit
        const payload = new EditMessagePayload(obj, obj.files)
        var data = payload.payload, files = payload.files

        const response = await this.client.rest.request("PATCH", Endpoints.InteractionOriginal(this.client.user.id, this.token), true, { data }, null, files)
        
        if(response.error) {
            return error
        } else {
            return new InteractionResponse({...response.data, guild_id: this.guildId, token: this.token, interactionId: this.interactionId}, this.client)
        }
    }
}

module.exports = { InteractionResponse }