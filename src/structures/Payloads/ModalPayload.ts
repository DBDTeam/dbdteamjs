import { setObj } from "../../utils/utils";

/**
 * @template T
 * @typedef {Array<T>} ActionRow -The Components of a response.
 * @property {number} type - The type (For action rows is 1)
 * @property {Array<Object>} components - The Components that will be added in the action row.
 */

/**
 * @typedef {Array<any>} ModalComponents - The Components of a Modal.
 * @property {number} [type=4] - The type (for TextInputs is 4)
 * @property {number} customId - The customId of the option.
 * @property {string} label - The label of the option.
 * @property {number} [style=1] - The style of the option. (1 for Short & 2 for Paragraph)
 * @property {number} [min_length] - Minimum input length for a text input; min 0, max 4000
 * @property {number} [max_length] - Maximum input length for a text input; min 1, max 4000
 * @property {boolean} [required = true] - Whether this component is required to be filled (defaults to true)
 * @property {string} [value] - Pre-filled value for this component; max 4000 characters
 * @property {string} [placeholder] - Custom placeholder text if the input is empty; max 100 characters
 */

/**
 * @typedef ModalPayloadData - The ModalPayload data to submit modals.
 * @property {string} customId - The custom id of the Modal.
 * @property {string} title - The title of the modals.
 * @property {ActionRow<ModalComponents>} components - The ModalComponents.
 */

class InteractionModalPayload {
  #d;
  #DATA = {
    custom_id: "",
    title: "",
    components: [],
  };
  #COMPONENT_DATA = {
    type: 4,
    custom_id: "",
    label: "",
    style: 1,
    min_length: 0,
    max_length: 1,
    required: true,
    value: null,
    placeholder: null,
  };
  /**
   * Represents a InteractionModalPayload
   * @param {ModalPayloadData} data - The ModalPayloadData.
   */
  constructor(data: any) {
    this.#d = setObj(this.#DATA, data, { custom_id: "customId" });

    for (var i in this.#d?.components) {
      const d = this.#d.components[i];
      for (var x in d?.components) {
        var _data = setObj(
          this.#COMPONENT_DATA,
          this.#d.components[i]?.components[x],
          {
            custom_id: "customId",
            min_length: ["minlength", "min"],
            max_length: ["max", "maxlength"],
          }
        );
        this.#d.components[i].components[x] = _data;
        try {
          delete this.#d.components[i]?.components[x].customId;
        } catch (err) {}
      }
    }
  }
  /**
   * Returns the clean payload.
   * @type {ModalPayloadData}
   */
  get payload() {
    //console.log(this.#d.components[0].components[0])
    return this.#d;
  }
}

module.exports = { InteractionModalPayload };
