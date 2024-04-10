import { Client } from "../../client/Client"; // Agrega el módulo del cliente si es posible.
import { Collection } from "../../utils/Collection";
import { ComponentInteraction } from "./ComponentInteraction";

/**
 * Represents an InteractionModal.
 * @extends ComponentInteraction
 */
class InteractionModal extends ComponentInteraction {
  /**
   * Creates an instance of InteractionModal.
   * @param {object} data - The InteractionModalPayload.
   * @param {Client} client - The Client.
   */
  constructor(data: any, client: Client) {
    super(data, client);
    /**
     * The inputs of the InteractionModal.
     * @type {Collection}
     */
    this.inputs = new Collection();
    this.___patch(data);
  }

  /**
   * Patch method for initializing inputs.
   * @param {object} data - The InteractionModalPayload.
   * @private
   */
  private ___patch(data: any): void {
    for (let i of data.data.components) {
      for (let x of i.components) {
        if (x.type === 4) {
          this.inputs.set(x.custom_id, x.value);
        }
      }
    }
  }
}

export { InteractionModal };
