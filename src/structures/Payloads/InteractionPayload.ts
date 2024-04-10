import { setObj } from "../../utils/utils";

/**
 * Represents the data structure of an interaction payload.
 */
export class InteractionPayload {
  /**
   * Array containing mention types.
   * @type {MentionType[]}
   * @private
   */
  private readonly MENTIONS: string[] = ["users", "roles", "everyone"];

  /**
   * Default data structure for the interaction payload.
   * @type {unknown}
   * @private
   */
  private readonly Data: any = {
    content: "",
    tts: false,
    embeds: [],
    allowed_mentions: { parse: [], users: [], roles: [] },
    components: [],
    flags: 0,
    files: [],
    attachments: {},
    ephemeral: false,
  };

  /**
   * Interaction payload data.
   * @type {APIInteraction}
   * @private
   */
  private d: any;

  /**
   * Files associated with the payload.
   * @type {any[]}
   * @private
   */
  private _files: any[];

  /**
   * Additional file information.
   * @type {any[]}
   * @private
   */
  private f: any[];

  /**
   * Creates an instance of InteractionPayload.
   * @param {any} [data={}] - Interaction payload data.
   * @param {any[]} [files=[]] - Files associated with the payload.
   */
  constructor(data: any = {}, files: any[] = []) {
    this.d =
      typeof data === "string" ? { content: data } : setObj(this.Data, data);

    this._files = [];
    this.f = files;

    if ("mentions" in this.d && this.d?.mentions) {
      if ("parse" in this.d?.mentions) {
        this.d.allowed_mentions.parse = this.MENTIONS.filter((mention) =>
          this.d?.mentions?.parse?.some(
            (allowedMention: string) =>
              mention.toLowerCase() === allowedMention?.toLowerCase()
          )
        );
      }

      if ("users" in this.d?.mentions) {
        this.d.allowed_mentions.users = this.d?.mentions?.users;
      }

      if ("roles" in this.d?.mentions) {
        this.d.allowed_mentions.roles = this.d?.mentions?.roles;
      }
    }

    if (this.d.ephemeral === true) {
      this.d.flags |= 64;
    }

    if (typeof this.f === "object") {
      for (let i in this.f) {
        if ("url" in this.f[i] && "name" in this.f[i]) {
          this._files.push({ name: this.f[i].name, url: this.f[i].url });
          this.d.attachments.push({
            id: i,
            filename: this.f[i].name,
            description: this.f[i].description,
          });
        }
      }
    }

    delete this.d.mentions;
    delete this.d.ephemeral;
  }

  /**
   * Returns the interaction payload data.
   * @returns {unknown} The interaction payload data.
   */
  get payload(): unknown {
    return this.d;
  }

  /**
   * Returns the files associated with the payload.
   * @returns {any[]} The files associated with the payload.
   */
  get files(): any[] {
    return this.files;
  }
}
