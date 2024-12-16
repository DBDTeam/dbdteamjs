"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashInteraction = void 0;
const BaseInteraction_1 = require("./BaseInteraction");
const Collection_1 = require("../../utils/Collection");
class SlashInteraction extends BaseInteraction_1.InteractionBase {
    /**
     * The name of the slash
     */
    name;
    /**
     * The values of the slash.
     */
    values;
    constructor(data, client) {
        super(data, client);
        this.name = data.data.name;
        this.values = new Collection_1.Collection();
        for (var i of data.data?.options || []) {
            this.values.set(i.name, i);
        }
    }
}
exports.SlashInteraction = SlashInteraction;
