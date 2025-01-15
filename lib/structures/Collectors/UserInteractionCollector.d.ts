import { Client } from "../../client";
import { UserInteraction } from "../Interactions";
import { CollectorOptions } from "./BaseCollector";
import { InteractionCollector } from "./InteractionCollector";
export declare class UserInteractionCollector extends InteractionCollector<UserInteraction> {
    constructor(client: Client, filter: (interaction: UserInteraction) => any, options: CollectorOptions);
}
