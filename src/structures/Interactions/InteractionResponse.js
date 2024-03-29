const { readOnly } = require("../../utils/utils");
const { Message } = require("../Message");
const { EditMessagePayload } = require("../Payloads/EditMessagePayload");
const Endpoints = require("../../rest/Endpoints");

class InteractionResponse extends Message {
  constructor(data, client) {
    super(data, client);
    /**
     * The Client.
     * @type {Client}
     * @readonly
     */
    readOnly(this, "client", client);
    /**
     * The Interaction Token.
     * @type {string}
     * @readonly
     */
    readOnly(this, "token", data.token);
    /**
     * The Interaction Id.
     * @type {string}
     * @readonly
     */
    readOnly(this, "interactionId", data.interactionId);
    /**
     * The Interaction Data
     * @type {object}
     */
    this.interactionData = {
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

  async editInteractionResponse(obj) {
    const payload = new EditMessagePayload(obj, obj.files);
    var data = payload.payload,
      files = payload.files;

    const response = await this.client.rest.request(
      "PATCH",
      Endpoints.InteractionOriginal(this.client.user.id, this.token),
      true,
      { data },
      null,
      files
    );

    if (response.error) {
      return error;
    } else {
      return new InteractionResponse(
        {
          ...response.data,
          guild_id: this.guildId,
          token: this.token,
          interactionId: this.interactionId,
        },
        this.client
      );
    }
  }
}

module.exports = { InteractionResponse };
