import { InteractionOptionValue } from "../../common/types/interactions";
import { Client } from "../../client";
import { InteractionBase } from "./BaseInteraction";
import { Collection } from "../../utils/Collection";
export declare class SlashInteraction extends InteractionBase {
    /**
     * The name of the slash
     */
    name: string;
    /**
     * The values of the slash.
     */
    values: Collection<string, InteractionOptionValue>;
    constructor(data: any, client: Client);
}
