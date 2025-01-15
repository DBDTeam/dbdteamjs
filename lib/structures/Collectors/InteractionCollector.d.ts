import { Client } from "../../client";
import { ComponentInteraction, InteractionBase, MessageInteraction, SlashInteraction, UserInteraction } from "../Interactions";
import { BaseCollector, CollectorOptions } from "./BaseCollector";
export declare class InteractionCollector<T extends SlashInteraction | ComponentInteraction | UserInteraction | MessageInteraction | InteractionBase> extends BaseCollector<T> {
    constructor(client: Client, filter: (interaction: T) => any, options?: CollectorOptions);
    private initialize;
}
