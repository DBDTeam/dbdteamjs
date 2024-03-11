const { setObj } = require("../../Utils/utils");

class MessagePayload {
    #MENTIONS = ["users", "roles", "everyone"]
    #Data = {
        content: "",
        tts: false,
        embeds: [],
        allowed_mentions: { parse: [], users: [], roles: []},
        message_reference: { message_id: null, fail_if_not_exists: true },
        components: [],
        sticker_ids: [],
        flags: 0,
        files: [],
        nonce: Date.now(),
        attachments: []
    }
    #d;
    #files;
    #f;
    constructor(data = {}, files = []) {
        this.#d = typeof data == "string" ? data : setObj(this.#Data, data, { sticker_ids: "stickers" })
        this.#files = [];
        this.#f = files
        if(typeof this.#d == "string"){ var i = this.#d; this.#d = {}; this.#d.content = i };
        if (this.#d?.reply) {
            if ('mention' in this.#d.reply) {
                this.#d.allowed_mentions.replied_user = !!this.#d.reply.mention
            }
            
            if ('error' in this.#d.reply) {
                this.#d.message_reference.fail_if_not_exists = !!this.#d.reply.error
            }
            
            if ('id' in this.#d.reply) {
                this.#d.message_reference.message_id = this.#d.reply.id
            } else {
                delete this.#d.message_reference
            }
        } else {
            delete this.#d.message_reference
        }   
        
        if(this.#d?.mentions) {
            if ('parse' in this.#d?.mentions) {
                this.#d.allowed_mentions.parse = this.#MENTIONS.filter(mention => this.#d?.mentions?.parse?.some(allowedMention => mention.toLowerCase() === allowedMention?.toLowerCase()))
            }
            
            if ('users' in this.#d?.mentions) {
                this.#d.allowed_mentions.users = this.#d?.mentions?.users
            }
            
            if ('roles' in this.#d?.mentions) {
                this.#d.allowed_mentions.roles = this.#d?.mentions?.roles
            }
        }

        if (typeof this.#f === "object") {
            for (var i in this.#f) {
                if ('url' in this.#f[i] && 'name' in this.#f[i]) {
                    this.#files.push({ name: this.#f[i].name, url: this.#f[i].url })
                    this.#d.attachments.push({ id: i, filename: this.#f[i].name, description: this.#f[i].description })
                }
            }
        }
        delete this.#d.reply
        delete this.#d.mentions
    }

    get payload() {
        return this.#d
    }

    get files() {
        return this.#files
    }
}

module.exports = { MessagePayload }