import { Client } from "../../client";
import { MessageInteraction } from "../Interactions";
import { CollectorOptions } from "./BaseCollector";
import { InteractionCollector } from "./InteractionCollector";
export declare class MessageInteractionCollector extends InteractionCollector<MessageInteraction> {
    constructor(client: Client, filter: (interaction: MessageInteraction) => any, options: CollectorOptions);
}
