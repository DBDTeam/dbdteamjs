"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionBase = void 0;
const Member_1 = require("../Member");
/**
 * Represents the base class for interactions.
 */
class InteractionBase {
    client;
    /**
     * The Interaction ID.
     * @type {string}
     * @readonly
     */
    interactionId;
    /**
     * The token of the Interaction.
     * @type {string}
     * @readonly
     */
    token;
    /**
     * The type of Interaction.
     * @type {number | undefined}
     */
    type;
    /**
     * The Guild ID.
     * @type {string}
     */
    guildId;
    /**
     * The Guild.
     * @type {Guild}
     */
    guild;
    /**
     * The Channel where the Interaction was triggered.
     * @type {Channel | VoiceChannel | TextChannel | ThreadChannel}
     */
    channel;
    /**
     * The Interaction User.
     * @type {User}
     */
    user;
    /**
     * Bitwise set of permissions the app has in the source location of the interaction.
     * @type {string}
     */
    permissions;
    /**
     * The Guild Locale.
     * @type {string}
     */
    guildLocale;
    /**
     * The raw data.
     * @type {object}
     */
    rawData;
    #d;
    showModal;
    reply;
    id;
    /**
     * The Interaction Member.
     * @type {Nullable<Member>}
     */
    member;
    /**
     * Creates an instance of InteractionBase.
     * @param {object} data - The Interaction payload.
     * @param {Client} client - The Client.
     */
    constructor(data, client) {
        this.client = client;
        this.client = client;
        this.token = data.token;
        this.interactionId = data.id;
        this.type = data.type;
        this.guildId = data.guild_id;
        this.guild = this.client.guilds.cache.get(this.guildId);
        this.member = this._member;
        this.channel = this.guild?.channels.cache.get(data.channel_id);
        this.user = this.author;
        this.permissions = data.app_permissions;
        this.guildLocale = data.guild_locale;
        this.rawData = data.data;
        this.#d = data;
        this.id = data.data.id;
        this.token = this.token;
        this.interactionId = this.interactionId;
        this.reply = this.makeReply;
        this.showModal = this.modal;
    }
    get _member() {
        if (this.guild)
            if (this.#d.member)
                return new Member_1.Member({ ...this.#d.member, id: this.#d.member.user.id }, this.guild, this.client);
        return null;
    }
    /**
     * Returns whether the Interaction is a ComponentInteraction.
     * @type {boolean}
     */
    get isComponent() {
        return !!this.rawData.custom_id;
    }
    /**
     * Returns whether the Interaction is a SlashInteraction.
     * @type {boolean}
     */
    get isSlash() {
        return this.rawData.type === 1;
    }
    /**
     * Returns whether the Interaction is a UserInteraction.
     * @type {boolean}
     */
    get isUser() {
        return this.rawData.type === 2;
    }
    /**
     * Returns whether the Interaction is a MessageInteraction.
     * @type {boolean}
     */
    get isMessage() {
        return this.rawData.type === 3;
    }
    /**
     * Returns the Interaction Author.
     * @type {User}
     */
    get author() {
        return this.member?.user;
    }
    /**
     * Makes a reply using the gateway.
     * @async
     * @param {?} _obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse | object>}
     */
    async makeReply(_obj) {
        // Implementation remains same as in JavaScript
    }
    /**
     * Defers the reply.
     * @param {boolean} ephemeral - If the defer will be sent ephemerally.
     * @returns {Promise<Object>}
     * @async
     */
    async deferReply(_ephemeral) {
        // Implementation remains same as in JavaScript
    }
    /**
     * Edits the original response. (if any)
     * @async
     * @param {EditMessagePayload} obj - The EditMessagePayloadData
     * @returns {Promise<InteractionResponse | object>}
     */
    async editReply(_obj) {
        // Implementation remains same as in JavaScript
    }
    /**
     * Follows up the Interaction response.
     * @param {InteractionPayloadData} obj - The MessagePayloadData
     * @returns {Promise<InteractionResponse>}
     * @async
     */
    async followUp(_obj) {
        // Implementation remains same as in JavaScript
    }
    /**
     * Sends a modal as the interaction response.
     * @param {InteractionPayloadData} obj - The ModalPayloadData
     * @returns {Promise<any>}
     * @async
     */
    async modal(_obj) {
        // Implementation remains same as in JavaScript
    }
}
exports.InteractionBase = InteractionBase;
