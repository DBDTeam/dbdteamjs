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
        // Procesar opciones y guardar subcommand y subcommand_group si existen
        const processOptions = (options) => {
            for (const option of options || []) {
                if (option.type === 2) {
                    // SubCommandGroup
                    this.subcommand_group = option.name;
                    processOptions(option.options || []);
                }
                else if (option.type === 1) {
                    // SubCommand
                    this.subcommand = option.name;
                    processOptions(option.options || []);
                }
                else {
                    // Opciones finales con valores directos
                    this.values.set(option.name, {
                        name: option.name,
                        type: option.type,
                        value: option.value,
                    });
                }
            }
        };
        processOptions(data.data?.options || []);
    }
}
exports.SlashInteraction = SlashInteraction;
