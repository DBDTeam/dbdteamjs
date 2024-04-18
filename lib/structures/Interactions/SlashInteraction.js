"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashInteraction = void 0;
const __1 = require("../..");
const BaseInteraction_1 = require("./BaseInteraction");
class SlashInteraction extends BaseInteraction_1.InteractionBase {
    name;
    options;
    constructor(data, client) {
        super(data, client);
        this.name = data.data.name;
        this.options = new __1.Collection();
        for (var i of data.data?.options || []) {
            this.options.set(i.name, i);
        }
    }
}
exports.SlashInteraction = SlashInteraction;
