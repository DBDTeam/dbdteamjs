import { setObj } from "../../utils/utils";

/**
 * @typedef {import("@types").InteractionPayloadData} InteractionPayloadData
 * @typedef {import("@types").MentionType} MentionType
 */

class InteractionPayload {
  /**
   * @type {MentionType[]}
   */
  #MENTIONS = ["users", "roles", "everyone"];
  #Data = {
    content: "",
    tts: false,
    embeds: [],
    allowed_mentions: { parse: [], users: [], roles: [] },
    components: [],
    flags: 0,
    files: [],
    attachments: [],
    ephemeral: !1,
  };
  /**
   * @type {InteractionPayloadData}
   */
  #d;
  #files;
  #f;
  constructor(data = {}, files = []) {
    this.#d = typeof data == "string" ? data : setObj(this.#Data, data);
    this.#files = [];
    this.#f = files;
    if (typeof this.#d == "string") {
      var i = this.#d;
      this.#d = {};
      this.#d.content = i;
    }

    if (this.#d?.mentions) {
      if ("parse" in this.#d?.mentions) {
        this.#d.allowed_mentions.parse = this.#MENTIONS.filter((mention) =>
          this.#d?.mentions?.parse?.some(
            (allowedMention) =>
              mention.toLowerCase() === allowedMention?.toLowerCase()
          )
        );
      }

      if ("users" in this.#d?.mentions) {
        this.#d.allowed_mentions.users = this.#d?.mentions?.users;
      }

      if ("roles" in this.#d?.mentions) {
        this.#d.allowed_mentions.roles = this.#d?.mentions?.roles;
      }
    }

    if (this.#d.ephemeral === true) {
      this.#d.flags |= 64;
    }

    if (typeof this.#f === "object") {
      for (let i in this.#f) {
        if ("url" in this.#f[i] && "name" in this.#f[i]) {
          this.#files.push({ name: this.#f[i].name, url: this.#f[i].url });
          this.#d.attachments.push({
            id: i,
            filename: this.#f[i].name,
            description: this.#f[i].description,
          });
        }
      }
    }
    delete this.#d.mentions;
    delete this.#d.ephemeral;
  }

  get payload() {
    return this.#d;
  }

  get files() {
    return this.#files;
  }
}

module.exports = { InteractionPayload };
