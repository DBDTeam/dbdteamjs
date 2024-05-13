"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePayload = void 0;
const v10_1 = require("discord-api-types/v10");
const utils_1 = require("../../utils/utils");
class MessagePayload {
    MENTIONS = [
        v10_1.AllowedMentionsTypes.User,
        v10_1.AllowedMentionsTypes.Role,
        v10_1.AllowedMentionsTypes.Everyone,
    ];
    Data = {
        content: "",
        tts: false,
        embeds: null,
        allowed_mentions: null,
        message_reference: null,
        components: null,
        sticker_ids: null,
        files: null,
        nonce: Date.now(),
        attachments: null,
        poll: null
    };
    d;
    file;
    f;
    /**
     * Creates a message payload to send messages.
     * @param {MessageBodyRequest} data
     * @param {Files} files
     */
    constructor(data, files = ([] = [])) {
        this.d =
            typeof data === "string"
                ? { content: data }
                : (0, utils_1.setObj)(this.Data, data, { sticker_ids: "stickers" });
        this.file = [];
        this.f = files;
        if (this.d.reply) {
            this.d.message_reference = {};
            if (this.d.reply.mention) {
                this.d.allowed_mentions = {};
                this.d.allowed_mentions.replied_user = true;
            }
            if (this.d.reply.error === true) {
                this.d.message_reference.fail_if_not_exists = true;
            }
            this.d.message_reference.message_id = this.d.reply.id;
        }
        if (this.d.mentions) {
            this.d.allowed_mentions = {};
            if (this.d.mentions.parse) {
                this.d.allowed_mentions.parse = this.MENTIONS.filter((mention) => this.d.allowed_mentions.parse.some((allowedMention) => mention.toLowerCase() === allowedMention?.toLowerCase()));
            }
            this.d.allowed_mentions.users = this.d.mentions.users?.[0]
                ? this.d.mentions.users
                : null;
            this.d.allowed_mentions.roles = this.d.mentions.roles?.[0]
                ? this.d.mentions.roles
                : null;
        }
        if (this.d.poll) {
            if ('multiselect' in this.d.poll) {
                this.d.poll.allow_multiselect = this.d.poll.multiselect;
                delete this.d.poll.multiselect;
            }
            this.d.poll.layout_type = 1;
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
        return this.d.files;
    }
}
exports.MessagePayload = MessagePayload;
