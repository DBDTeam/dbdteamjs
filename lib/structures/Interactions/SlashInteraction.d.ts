import { InteractionOptionValue } from "../../common/types/interactions";
import { Client } from "../../client";
import { InteractionBase } from "./BaseInteraction";
import { Collection } from "../../utils/Collection";
export declare class SlashInteraction extends InteractionBase {
    /**
     * The name of the slash command.
     */
    name: string;
    /**
     * The values of the slash command (only final options).
     */
    values: Collection<string, InteractionOptionValue>;
    /**
     * The name of the subcommand group, if present.
     */
    subcommand_group?: string;
    /**
     * The name of the subcommand, if present.
     */
    subcommand?: string;
    constructor(data: any, client: Client);
}
