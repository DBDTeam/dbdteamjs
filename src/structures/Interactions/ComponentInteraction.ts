import {
  APIInteractionResponseCallbackData,
  APIMessageComponentInteraction,
  ComponentType,
} from "discord-api-types/v10";
import { Client } from "../../client/Client";
import { ComponentInteractionMessageUpdate } from "../../interfaces/other";
import * as Endpoints from "../../rest/Endpoints";
import { Guild } from "../Guild";
import { Member } from "../Member";
import { Message } from "../Message";
import { InteractionPayload } from "../Payloads/InteractionPayload";
import { User } from "../User";
import { InteractionBase } from "./BaseInteraction";
import { InteractionResponse } from "./InteractionResponse";

/**
 * Represents a ComponentInteraction.
 * @extends InteractionBase
 */
class ComponentInteraction extends InteractionBase {
  customId: string;
  componentType: ComponentType;
  readonly update: (
    obj: APIInteractionResponseCallbackData
  ) => Promise<InteractionResponse>;
  guildId: any;
  declare message: Message;
  declare member: Member;
  declare guild: string | Guild;
  declare user: User;

  /**
   * Creates an instance of ComponentInteraction.
   * @param {object} data - The ComponentInteraction Payload.
   * @param {Client} client - The Client
   */
  constructor(
    private data: APIMessageComponentInteraction,
    public client: Client
  ) {
    super(data, client);
    this.customId = data.data?.custom_id;
    this.componentType = data.data?.component_type;
    this.update = this.updateReply;

    this.patch();
  }

  /**
   * Checks if the ComponentInteraction is a Button.
   * @type {boolean}
   */
  get isButton(): boolean {
    return this.data.data?.component_type === ComponentType.Button;
  }

  /**
   * Checks if the ComponentInteraction is a SelectMenu.
   * @type {boolean}
   */
  get isSelectMenu(): boolean {
    return [
      ComponentType.StringSelect,
      ComponentType.UserSelect,
      ComponentType.RoleSelect,
      ComponentType.MentionableSelect,
      ComponentType.ChannelSelect,
    ].includes(this.data.data?.component_type);
  }

  /**
   * Checks if the ComponentInteraction is a Modal.
   * @type {boolean}
   */
  // ??
  // get isModal(): boolean {
  //   return this.data.type === InteractionType.ModalSubmit;
  // }

  /**
   * Updates the original reply.
   * @param {InteractionPayloadData} obj - The InteractionPayloadData
   * @returns {Promise<InteractionResponse>}
   */
  async updateReply(
    obj: ComponentInteractionMessageUpdate
  ): Promise<InteractionResponse> {
    const payload = new InteractionPayload(obj, obj.files);
    let { payload: _d, files } = payload;

    const data = { type: 7, data: _d };

    let response = await this.client.rest.request(
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

  /**
   * Patch method for initializing data properties.
   * @private
   */
  private patch(): void {
    this.message = new Message(this.data.message, this.client);
    const userData = this.data.member?.user;
    this.member = new Member(
      { ...this.data.member, id: userData?.id },
      this.guild,
      this.client
    );
    this.user = new User(userData, this.client);
  }
}

export { ComponentInteraction };
