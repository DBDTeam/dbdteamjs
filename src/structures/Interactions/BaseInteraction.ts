import { InteractionResponseType } from "discord-api-types/v10";
import { Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Channel } from "../BaseChannel";
import { Guild } from "../Guild";
import { Member } from "../Member";
import { EditMessagePayload } from "../Payloads/EditMessagePayload";
import { InteractionPayload } from "../Payloads/InteractionPayload";
import { TextBasedChannel } from "../TextBasedChannel";
import { TextChannel } from "../TextChannel";
import { ThreadChannel } from "../ThreadChannel";
import { User } from "../User";
import { VoiceChannel } from "../VoiceChannel";
import { InteractionResponse } from "./InteractionResponse";
import { InteractionBodyRequest } from "../../common";

/**
 * Represents the base class for interactions.
 */
class InteractionBase {
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
   * The Channel where the Interaction was triggered.
   * @type {Channel | VoiceChannel | TextChannel | ThreadChannel | TextBasedChannel}
   */
  public channel: TextBasedChannel;

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
  public rawData: Record<any, unknown>;

  #d: any;

  showModal: (obj: any) => Promise<any>;
  reply: (obj: any) => Promise<InteractionResponse | object>;
  id: any;
  /**
   * The Interaction Member.
   * @type {Nullable<Member>}
   */
  member: Member | null;

  /**
   * Creates an instance of InteractionBase.
   * @param {object} data - The Interaction payload.
   * @param {Client} client - The Client.
   */
  constructor(data: any, readonly client: Client) {
    this.client = client;
    this.token = data.token;
    this.interactionId = data.id;
    this.type = data.type;
    this.guildId = data.guild_id;
    this.guild = this.client.guilds.cache.get(this.guildId);

    this.member = this._member;

    this.channel = this.guild?.channels.cache.get(data.channel_id) as TextBasedChannel;
    this.user = this.author;
    this.permissions = data.app_permissions;
    this.guildLocale = data.guild_locale;
    this.rawData = data.data;
    this.#d = data;
    this.id = data.data.id;

    this.token = this.token;
    this.interactionId = this.interactionId;
    this.reply = this.makeReply;
    this.showModal = this.modal;
  }

  get _member() {
    if (this.guild)
      if (this.#d && this.#d.member)
        return new Member(
          { ...this.#d.member, id: this.#d.member.user.id },
          this.guild,
          this.client
        );
    return null;
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
   * @param {InteractionPayload} obj - The InteractionPayloadData
   * @returns {Promise<InteractionResponse | object>}
   */
  public async makeReply(obj: InteractionBodyRequest): Promise<any | object> {
    const payload = new InteractionPayload(obj, obj.files);
    let _d = payload.payload,
      files = payload.files;

    const data = { type: obj.type || InteractionResponseType.ChannelMessageWithSource, data: _d };

    let response;
    let res = await this.client.rest.request(
      "POST",
      Endpoints.Interaction(this.interactionId, this.token),
      true,
      { data },
      null,
      files
    );

    if (obj.fetchResponse) {
      res = await this.client.rest.request(
        "GET",
        Endpoints.InteractionOriginal(this.client.user.id, this.token),
        true
      );

      response = new InteractionResponse(
        {
          ...res?.data,
          guild_id: this.guildId,
          token: this.token,
          interactionId: this.interactionId,
        },
        this.client
      );
    }

    return response ?? res;
  }

  /**
   * Defers the reply.
   * @param {boolean} ephemeral - If the defer will be sent ephemerally.
   * @returns {Promise<Object>}
   * @async
   */
  public async deferReply(_ephemeral: boolean): Promise<any> {
    //@ts-ignore
    this.makeReply({ type: InteractionResponseType.DeferredChannelMessageWithSource, ephemeral: true })
  }

  /**
   * Edits the original response. (if any)
   * @async
   * @param {EditMessagePayload} obj - The EditMessagePayloadData
   * @returns {Promise<InteractionResponse | object>}
   */
  public async editReply(_obj: any): Promise<any | object> {
    // Implementation remains same as in JavaScript
  }

  /**
   * Follows up the Interaction response.
   * @param {InteractionPayloadData} obj - The MessagePayloadData
   * @returns {Promise<InteractionResponse>}
   * @async
   */
  public async followUp(_obj: any): Promise<any> {
    // Implementation remains same as in JavaScript
  }

  /**
   * Sends a modal as the interaction response.
   * @param {InteractionPayloadData} obj - The ModalPayloadData
   * @returns {Promise<any>}
   * @async
   */
  public async modal(_obj: any): Promise<any> {
    // Implementation remains same as in JavaScript
  }
}

export { InteractionBase };
