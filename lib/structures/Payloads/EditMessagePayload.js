"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditMessagePayload = void 0;
const v10_1 = require("discord-api-types/v10");
const utils_1 = require("../../utils/utils");
class EditMessagePayload {
    MENTIONS = [v10_1.AllowedMentionsTypes.User, v10_1.AllowedMentionsTypes.Role, v10_1.AllowedMentionsTypes.Everyone];
    /**
     * At least one of the options (content or embeds) must be placed and not undefined.
     * @typedef {Object} MessageEditPayloadData
     * @property {string} [content] - The message content.
     * @property {Array<Object>} [embeds] - The message embeds.
     * @property {MentionsData} [mentions] - The message mentions object.
     * @property {Array<Object>} [components] - The message components.
     * @property {number} [flags] - The flags of the message.
     * @property {Array<Object>} [files] - The files of the message.
     * @property {Array<Object>} [attachments] - The attachments of the message.
     */
    Data = {
        content: "",
        embeds: [],
        mentions: {},
        components: [],
        flags: 0,
        files: [],
    };
    d;
    file;
    f;
    constructor(data, files = []) {
        this.d =
            typeof data === "string"
                ? { content: data }
                : (0, utils_1.setObj)(this.Data, data, { sticker_ids: "stickers" });
        this.file = [];
        this.f = files;
        if (typeof this.d == "string") {
            var __i = this.d;
            this.d = {};
            this.d.content = __i;
        }
        if (this.d?.mentions) {
            if ("parse" in this.d?.mentions) {
                this.d.allowed_mentions.parse = this.MENTIONS.filter((mention) => this.d?.mentions?.parse?.some((allowedMention) => mention.toLowerCase() === allowedMention?.toLowerCase()));
            }
            if ("users" in this.d?.mentions) {
                this.d.allowed_mentions.users = this.d?.mentions?.users;
            }
            if ("roles" in this.d?.mentions) {
                this.d.allowed_mentions.roles = this.d?.mentions?.roles;
            }
        }
        if (typeof this.f === "object") {
            var i = 0;
            const filesArray = Array.isArray(this.f) ? this.f : [this.f];
            for (const currentItem of filesArray) {
                if (typeof currentItem === "object" &&
                    "url" in currentItem &&
                    "name" in currentItem) {
                    this.file.push({ name: currentItem.name, url: currentItem.url });
                    this.d.attachments.push({
                        id: i,
                        filename: currentItem.name,
                        description: currentItem.description,
                    });
                    i++;
                }
            }
        }
        delete this.d.reply;
        delete this.d.mentions;
    }
    get payload() {
        return this.d;
    }
    get files() {
        return this.files;
    }
}
exports.EditMessagePayload = EditMessagePayload;
