import { type Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Message } from "../Message";
import { EditMessagePayload } from "../Payloads/EditMessagePayload";

export class InteractionResponse extends Message {
  /**
   * The Interaction Token.
   * @type {string}
   * @readonly
   */
  readonly token: string;
  /**
   * The Interaction Id.
   * @type {string}
   * @readonly
   */
  readonly interaction_id: string;
  /**
   * The Interaction Data
   * @type {object}
   */
  interaction_data: Record<string, any>;

  constructor(data: any, readonly client: Client) {
    super(data, client);
    this.client = client;
    this.token = data.token;
    this.interaction_id = data.interaction_id;
    this.interaction_data = {
      name: data.interaction?.name ?? data.interaction_metadata?.name,
      id: data.interaction?.id ?? data.interaction_metadata?.id,
      type: data.interaction?.type ?? data.interaction_metadata?.type,
      user: client.users.cache.get(
        data.interaction?.user?.id ?? data.interaction_metadata?.user_id
      ),
      userId: data.interaction?.user?.id ?? data.interaction_metadata?.user_id,
    };
  }

  /**
   * Edits the Actual Interaction Response.
   * @param {EditMessagePayload} obj - The EditMessagePayloadData
   * @returns {InteractionResponse}
   */

  async editInteractionResponse(obj: string | EditMessagePayload) {
    let files;
    if (typeof obj === "string" || obj instanceof String) {
      var data = { content: obj };
    } else {
      const payload = new EditMessagePayload(obj, obj.files);
      data = payload.payload as any;
      files = payload.files;
    }

    if (!this.client.user) return null;

    const response = await this.client.rest.request(
      "PATCH",
      Endpoints.InteractionOriginal(this.client.user.id, this.token),
      true,
      { data },
      null,
      files
    );

    if (response?.error) {
      return response
    } else {
      return new InteractionResponse(
        {
          ...response?.data,
          guild_id: this.guildId,
          token: this.token,
          interactionId: this.interaction_id,
        },
        this.client
      );
    }
  }
}
