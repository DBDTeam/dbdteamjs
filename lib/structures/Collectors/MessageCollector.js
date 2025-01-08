"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCollector = void 0;
const common_1 = require("../../common");
const BaseCollector_1 = require("./BaseCollector");
class MessageCollector extends BaseCollector_1.BaseCollector {
    constructor(client, filter, options = {}) {
        super(client, filter, options, common_1.EventNames.MessageCreate);
        this.initialize();
    }
    initialize() {
        this.listener = async (message) => {
            if (await this.filter(message)) {
                this.items.set(message.id, message);
                await this.emit("collect", message);
                if (this.options.limit && this.options.limit >= this.count) {
                    this.stop(BaseCollector_1.CollectorDefaultCodes.LIMIT_REACHED);
                }
            }
        };
        this.client.on("messageCreate", this.listener);
    }
}
exports.MessageCollector = MessageCollector;
