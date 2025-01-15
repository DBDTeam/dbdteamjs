import { Client } from "../../client";
import { UserInteraction } from "../Interactions";
import { CollectorOptions } from "./BaseCollector";
import { InteractionCollector } from "./InteractionCollector";

export class UserInteractionCollector extends InteractionCollector<UserInteraction> {
    constructor(
        client: Client,
        filter: (interaction: UserInteraction) => any,
        options: CollectorOptions
    ) {
        super(client, async (interaction) => {
            return interaction.isUser() && await filter(interaction)
        }, options);
    }
}
