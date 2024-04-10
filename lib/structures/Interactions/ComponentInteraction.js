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
exports.ComponentInteraction = void 0;
const v10_1 = require("discord-api-types/v10");
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Member_1 = require("../Member");
const Message_1 = require("../Message");
const InteractionPayload_1 = require("../Payloads/InteractionPayload");
const User_1 = require("../User");
const BaseInteraction_1 = require("./BaseInteraction");
const InteractionResponse_1 = require("./InteractionResponse");
/**
 * Represents a ComponentInteraction.
 * @extends InteractionBase
 */
class ComponentInteraction extends BaseInteraction_1.InteractionBase {
    data;
    client;
    customId;
    componentType;
    update;
    guildId;
    /**
     * Creates an instance of ComponentInteraction.
     * @param {object} data - The ComponentInteraction Payload.
     * @param {Client} client - The Client
     */
    constructor(data, client) {
        super(data, client);
        this.data = data;
        this.client = client;
        this.customId = data.data?.custom_id;
        this.componentType = data.data?.component_type;
        this.update = this.updateReply;
        this.patch();
    }
    /**
     * Checks if the ComponentInteraction is a Button.
     * @type {boolean}
     */
    get isButton() {
        return this.data.data?.component_type === v10_1.ComponentType.Button;
    }
    /**
     * Checks if the ComponentInteraction is a SelectMenu.
     * @type {boolean}
     */
    get isSelectMenu() {
        return [
            v10_1.ComponentType.StringSelect,
            v10_1.ComponentType.UserSelect,
            v10_1.ComponentType.RoleSelect,
            v10_1.ComponentType.MentionableSelect,
            v10_1.ComponentType.ChannelSelect,
        ].includes(this.data.data?.component_type);
    }
    /**
     * Checks if the ComponentInteraction is a Modal.
     * @type {boolean}
     */
    // ??
    // get isModal(): boolean {
    //   return this.data.type === InteractionType.ModalSubmit;
    // }
    /**
     * Updates the original reply.
     * @param {InteractionPayloadData} obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse>}
     */
    async updateReply(obj) {
        const payload = new InteractionPayload_1.InteractionPayload(obj, obj.files);
        let { payload: _d, files } = payload;
        const data = { type: 7, data: _d };
        let response = await this.client.rest.request("POST", Endpoints.Interaction(this.interactionId, this.token), true, { data }, null, files);
        if (obj.fetchResponse || obj.fetchReply) {
            response = await this.client.rest.request("GET", Endpoints.InteractionOriginal(this.client.user.id, this.token), true);
            response = new InteractionResponse_1.InteractionResponse({
                ...response.data,
                guild_id: this.guildId,
                token: this.token,
                interactionId: this.interactionId,
            }, this.client);
        }
        return response;
    }
    /**
     * Patch method for initializing data properties.
     * @private
     */
    patch() {
        this.message = new Message_1.Message(this.data.message, this.client);
        const userData = this.data.member?.user;
        this.member = new Member_1.Member({ ...this.data.member, id: userData?.id }, this.guild, this.client);
        this.user = new User_1.User(userData, this.client);
    }
}
exports.ComponentInteraction = ComponentInteraction;
