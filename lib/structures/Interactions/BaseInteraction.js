"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionBase = void 0;
const v10_1 = require("discord-api-types/v10");
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Member_1 = require("../Member");
const InteractionPayload_1 = require("../Payloads/InteractionPayload");
const InteractionResponse_1 = require("./InteractionResponse");
const MessagePayload_1 = require("../Payloads/MessagePayload");
const EditMessagePayload_1 = require("../Payloads/EditMessagePayload");
const ModalPayload_1 = require("../Payloads/ModalPayload");
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
     * @type {Channel | VoiceChannel | TextChannel | ThreadChannel | TextBasedChannel}
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
            if (this.#d && this.#d.member)
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
    async __makeReply(obj) {
        const data = { type: obj.type, data: obj.data };
        let response;
        let res = await this.client.rest.request("POST", Endpoints.Interaction(this.interactionId, this.token), true, { data }, null, data?.data?.files);
        if (obj.fetchResponse) {
            res = await this.client.rest.request("GET", Endpoints.InteractionOriginal(this.client.user.id, this.token), true);
            response = new InteractionResponse_1.InteractionResponse({
                ...res?.data,
                guild_id: this.guildId,
                token: this.token,
                interactionId: this.interactionId,
            }, this.client);
        }
        return response ?? res;
    }
    /**
     * Makes a reply using the gateway.
     * @async
     * @param {InteractionPayload} obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse | ErrorResponseFromApi>}
     */
    async makeReply(obj) {
        const payload = new InteractionPayload_1.InteractionPayload(obj, obj.files);
        let _d = payload.payload, files = payload.files;
        const data = {
            type: v10_1.InteractionResponseType.ChannelMessageWithSource,
            data: { ..._d, files },
        };
        const response = this.__makeReply(data);
        return response;
    }
    /**
     * Defers the reply.
     * @param {boolean} ephemeral - If the defer will be sent ephemerally.
     * @returns {Promise<InteractionResponse | object>}
     * @async
     */
    async deferReply(ephemeral) {
        ephemeral = !!ephemeral;
        this.__makeReply({
            type: v10_1.InteractionResponseType.DeferredChannelMessageWithSource,
            ephemeral,
        });
    }
    /**
     * Edits the original response. (if any)
     * @async
     * @param {MessageUpdateBodyRequest} obj - The Body of the new Message.
     * @returns {Promise<InteractionResponse | ErrorResponseFromApi>}
     */
    async editReply(body) {
        if (!body)
            return body;
        const MessagePayloadData = new EditMessagePayload_1.EditMessagePayload(body, body.files);
        const [data, files] = [
            MessagePayloadData.payload,
            MessagePayloadData.files,
        ];
        const request = await this.client.rest.request("PATCH", Endpoints.InteractionOriginal(this.client.user.id, this.token), true, { data }, null, files);
        if (!request || request?.error || !request?.data)
            return request;
        const message = new InteractionResponse_1.InteractionResponse(request.data, this.client);
        return message;
    }
    /**
     * Follows up the Interaction response.
     * @param {InteractionBodyRequest} obj - The Body of the new Message.
     * @returns {Promise<InteractionResponse>}
     * @async
     */
    async followUp(body) {
        if (!body)
            return;
        const MessagePayloadData = new MessagePayload_1.MessagePayload(body, body.files);
        const [data, files] = [
            MessagePayloadData.payload,
            MessagePayloadData.files,
        ];
        const request = await this.client.rest.request("POST", Endpoints.InteractionCreateFollowUp(this.client.user.id, this.token), true, { data }, null, files);
        if (!request || request?.error || !request?.data)
            return request;
        const message = new InteractionResponse_1.InteractionResponse(request.data, this.client);
        return message;
    }
    /**
     * Sends a modal as the interaction response.
     * @param {InteractionPayloadData} obj - The ModalPayloadData
     * @returns {Promise<InteractionResponse | object>}
     * @async
     */
    async modal(body) {
        const ModalData = new ModalPayload_1.InteractionModalPayload(body);
        const payload = ModalData.payload;
        const response = await this.__makeReply({ type: v10_1.InteractionResponseType.Modal, data: payload });
        return response;
    }
}
exports.InteractionBase = InteractionBase;
