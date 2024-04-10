import { Channel } from "diagnostics_channel";
import { Client } from "your-client-module"; // Agrega el módulo del cliente si es posible.
import { readOnly } from "../../utils/utils";
import { Guild } from "../Guild";
import { Member } from "../Member";
import { EditMessagePayload } from "../Payloads/EditMessagePayload";
import { TextChannel } from "../TextChannel";
import { ThreadChannel } from "../ThreadChannel";
import { User } from "../User";
import { VoiceChannel } from "../VoiceChannel";
import { InteractionResponse } from "./InteractionResponse";

/**
 * Represents the base class for interactions.
 */
class InteractionBase {
  /**
   * The Client.
   * @name InteractionBase#client
   * @type {Client}
   * @readonly
   */
  public readonly client: Client;

  /**
   * The Interaction ID.
   * @type {string}
   * @readonly
   */
  public readonly interactionId: string;

  /**
   * The token of the Interaction.
   * @type {string}
   * @readonly
   */
  public readonly token: string;

  /**
   * The type of Interaction.
   * @type {number | undefined}
   */
  public type?: number;

  /**
   * The Guild ID.
   * @type {string}
   */
  public guildId: string;

  /**
   * The Guild.
   * @type {Guild}
   */
  public guild: Guild | undefined;

  /**
   * The Interaction Member.
   * @type {Member}
   */
  public member: Member | undefined;

  /**
   * The Channel where the Interaction was triggered.
   * @type {Channel | VoiceChannel | TextChannel | ThreadChannel}
   */
  public channel:
    | Channel
    | VoiceChannel
    | TextChannel
    | ThreadChannel
    | undefined;

  /**
   * The Interaction User.
   * @type {User}
   */
  public user: User | undefined;

  /**
   * Bitwise set of permissions the app has in the source location of the interaction.
   * @type {string}
   */
  public permissions: string;

  /**
   * The Guild Locale.
   * @type {string}
   */
  public guildLocale: string;

  /**
   * The raw data.
   * @type {object}
   */
  public rawData: object;

  #d: any;

  /**
   * Creates an instance of InteractionBase.
   * @param {object} data - The Interaction payload.
   * @param {Client} client - The Client.
   */
  constructor(data: any, client: Client) {
    this.client = client;
    this.token = data.token;
    this.interactionId = data.id;
    this.type = data.type;
    this.guildId = data.guild_id;
    this.guild = this.client.guilds.cache.get(this.guildId);
    this.member = new Member(
      { ...data.member, id: data.member.user.id },
      this.guild,
      this.client
    );
    this.channel = this.guild.channels.cache.get(data.channel_id);
    this.user = this.author;
    this.permissions = data.app_permissions;
    this.guildLocale = data.guild_locale;
    this.rawData = data.data;
    this.#d = data;
    this.id = data.data.id;

    readOnly(this, "token", this.token);
    readOnly(this, "interactionId", this.interactionId);
    readOnly(this, "reply", this.makeReply);
    readOnly(this, "showModal", this.modal);
  }

  /**
   * Returns whether the Interaction is a ComponentInteraction.
   * @type {boolean}
   */
  public get isComponent(): boolean {
    return !!this.rawData.custom_id;
  }

  /**
   * Returns whether the Interaction is a SlashInteraction.
   * @type {boolean}
   */
  public get isSlash(): boolean {
    return this.rawData.type === 1;
  }

  /**
   * Returns whether the Interaction is a UserInteraction.
   * @type {boolean}
   */
  public get isUser(): boolean {
    return this.rawData.type === 2;
  }

  /**
   * Returns whether the Interaction is a MessageInteraction.
   * @type {boolean}
   */
  public get isMessage(): boolean {
    return this.rawData.type === 3;
  }

  /**
   * Returns the Interaction Author.
   * @type {User}
   */
  public get author(): User | undefined {
    return this.member?.user;
  }

  /**
   * Makes a reply using the gateway.
   * @async
   * @param {?} obj - The InteractionPayloadData
   * @returns {Promise<InteractionResponse | object>}
   */
  public async makeReply(obj: any): Promise<InteractionResponse | object> {
    // Implementation remains same as in JavaScript
  }

  /**
   * Defers the reply.
   * @param {boolean} ephemeral - If the defer will be sent ephemerally.
   * @returns {Promise<Object>}
   * @async
   */
  public async deferReply(ephemeral: boolean): Promise<object> {
    // Implementation remains same as in JavaScript
  }

  /**
   * Edits the original response. (if any)
   * @async
   * @param {EditMessagePayload} obj - The EditMessagePayloadData
   * @returns {Promise<InteractionResponse | object>}
   */
  public async editReply(
    obj: EditMessagePayload
  ): Promise<InteractionResponse | object> {
    // Implementation remains same as in JavaScript
  }

  /**
   * Follows up the Interaction response.
   * @param {InteractionPayloadData} obj - The MessagePayloadData
   * @returns {Promise<InteractionResponse>}
   * @async
   */
  public async followUp(
    obj: InteractionPayloadData
  ): Promise<InteractionResponse> {
    // Implementation remains same as in JavaScript
  }

  /**
   * Sends a modal as the interaction response.
   * @param {InteractionPayloadData} obj - The ModalPayloadData
   * @returns {Promise<any>}
   * @async
   */
  public async modal(obj: InteractionPayloadData): Promise<any> {
    // Implementation remains same as in JavaScript
  }
}

export { InteractionBase };
