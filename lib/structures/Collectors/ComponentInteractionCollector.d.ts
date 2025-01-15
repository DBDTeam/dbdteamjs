import { Client } from "../../client";
import { ComponentInteraction } from "../Interactions";
import { CollectorOptions } from "./BaseCollector";
import { InteractionCollector } from "./InteractionCollector";
export declare class ComponentInteractionCollector extends InteractionCollector<ComponentInteraction> {
    constructor(client: Client, filter: (interaction: ComponentInteraction) => any, options: CollectorOptions);
}
