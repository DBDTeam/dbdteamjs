import { User } from "..";
import { type Client } from "../../client/Client";
import { MessageBodyRequest } from "../../common";
import { InteractionResponseData } from "../../common/types/interactions"
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
  async editInteractionResponse(obj: MessageBodyRequest | string) {
    const { user, rest } = this.client;
    if (!user) return null;

    const isString = typeof obj === "string";
    const { payload, files } = isString
      ? { payload: { content: obj }, files: null }
      : new EditMessagePayload(obj, obj.files);

    const response = await rest.request(
      "PATCH",
      Endpoints.InteractionOriginal(user.id, this.token),
      true,
      { data: payload },
      null,
      files
    );

    if (!response) return null;
    if (response.error) return response;
    if (response.data)
      return new InteractionResponse(
        {
          ...response.data,
          guild_id: this.guildId,
          token: this.token,
          interactionId: this.interaction_id,
        },
        this.client
      );
  }
}
