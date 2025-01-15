import { Client } from "../../client";
import { SlashInteraction } from "../Interactions";
import { CollectorOptions } from "./BaseCollector";
import { InteractionCollector } from "./InteractionCollector";
export declare class SlashInteractionCollector extends InteractionCollector<SlashInteraction> {
    constructor(client: Client, filter: (interaction: SlashInteraction) => any, options: CollectorOptions);
}
