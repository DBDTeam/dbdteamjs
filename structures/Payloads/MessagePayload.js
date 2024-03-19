const { setObj } = require("../../Utils/utils");

class MessagePayload {
    /**
     * @typedef {("users" | "roles" | "everyone")} MentionType
     */

    /**
     * @typedef {Object} MentionsData
     * @property {Array<MentionType>} parse
     * @property {Array<string>} users
     * @property {Array<string>} roles
     * @property {string | null} messageReferenceId
     */

    /**
     * @typedef {Array<object>} Files
     * @property {string} name
     * @property {string} description
     * @property {string | buffer} url
     */

    /**
     * @typedef {Object} MessagePayloadData
     * @property {string} content
     * @property {boolean} tts
     * @property {Array<Object>} embeds
     * @property {MentionsData} mentions
     * @property {Array<Object>} components
     * @property {Array<string>} sticker_ids
     * @property {number} flags
     * @property {Array<Object>} files
     * @property {number} nonce
     * @property {Array<Object>} attachments
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
     * Creates a message payload to send messages
     * @param {MessagePayloadData} data 
     * @param {Files} files 
     */
    constructor(data = {}) {
        this.#d = typeof data === "string" ? { content: data } : setObj(this.#Data, data, { sticker_ids: "stickers" });
        this.#files = [];

        if (this.#d.reply) {
            this.#d.allowed_mentions = {};
            this.#d.message_reference = {};
            if (this.#d.reply.mention) {
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
            
            this.#d.allowed_mentions.users = this.#d.mentions.users || [];
            this.#d.allowed_mentions.roles = this.#d.mentions.roles || [];
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