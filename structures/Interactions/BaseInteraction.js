const { readOnly } = require("../../Utils/utils");
const { Member } = require("../Member");
const Endpoints = require("../../REST/Endpoints");
const { InteractionPayload } = require("../Payloads/InteractionPayload");
const { EditMessagePayload } = require("../Payloads/EditMessagePayload");
const { MessagePayload } = require("../Payloads/MessagePayload");
const { InteractionResponse } = require("./InteractionResponse");
const { InteractionModalPayload } = require("../Payloads/ModalPayload");

class InteractionBase {
    #d;
    /**
     * The Interaction Base. (created for a easier usage)
     * @param {object} data - The Interaction payload.
     * @param {Client} client - The Client.
     */
    constructor(data, client) {
        /**
         * The token of the Interaction.
         * @type {string}
         * @readonly
         */
        readOnly(this, "token", data.token)
        /**
         * The Client.
         * @type {Client}
         * @readonly
         */
        readOnly(this, "client", client)
        /**
         * The Interaction ID.
         * @type {string}
         * @readonly
         */
        readOnly(this, "interactionId", data.id)
        /**
         * The InteractionType. (if has)
         * @type {number | undefined}
         */
        this.type = data.type
        /**
         * The Guild ID.
         * @type {string}
         */
        this.guildId = data.guild_id
        /**
         * The Guild.
         * @type {Guild}
         */
        this.guild = this.client.guilds.cache.get(this.guildId)
        /**
         * The Interaction Member.
         * @type {Member}
         */
        this.member = new Member({...data.member, id: data.member.user.id}, this.guild, this.client)
        /**
         * The Channel where the Interaction was triggered.
         * @type {DefaultChannel | VoiceChannel | TextChannel | ThreadChannel}
         */
        this.channel = this.guild.channels.cache.get(data.channel_id)
        /**
         * The Interaction User.
         * @type {User}
         */
        this.user = this.author
        /**
         * Bitwise set of permissions the app has in the source location of the interaction.
         * @type {string}
         */
        this.permissions = data.app_permissions
        /**
         * The Guild Locale.
         * @type {string}
         */
        this.guildLocale = data.guild_locale
        /**
         * The raw data.
         * @type {object}
         */
        this.rawData = data.data
        this.#d = data;
        /**
         * The Interaction ID.
         * @type {string}
         */
        this.id = data.data.id
        /**
         * Replies the interaction with a source.
         * @type {function}
         */
        readOnly(this, "reply", this.makeReply)
        /**
         * Replies the interaction with a modal.
         * @type {function}
         */
        readOnly(this, "showModal", this.modal)
    }

    /**
     * Returns if the Interaction is a ComponentInteraction.
     * @type {boolean}
     */

    get isComponent() {
        return !!this.rawData.custom_id
    }

    /**
     * Returns if the Interaction is a SlashInteraction.
     * @type {boolean}
     */

    get isSlash() {
        return this.rawData.type === 1
    }

    /**
     * Returns if the Interaction is a UserInteraction.
     * @type {boolean}
     */

    get isUser() {
        return this.rawData.type === 2
    }

    /**
     * Returns if the Interaction is a MessageInteraction.
     * @type {boolean}
     */

    get isMessage() {
        return this.rawData.type === 3
    }

    /**
     * Returns the Interaction Author.
     * @type {User}
     */

    get author() { return this.member.user}

    /**
     * Makes a reply using the gateway.
     * @async
     * @param {InteractionPayloadData} obj - The InteractionPayloadData
     * @returns {InteractionResponse | object}
     */

    async makeReply(obj) {
        const payload = new InteractionPayload(obj, obj.files)
        var _d = payload.payload, files = payload.files

        const data = { type: 4, data: _d }

        var response = await this.client.rest.request("POST", Endpoints.Interaction(this.interactionId, this.token), true, { data }, null, files)

        if(obj.fetchResponse || obj.fetchReply){
            response = await this.client.rest.request("GET", Endpoints.InteractionOriginal(this.client.user.id, this.token), true)

            response = new InteractionResponse({...response.data, guild_id: this.guildId, token: this.token, interactionId: this.interactionId}, this.client)
        }

        return response
    }

    /**
     * Defers the reply.
     * @param {boolean} ephemeral - If the defer will be sended ephemerally.
     * @returns {object}
     * @async
     */

    async deferReply(ephemeral) {
        const data = { type: 5, data: {flags: ephemeral === true ? 64 : 0} }
        const response = await this.client.rest.request("POST", Endpoints.Interaction(this.interactionId, this.token), true, { data })

        return response
    }

    /**
     * Edits the original response. (if any)
     * @async
     * @param {EditMessagePayloadData} obj - The EditMessagePayloadData
     * @returns {InteractionResponse | object}
     */

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

    /**
     * Follows up the Interaction response.
     * @param {MessagePayloadData} obj - The MessagePayloadData
     * @returns {InteractionResponse}
     * @async
     */

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

    async modal(obj) {
        const payload = new InteractionModalPayload(obj)
        var _d = payload.payload

        const data = { type: 9, data: _d }

        const response = await this.client.rest.request("POST", Endpoints.Interaction(this.interactionId, this.token), true, { data })

        return response
    }
}

module.exports = { InteractionBase }