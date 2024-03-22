const { setObj } = require("../../Utils/utils");

/**
     * @typedef {("users" | "roles" | "everyone")} MentionType
     */

    /**
     * @typedef {Object} MentionsData
     * @property {Array<MentionType>} parse - The Mention parse.
     * @property {Array<string>} users - The user ids.
     * @property {Array<string>} roles - The role ids.
     * @property {string | null} messageReferenceId - The Message id used to reply.
     */

    /**
     * @typedef {Array<object>} Files
     * @property {string} name - The name of the file.
     * @property {string} description - The description that appears when you click the image.
     * @property {string | buffer} url - The URL or buffer of the image.
     */

class MessagePayload {

    /**
     * @typedef {Object} MessagePayloadData
     * @property {string} content - The content of the message.
     * @property {boolean} tts - If the message will be sended using TTs.
     * @property {Array<Object>} embeds - The embeds of the message.
     * @property {MentionsData} mentions - The mentiondata of the message.
     * @property {Array<Object>} components - The components of the message.
     * @property {Array<string>} stickers - The sticker ids of the message (or you can use sticker_ids).
     * @property {number} flags - The flags of the message.
     * @property {Files} files - The files of the message.
     * @property {number | undefined} nonce - The nonce of the message. (if any)
     * @property {Array<Object> | undefined} attachments - The attachments of the message. (if any)
     */

    #MENTIONS = ["users", "roles", "everyone"];
    
    #Data = {
        content: "",
        tts: false,
        embeds: [],
        allowed_mentions: {},
        message_reference: {},
        components: [],
        sticker_ids: [],
        files: [],
        nonce: Date.now(),
        attachments: []
    };

    #d;
    #files;

    /**
     * Creates a message payload to send messages.
     * @param {MessagePayloadData} data 
     * @param {Files} files 
     */
    constructor(data = {}) {
        this.#d = typeof data === "string" ? { content: data } : setObj(this.#Data, data, { sticker_ids: "stickers" });
        this.#files = [];

        if (this.#d.reply) {
            this.#d.message_reference = {};
            if (this.#d.reply.mention) {
                this.#d.allowed_mentions = {};
                this.#d.allowed_mentions.replied_user = true;
            }
            
            if (this.#d.reply.error === true) {
                this.#d.message_reference.fail_if_not_exists = true;
            }
            
            this.#d.message_reference.message_id = this.#d.reply.id;
        }
        
        if (this.#d.mentions) {
            this.#d.allowed_mentions = {};
            if (this.#d.mentions.parse) {
                this.#d.allowed_mentions.parse = this.#MENTIONS.filter(mention =>
                    this.#d.allowed_mentions.parse.some(allowedMention =>
                        mention.toLowerCase() === allowedMention?.toLowerCase()));
            }
            
            this.#d.allowed_mentions.users = this.#d.mentions.users?.[0] ? this.#d.mentions.users : null;
            this.#d.allowed_mentions.roles = this.#d.mentions.roles?.[0] ? this.#d.mentions.roles : null;
        }

        if (typeof this.#d.files === "object") {
            for (const i in this.#d.files) {
                if (this.#files[i].url && this.#files[i].name) {
                    this.#files.push({ name: this.#files[i].name, url: this.#files[i].url });
                    this.#d.attachments.push({ id: i, filename: this.#files[i].name, description: this.#files[i].description });
                }
            }
        }
        
        delete this.#d.reply;
        delete this.#d.mentions;
    }

    get payload() {
        return this.#d;
    }

    get files() {
        return this.#files;
    }
}

module.exports = { MessagePayload };
