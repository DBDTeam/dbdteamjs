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
exports.InteractionResponse = void 0;
const ClientError_1 = require("../../client/errors/ClientError");
const ErrorList_1 = require("../../client/errors/ErrorList");
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Message_1 = require("../Message");
const EditMessagePayload_1 = require("../Payloads/EditMessagePayload");
class InteractionResponse extends Message_1.Message {
    client;
    /**
     * The token of the interaction response
     * @type {string}
     * @readonly
     */
    token;
    /**
     * The id of the interaction response
     * @type {string}
     * @readonly
     */
    interaction_id;
    /**
     * The interaction data
     * @type {object}
     */
    interaction_data;
    constructor(data, client) {
        super(data, client);
        this.client = client;
        this.guildId = data.guild_id;
        this.token = data.token;
        this.interaction_id = data.interaction_id;
        const interaction = data.interaction || data.interaction_metadata;
        this.interaction_data = {
            name: interaction?.name,
            id: interaction?.id,
            type: interaction?.type,
            user: client.users.cache.get(interaction?.user?.id || interaction?.user_id),
            userId: interaction?.user?.id || interaction?.user_id,
        };
    }
    /**
     * Edits the Interaction Response.
     * @param {string | MessageBodyRequest} obj - The EditMessagePayloadData
     * @returns {Promise<InteractionResponse | null>}
     */
    async editInteractionResponse(body) {
        if (typeof body === "string" || body instanceof String) {
            body = { content: body };
        }
        if (body && typeof body !== "object")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "boolean", "body");
        const message = new EditMessagePayload_1.EditMessagePayload(body, body?.files);
        const response = await this.client.rest.request("PATCH", Endpoints.InteractionOriginal(this.client.user.id, this.token), true, { data: message.payload }, null, message.files);
        if (!response)
            return null;
        if (response.error)
            return response;
        if (response.data)
            return new InteractionResponse({
                ...response.data,
                guild_id: this.guildId,
                token: this.token,
                interactionId: this.interaction_id,
            }, this.client);
    }
}
exports.InteractionResponse = InteractionResponse;
