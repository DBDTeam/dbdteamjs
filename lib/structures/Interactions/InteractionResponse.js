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
exports.InteractionResponse = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Message_1 = require("../Message");
const EditMessagePayload_1 = require("../Payloads/EditMessagePayload");
class InteractionResponse extends Message_1.Message {
    client;
    /**
     * The Interaction Token.
     * @type {string}
     * @readonly
     */
    token;
    /**
     * The Interaction Id.
     * @type {string}
     * @readonly
     */
    interaction_id;
    /**
     * The Interaction Data
     * @type {object}
     */
    interaction_data;
    constructor(data, client) {
        super(data, client);
        this.client = client;
        this.client = client;
        this.token = data.token;
        this.interaction_id = data.interaction_id;
        this.interaction_data = {
            name: data.interaction?.name ?? data.interaction_metadata?.name,
            id: data.interaction?.id ?? data.interaction_metadata?.id,
            type: data.interaction?.type ?? data.interaction_metadata?.type,
            user: client.users.cache.get(data.interaction?.user?.id ?? data.interaction_metadata?.user_id),
            userId: data.interaction?.user?.id ?? data.interaction_metadata?.user_id,
        };
    }
    /**
     * Edits the Actual Interaction Response.
     * @param {EditMessagePayload} obj - The EditMessagePayloadData
     * @returns {InteractionResponse}
     */
    async editInteractionResponse(obj) {
        let files;
        if (typeof obj === "string" || obj instanceof String) {
            var data = { content: obj };
        }
        else {
            const payload = new EditMessagePayload_1.EditMessagePayload(obj, obj.files);
            data = payload.payload;
            files = payload.files;
        }
        if (!this.client.user)
            return null;
        const response = await this.client.rest.request("PATCH", Endpoints.InteractionOriginal(this.client.user.id, this.token), true, { data }, null, files);
        if (response?.error) {
            return response;
        }
        else {
            return new InteractionResponse({
                ...response?.data,
                guild_id: this.guildId,
                token: this.token,
                interactionId: this.interaction_id,
            }, this.client);
        }
    }
}
exports.InteractionResponse = InteractionResponse;
