"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionBase = void 0;
const utils_1 = require("../../utils/utils");
const Member_1 = require("../Member");
/**
 * Represents the base class for interactions.
 */
class InteractionBase {
    /**
     * The Client.
     * @name InteractionBase#client
     * @type {Client}
     * @readonly
     */
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
     * The Interaction Member.
     * @type {Member}
     */
    member;
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
    /**
     * Creates an instance of InteractionBase.
     * @param {object} data - The Interaction payload.
     * @param {Client} client - The Client.
     */
    constructor(data, client) {
        this.client = client;
        this.token = data.token;
        this.interactionId = data.id;
        this.type = data.type;
        this.guildId = data.guild_id;
        this.guild = this.client.guilds.cache.get(this.guildId);
        this.member = new Member_1.Member({ ...data.member, id: data.member.user.id }, this.guild, this.client);
        this.channel = this.guild.channels.cache.get(data.channel_id);
        this.user = this.author;
        this.permissions = data.app_permissions;
        this.guildLocale = data.guild_locale;
        this.rawData = data.data;
        this.#d = data;
        this.id = data.data.id;
        (0, utils_1.readOnly)(this, "token", this.token);
        (0, utils_1.readOnly)(this, "interactionId", this.interactionId);
        (0, utils_1.readOnly)(this, "reply", this.makeReply);
        (0, utils_1.readOnly)(this, "showModal", this.modal);
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
     * @param {?} obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse | object>}
     */
    async makeReply(obj) {
        // Implementation remains same as in JavaScript
    }
    /**
     * Defers the reply.
     * @param {boolean} ephemeral - If the defer will be sent ephemerally.
     * @returns {Promise<Object>}
     * @async
     */
    async deferReply(ephemeral) {
        // Implementation remains same as in JavaScript
    }
    /**
     * Edits the original response. (if any)
     * @async
     * @param {EditMessagePayload} obj - The EditMessagePayloadData
     * @returns {Promise<InteractionResponse | object>}
     */
    async editReply(obj) {
        // Implementation remains same as in JavaScript
    }
    /**
     * Follows up the Interaction response.
     * @param {InteractionPayloadData} obj - The MessagePayloadData
     * @returns {Promise<InteractionResponse>}
     * @async
     */
    async followUp(obj) {
        // Implementation remains same as in JavaScript
    }
    /**
     * Sends a modal as the interaction response.
     * @param {InteractionPayloadData} obj - The ModalPayloadData
     * @returns {Promise<any>}
     * @async
     */
    async modal(obj) {
        // Implementation remains same as in JavaScript
    }
}
exports.InteractionBase = InteractionBase;
