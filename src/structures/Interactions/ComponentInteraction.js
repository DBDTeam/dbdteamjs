const { User } = require("../User");
const { Member } = require("../Member");
const { ComponentTypes } = require("../../types/Interactions");
const { Message } = require("../Message");
const { InteractionBase } = require("./BaseInteraction");
const { InteractionPayload } = require("../Payloads/InteractionPayload");
const Endpoints = require("../../rest/Endpoints");
const { readOnly } = require("../../utils/utils");
const { InteractionResponse } = require("./InteractionResponse");

class ComponentInteraction extends InteractionBase {
  #d;
  /**
   * Represents a ComponentInteraction.
   * @extends InteractionBase
   * @param {object} data - The ComponentInteraction Payload.
   * @param {Client} client - The Client
   */
  constructor(data, client) {
    super(data, client);
    /**
     * The CustomId of the Interaction.
     * @type {string}
     */
    this.customId = data.data.custom_id;
    /**
     * The componentType of the Interaction.
     * @type {string}
     */
    this.componentType = data.data.component_type;
    this.#d = data;
    /**
     * Updates the original response.
     * {@link ComponentInteraction#updateReply}
     * @async
     */
    readOnly(this, "update", this.updateReply);
    this._patch();
  }

  /**
   * Check if the ComponentInteraction is a Button.
   * @type {boolean}
   */

  get isButton() {
    return this.#d.data?.component_type === ComponentTypes.Button;
  }

  /**
   * Check if the ComponentInteraction is a SelectMenu.
   * @type {boolean}
   */

  get isSelectMenu() {
    return [
      ComponentTypes.String,
      ComponentTypes.User,
      ComponentTypes.Role,
      ComponentTypes.Mentionable,
      ComponentTypes.Channel,
    ].includes(this.#d.data?.component_type);
  }

  /**
   * Check if the ComponentInteraction is a Modal.
   * @type {boolean}
   */

  get isModal() {
    return this.#d.type === 5;
  }

  /**
   * Updates the original reply.
   * @param {InteractionPayloadData} obj - The InteractionPayloadData
   * @returns {InteractionResponse}
   */

  async updateReply(obj) {
    const payload = new InteractionPayload(obj, obj.files);
    var _d = payload.payload,
      files = payload.files;

    const data = { type: 7, data: _d };

    const response = await this.client.rest.request(
      "POST",
      Endpoints.Interaction(this.interactionId, this.token),
      true,
      { data },
      null,
      files
    );

    if (obj.fetchResponse || obj.fetchReply) {
      response = await this.client.rest.request(
        "GET",
        Endpoints.InteractionOriginal(this.client.user.id, this.token),
        true
      );

      response = new InteractionResponse(
        {
          ...response.data,
          guild_id: this.guildId,
          token: this.token,
          interactionId: this.interactionId,
        },
        this.client
      );
    }

    return response;
  }

  _patch() {
    this.message = new Message(this.#d.message, this.client);
    const userData = this.#d.member.user;
    this.member = new Member(
      { ...this.#d.member, id: userData.id },
      this.guild,
      this.client
    );
    this.user = new User(userData, this.client);
  }
}

module.exports = { ComponentInteraction };
