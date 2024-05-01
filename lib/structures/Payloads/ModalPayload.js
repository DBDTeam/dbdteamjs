"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionModalPayload = void 0;
const utils_1 = require("../../utils/utils");
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
    constructor(data) {
        this.#d = (0, utils_1.setObj)(this.#DATA, data, { custom_id: "customId" });
        for (var i in this.#d?.components) {
            const d = this.#d.components[i];
            for (var x in d?.components) {
                var _data = (0, utils_1.setObj)(this.#COMPONENT_DATA, this.#d.components[i]?.components[x], {
                    custom_id: "customId",
                    min_length: ["minlength", "min"],
                    max_length: ["max", "maxlength"],
                });
                this.#d.components[i].components[x] = _data;
                try {
                    delete this.#d.components[i]?.components[x].customId;
                }
                catch (err) { }
            }
        }
    }
    /**
     * Returns the clean payload.
     * @type {ModalPayloadData}
     */
    get payload() {
        return this.#d;
    }
}
exports.InteractionModalPayload = InteractionModalPayload;
