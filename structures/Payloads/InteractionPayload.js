const { setObj } = require("../../Utils/utils");

/**
 * @typedef InteractionPayloadData - At least one of the options (content or embeds) must be placed and not undefined.
 * @property {string} [content] - The content of the Interaction response.
 * @property {boolean} [tts=false] - If the message will be sended using TTS.
 * @property {Array<object>} [embeds] - The embeds of the Interaction response.
 * @property {MentionsData} [mentions] - The MentionsData of the Interaction response.
 * @property {Array<object>} [components] - The components of the Interaction response.
 * @property {number} [flags] - The flags of the Interaction response. (is not needed to use 64, exists the option called 'ephemeral')
 * @property {Files} [files] - The files of the Interaction response.
 * @property {object} [attachments] - The attachments of the Interaction response.
 * @property {boolean} [ephemeral=false] - Yes, the Interaction response will be sent ephemerally.
 */

class InteractionPayload {
    #MENTIONS = ["users", "roles", "everyone"]
    #Data = {
        content: "",
        tts: false,
        embeds: [],
        allowed_mentions: { parse: [], users: [], roles: []},
        components: [],
        flags: 0,
        files: [],
        attachments: [],
        ephemeral: !1
    }
    #d;
    #files;
    #f;
    constructor(data = {}, files = []) {
        this.#d = typeof data == "string" ? data : setObj(this.#Data, data)
        this.#files = [];
        this.#f = files
        if(typeof this.#d == "string"){ var i = this.#d; this.#d = {}; this.#d.content = i };
        
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

        if(this.#d.ephemeral === true){
            this.#d.flags |= 64
        }

        if (typeof this.#f === "object") {
            for (var i in this.#f) {
                if ('url' in this.#f[i] && 'name' in this.#f[i]) {
                    this.#files.push({ name: this.#f[i].name, url: this.#f[i].url })
                    this.#d.attachments.push({ id: i, filename: this.#f[i].name, description: this.#f[i].description })
                }
            }
        }
        delete this.#d.mentions
        delete this.#d.ephemeral
    }

    get payload() {
        return this.#d
    }

    get files() {
        return this.#files
    }
}

module.exports = { InteractionPayload }