import { APIInteractionResponseCallbackData } from "discord-api-types/v10";
import { User } from "..";
import { type Client } from "../../client/Client";
import { ClientTypeError } from "../../client/errors/ClientError";
import { ErrorNames } from "../../client/errors/ErrorList";
import { InteractionResponseData, MessageBodyRequest } from "../../common";
import * as Endpoints from "../../rest/Endpoints";
import { Message } from "../Message";
import { EditMessagePayload } from "../Payloads/EditMessagePayload";
export class InteractionResponse extends Message {
  /** 
   * The token of the interaction response
   * @type {string}
   * @readonly
   */
  readonly token;
  /** 
   * The id of the interaction response
   * @type {string} 
   * @readonly 
   */
  readonly interaction_id;
  /** 
   * The interaction data
   * @type {object}
   */
  interaction_data: InteractionResponseData;

  constructor(data: any, readonly client: Client) {
    super(data, client);
    this.guildId = data.guild_id
    this.token = data.token;
    this.interaction_id = data.interaction_id;
    const interaction = data.interaction || data.interaction_metadata;
    this.interaction_data = {
      name: interaction?.name,
      id: interaction?.id,
      type: interaction?.type,
      user: client.users.cache.get(
        interaction?.user?.id || interaction?.user_id
      ) as User,
      userId: interaction?.user?.id || interaction?.user_id,
    };
  }

  /**
   * Edits the Interaction Response.
   * @param {string | MessageBodyRequest} obj - The EditMessagePayloadData
   * @returns {Promise<InteractionResponse | null>}
   */
  async editInteractionResponse(body: MessageBodyRequest | string) {
    if (typeof body === "string" || body instanceof String) {
      body = { content: body } as MessageBodyRequest;
    }

    if (body && typeof body !== "object")
      throw new ClientTypeError(ErrorNames.InvalidType, "boolean", "body");

    const message = new EditMessagePayload(body, body?.files)

    const response = await this.client.rest.request<APIInteractionResponseCallbackData>(
      "PATCH",
      Endpoints.InteractionOriginal(this.client.user.id, this.token),
      true,
      message.payload,
      null,
      message.files
    );

    if (!response) return null;
    if (response.error) return response;
      return new InteractionResponse(
        {
          ...response,
          guild_id: this.guildId,
          token: this.token,
          interactionId: this.interaction_id,
        },
        this.client
      );
  }
}
