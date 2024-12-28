"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashInteraction = void 0;
const BaseInteraction_1 = require("./BaseInteraction");
const Collection_1 = require("../../utils/Collection");
class SlashInteraction extends BaseInteraction_1.InteractionBase {
    /**
     * The name of the slash command.
     */
    name;
    /**
     * The values of the slash command (only final options).
     */
    values;
    /**
     * The name of the subcommand group, if present.
     */
    subcommand_group;
    /**
     * The name of the subcommand, if present.
     */
    subcommand;
    constructor(data, client) {
        super(data, client);
        this.name = data.data.name;
        this.values = new Collection_1.Collection();
        this.#processOptions(data);
    }
    #processOptions(data) {
        for (const option of data.data?.options || []) {
            if (option.type === 2) {
                this.subcommand_group = option.name;
                this.#processOptions(option.options || []);
            }
            else if (option.type === 1) {
                this.subcommand = option.name;
                this.#processOptions(option.options || []);
            }
            else {
                this.values.set(option.name, {
                    name: option.name,
                    type: option.type,
                    value: option.value,
                });
            }
        }
    }
}
exports.SlashInteraction = SlashInteraction;
