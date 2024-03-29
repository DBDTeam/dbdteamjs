const { Collection } = require("../../utils/Collection");
const { ComponentInteraction } = require("./ComponentInteraction");

class InteractionModal extends ComponentInteraction {
  /**
   * Represents a InteractionModal.
   * @param {object} data - The InteractionModalPayload.
   * @param {Client} client - The Client.
   */
  constructor(data, client) {
    super(data, client);
    /**
     * The inputs of the InteractionModal.
     * @type {Collection}
     */
    this.inputs = new Collection();
    this.___patch(data);
  }

  ___patch(data) {
    for (var i of data.data.components) {
      for (var x of i.components) {
        if (x.type === 4) {
          this.inputs.set(x.custom_id, x.value);
        }
      }
    }
  }
}

module.exports = { InteractionModal };
