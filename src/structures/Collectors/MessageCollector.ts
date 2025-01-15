import { Client } from "../../client";
import { EventNames } from "../../common";
import { Message } from "../Message";
import { BaseCollector, CollectorDefaultCodes, CollectorOptions } from "./BaseCollector";

export class MessageCollector extends BaseCollector<Message> {
    declare client: Client;
    constructor(
        client: Client,
        filter: (message: Message) => any,
        options: CollectorOptions = {}
    ) {
        super(client, filter, options, EventNames.MessageCreate);
        this.initialize();
    }

    private initialize() {
        this.listener = async (message: Message) => {
            if (await this.filter(message)) {
                this.items.set(message.id, message);
                await this.emit("collect", message);
                if(this.options.limit && this.options.limit >= this.count){
                    this.stop(CollectorDefaultCodes.LIMIT_REACHED);
                }
            }
        };

        this.client.on("messageCreate", this.listener);
    }
}
