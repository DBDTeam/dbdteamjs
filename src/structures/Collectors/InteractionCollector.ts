import { Client } from "../../client";
import { EventNames } from "../../common";
import { ComponentInteraction, InteractionBase, MessageInteraction, SlashInteraction, UserInteraction } from "../Interactions";
import { BaseCollector, CollectorDefaultCodes, CollectorOptions } from "./BaseCollector";

export class InteractionCollector<
    T extends SlashInteraction | ComponentInteraction | UserInteraction | MessageInteraction | InteractionBase
> extends BaseCollector<T> {
    constructor(
        client: Client,
        filter: (interaction: T) => any,
        options: CollectorOptions = {}
    ) {
        super(client, filter, options, EventNames.InteractionCreate);
        this.initialize();
    }

    private initialize() {
        this.listener = async (interaction: InteractionBase) => {
            if ((await this.filter(interaction as T))) {
                this.items.set(interaction.id, interaction as T);
                await this.emit("collect", interaction as T);
    
                if (this.options.limit && this.options.limit >= this.count) {
                    this.stop(CollectorDefaultCodes.LIMIT_REACHED);
                }
            }
        };

        this.client.on(EventNames.InteractionCreate, this.listener as any);
    }    
}

