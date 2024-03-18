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

    /**
     * @type {Array<MentionType>}
     */
    #MENTIONS = ["users", "roles", "everyone"];
    
    #Data = {
        content: "",
        tts: false,
        embeds: [],
        mentions: { parse: [], users: [], roles: [], messageReferenceId: null },
        components: [],
        sticker_ids: [],
        flags: 0,
        files: [],
        nonce: Date.now(),
        attachments: []
    };

    #d;
    #files;
    #f;
    
    constructor(data = {}, files = []) {
        this.#d = typeof data == "string" ? data : setObj(this.#Data, data, { sticker_ids: "stickers" });
        this.#files = [];
        this.#f = files;
        if (typeof this.#d == "string") {
            var i = this.#d;
            this.#d = {};
            this.#d.content = i;
        }
        if (this.#d?.reply) {
            if ('mention' in this.#d.reply) {
                this.#d.mentions.replied_user = !!this.#d.reply.mention;
            }
            
            if ('error' in this.#d.reply) {
                // No se hace nada
            }
            
            if ('id' in this.#d.reply) {
                this.#d.mentions.messageReferenceId = this.#d.reply.id;
            } else {
                this.#d.mentions.messageReferenceId = null;
            }
        } else {
            this.#d.mentions.messageReferenceId = null;
        }   
        
        if (this.#d?.mentions) {
            if ('parse' in this.#d?.mentions) {
                this.#d.mentions.parse = this.#MENTIONS.filter(mention => this.#d?.mentions?.parse?.some(allowedMention => mention.toLowerCase() === allowedMention?.toLowerCase()));
            }
            
            if ('users' in this.#d?.mentions) {
                this.#d.mentions.users = this.#d?.mentions?.users;
            }
            
            if ('roles' in this.#d?.mentions) {
                this.#d.mentions.roles = this.#d?.mentions?.roles;
            }
        }

        if (typeof this.#f === "object") {
            for (var i in this.#f) {
                if ('url' in this.#f[i] && 'name' in this.#f[i]) {
                    this.#files.push({ name: this.#f[i].name, url: this.#f[i].url });
                    this.#d.attachments.push({ id: i, filename: this.#f[i].name, description: this.#f[i].description });
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