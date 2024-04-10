import { ComponentInteraction } from "./ComponentInteraction";

export class ButtonInteraction extends ComponentInteraction {
  /**
   * Represents a ButtonInteraction.
   * @extends ComponentInteraction
   * @param {object} data - The ButtonInteraction PayloadData.
   * @param {Client} client - The Client.
   */
  constructor(data, client) {
    super(data, client);
  }
}
