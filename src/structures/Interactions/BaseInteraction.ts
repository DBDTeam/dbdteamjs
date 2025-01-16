import {
  APIInteractionResponseCallbackData,
  InteractionResponseType,
  InteractionType,
} from "discord-api-types/v10";
import { Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Guild } from "../Guild";
import { Member } from "../Member";
import { InteractionPayload } from "../Payloads/InteractionPayload";
import { User } from "../User";
import { InteractionResponse } from "./InteractionResponse";
import {
  InteractionBodyRequest,
  MessageBodyRequest,
  MessageUpdateBodyRequest,
  Nullable,
} from "../../common";
import { MessagePayload } from "../Payloads/MessagePayload";
import { EditMessagePayload } from "../Payloads/EditMessagePayload";
import {
  InteractionModalPayload,
  ModalPayloadData,
} from "../Payloads/ModalPayload";
import { SlashInteraction } from "./SlashInteraction";
import { ComponentInteraction } from "./ComponentInteraction";
import { UserInteraction } from "./UserInteraction";
import { ClientError, ClientTypeError } from "../../client/errors/ClientError";
import { ErrorNames } from "../../client/errors/ErrorList";
import { RESTResponse } from "../../rest/requestHandler";
import { GuildTextBasedChannel } from "../GuildTextBasedChannel";

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
   * @type {InteractionType | undefined}
   */
  public type?: InteractionType;

  /**
   * The Guild ID.
   * @type {string}
   */
  public guildId: string;

  /**
   * The Guild.
   * @type {Guild}
   */
  public guild: Guild;

  /**
   * The Channel where the Interaction was triggered.
   * @type {GuildTextBasedChannel}
   */
  public channel: GuildTextBasedChannel;

  /**
   * The Interaction User.
   * @type {User | undefined}
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

  /**
   * Sends a modal as the interaction response.
   * @async
   * @param {ModalPayloadData} body - The ModalPayloadData
   * @returns {Promise<InteractionResponse | ResponseFromApi>}
   */
  showModal: (
    body: ModalPayloadData
  ) => Promise<Nullable<InteractionResponse | RESTResponse>>;

  /**
   * Makes a reply using the gateway.
   * @async
   * @param {InteractionBodyRequest} obj - The InteractionPayloadData
   * @returns {Promise<Nullable<InteractionResponse | ResponseFromApi>>}
   */
  reply: (
    obj: InteractionBodyRequest | string
  ) => Promise<Nullable<InteractionResponse | RESTResponse>>;

  /**
   * The ID of the interaction.
   * @type {any}
   */
  id: any;

  /**
   * The Interaction Member.
   * @type {Member | null}
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
    this.guild = this.client.guilds.cache.get(this.guildId) as Guild;

    this.member = new Member(
      { ...data.member, id: data.member.user.id },
      this.guild,
      this.client
    );

    this.channel = this.guild?.channels.cache.get(
      data.channel_id
    ) as GuildTextBasedChannel;
    this.user = new User(data.member.user, this.client);
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
  /**
   * Returns whether the Interaction is a ComponentInteraction.
   * @returns {boolean}
   */
  public isComponent(): this is ComponentInteraction {
    return !!this.rawData.custom_id;
  }

  /**
   * Returns whether the Interaction is a SlashInteraction.
   * @returns {boolean}
   */
  public isSlash(): this is SlashInteraction {
    return this.rawData.type === 1;
  }

  /**
   * Returns whether the Interaction is a UserInteraction.
   * @returns {boolean}
   */
  public isUser(): this is UserInteraction {
    return this.rawData.type === 2;
  }

  /**
   * Returns whether the Interaction is a MessageInteraction.
   * @returns {boolean}
   */
  public get isMessage(): boolean {
    return this.rawData.type === 3;
  }

  /**
   * Returns the Interaction Author.
   * @type {User | undefined}
   */
  public get author(): User | undefined {
    return this.user;
  }

  /**
   * Makes a reply using the gateway.
   * @private
   * @async
   * @param {InteractionPayload} obj - The InteractionPayloadData
   * @returns {Promise<Nullable<InteractionResponse | ResponseFromApi>>}
   */
  private async __makeReply(
    obj: any
  ): Promise<Nullable<InteractionResponse | RESTResponse>> {
    const data = { type: obj.type, data: obj.data };

    var response;
    var request = await this.client.rest.request<APIInteractionResponseCallbackData>(
      "POST",
      Endpoints.Interaction(this.interactionId, this.token),
      true,
      data,
      null,
      data?.data?.files
    );

    if (obj.fetchResponse) {
      request = await this.client.rest.request<APIInteractionResponseCallbackData>(
        "GET",
        Endpoints.InteractionOriginal(this.client.user.id, this.token),
        true
      );

      if(!request?.error) return null;

      response = new InteractionResponse(
        {
          ...request,
          guild_id: this.guildId,
          token: this.token,
          interactionId: this.interactionId,
        },
        this.client
      );
    }

    return response;
  }

  /**
   * Makes a reply using the gateway.
   * @async
   * @param {InteractionBodyRequest} obj - The InteractionPayloadData
   * @returns {Promise<Nullable<InteractionResponse | ResponseFromApi>>}
   */
  public async makeReply(
    obj: InteractionBodyRequest | string
  ): Promise<Nullable<InteractionResponse | RESTResponse>> {
    if (typeof obj === "string" || obj instanceof String) {
      obj = { content: obj } as InteractionBodyRequest;
    }
    const payload = new InteractionPayload(obj, obj.files);
    let _d = payload.payload as Record<any, any>,
      files = payload.files;

    const data = {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { ..._d, files },
      fetchResponse: obj.fetchResponse,
    };

    const response = this.__makeReply(data);

    return response;
  }

  /**
   * Defers the reply.
   * @async
   * @param {boolean} ephemeral - If the defer will be sent ephemerally.
   * @returns {Promise<InteractionResponse | object>}
   */
  public async deferReply(ephemeral?: boolean): Promise<any> {
    if (ephemeral && typeof ephemeral !== "boolean")
      throw new ClientTypeError(ErrorNames.InvalidType, "boolean", "ephemeral");
    ephemeral = !!ephemeral;
    this.__makeReply({
      type: InteractionResponseType.DeferredChannelMessageWithSource,
      ephemeral,
    });
  }

  /**
   * Edits the original response. (if any)
   * @async
   * @param {MessageUpdateBodyRequest | string} body - The Body of the new Message.
   * @returns {Promise<InteractionResponse | ErrorResponseFromApi>}
   */
  public async editReply(
    body: MessageUpdateBodyRequest | string
  ): Promise<Nullable<InteractionResponse | RESTResponse>> {
    if (typeof body === "string" || body instanceof String) {
      body = { content: body as string };
    }

    if (body && typeof body !== "object")
      throw new ClientTypeError(ErrorNames.InvalidType, "object", "body");
    if (
      !body?.content &&
      !body.files &&
      !body.embeds &&
      !body.poll &&
      !body.sticker_ids
    )
      throw new ClientError(
        ErrorNames.MissingRequiredProperties,
        "Interaction response",
        ["content", "files", "embeds", "poll", "sticker_ids"]
      );

    const MessagePayloadData = new EditMessagePayload(body, body.files);

    const [data, files] = [
      MessagePayloadData.payload,
      MessagePayloadData.files,
    ];

    const request = await this.client.rest.request<APIInteractionResponseCallbackData>(
      "PATCH",
      Endpoints.InteractionOriginal(this.client.user.id, this.token),
      true,
      data,
      null,
      files
    );

    if(!request) return null;

    if (request?.error)
      return request as RESTResponse;

    const message = new InteractionResponse(request, this.client);

    return message;
  }

  /**
   * Follows up the Interaction response.
   * @async
   * @param {MessageBodyRequest} body - The Body of the new Message.
   * @returns {Promise<InteractionResponse>}
   */
  public async followUp(body: MessageBodyRequest | string): Promise<any> {
    if (typeof body === "string" || body instanceof String) {
      body = { content: body } as MessageBodyRequest;
    }

    if (body && typeof body !== "object")
      throw new ClientTypeError(ErrorNames.InvalidType, "boolean", "body");
    if (
      !body?.content &&
      !body.files &&
      !body.embeds &&
      !body.poll &&
      !body.sticker_ids
    )
      throw new ClientError(
        ErrorNames.MissingRequiredProperties,
        "Interaction response",
        ["content", "files", "embeds", "poll", "sticker_ids"]
      );

    const MessagePayloadData = new MessagePayload(body, body.files);

    const [data, files] = [
      MessagePayloadData.payload,
      MessagePayloadData.files,
    ];

    const request = await this.client.rest.request<APIInteractionResponseCallbackData>(
      "POST",
      Endpoints.InteractionCreateFollowUp(this.client.user.id, this.token),
      true,
      data,
      null,
      files
    );

    if (!request || request?.error) return request;

    const message = new InteractionResponse(request, this.client);

    return message;
  }

  /**
   * Sends a modal as the interaction response.
   * @async
   * @param {ModalPayloadData} body - The ModalPayloadData
   * @returns {Promise<InteractionResponse | ResponseFromApi>}
   */
  public async modal(
    body: ModalPayloadData
  ): Promise<Nullable<InteractionResponse | RESTResponse>> {
    if (body && typeof body !== "object")
      throw new ClientTypeError(ErrorNames.InvalidType, "boolean", "body");

    const ModalData = new InteractionModalPayload(body);

    const payload = ModalData.payload;

    const response = await this.__makeReply({
      type: InteractionResponseType.Modal,
      data: payload,
    });

    return response;
  }
}

export { InteractionBase };
