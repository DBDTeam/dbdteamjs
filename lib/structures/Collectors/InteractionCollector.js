"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionCollector = void 0;
const common_1 = require("../../common");
const BaseCollector_1 = require("./BaseCollector");
class InteractionCollector extends BaseCollector_1.BaseCollector {
    constructor(client, filter, options = {}) {
        super(client, filter, options, common_1.EventNames.InteractionCreate);
        this.initialize();
    }
    initialize() {
        this.listener = async (interaction) => {
            if ((await this.filter(interaction))) {
                this.items.set(interaction.id, interaction);
                await this.emit("collect", interaction);
                if (this.options.limit && this.options.limit >= this.count) {
                    this.stop(BaseCollector_1.CollectorDefaultCodes.LIMIT_REACHED);
                }
            }
        };
        this.client.on(common_1.EventNames.InteractionCreate, this.listener);
    }
}
exports.InteractionCollector = InteractionCollector;
