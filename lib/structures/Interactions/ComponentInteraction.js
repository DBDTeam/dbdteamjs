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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const ClientError_1 = require("../../client/errors/ClientError");
const ErrorList_1 = require("../../client/errors/ErrorList");
/**
 * Represents a ComponentInteraction.
 * @extends InteractionBase
 */
class ComponentInteraction extends BaseInteraction_1.InteractionBase {
    data;
    client;
    /**
     * The custom id of the interaction
     * @type {string}
     */
    customId;
    /**
     * The component type of the interaction
     * @type {ComponentType}
     */
    componentType;
    /**
     * Updates the reply
     * @param { APIInteractionResponseCallbackData } obj - The object to update the reply.
     * @returns { Promise<InteractionResponse | boolean> }
     */
    update;
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
        this.update = (obj) => this.updateReply(obj);
        this._patch();
    }
    /**
     * Checks if the ComponentInteraction is a Button.
     * @type {boolean}
     */
    isButton() {
        return this.data.data?.component_type === v10_1.ComponentType.Button;
    }
    /**
     * Checks if the ComponentInteraction is a SelectMenu.
     * @type {boolean}
     */
    isSelectMenu() {
        return [
            v10_1.ComponentType.StringSelect,
            v10_1.ComponentType.UserSelect,
            v10_1.ComponentType.RoleSelect,
            v10_1.ComponentType.MentionableSelect,
            v10_1.ComponentType.ChannelSelect,
        ].includes(this.data.data?.component_type);
    }
    /**
     * Updates the original reply.
     * @param {InteractionPayloadData} obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse>}
     */
    async updateReply(obj) {
        if (typeof obj === "string") {
            obj = { content: obj };
        }
        if (obj && typeof obj !== "object")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "object", "obj");
        const payload = new InteractionPayload_1.InteractionPayload(obj, obj.files);
        let { payload: _d } = payload;
        const data = { type: 7, data: _d };
        let response = await this.client.rest.request("POST", Endpoints.Interaction(this.interactionId, this.token), true, data);
        if (obj.fetchResponse) {
            response = await this.client.rest.request("GET", Endpoints.InteractionOriginal(this.client.user.id, this.token), true);
            if (!response || response.error)
                return false;
            const result = new InteractionResponse_1.InteractionResponse({
                ...response,
                guild_id: this.guildId,
                token: this.token,
                interactionId: this.interactionId,
            }, this.client);
            return result;
        }
        return true;
    }
    /**
     * Patch method for initializing data properties.
     * @private
     */
    _patch() {
        this.message = new Message_1.Message(this.data.message, this.client);
        const userData = this.data.member?.user;
        if (this.guild)
            this.member = new Member_1.Member({ ...this.data.member, id: userData?.id }, this.guild, this.client);
        this.user = new User_1.User(userData, this.client);
    }
}
exports.ComponentInteraction = ComponentInteraction;
