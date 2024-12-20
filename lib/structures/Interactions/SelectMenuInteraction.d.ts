import { Client } from "../../client";
import { SelectMenuResolvedValues } from "../../common";
import { Collection } from "../../utils/Collection";
import { ComponentInteraction } from "./ComponentInteraction";
export declare class SelectMenuInteraction extends ComponentInteraction {
    #private;
    /**
     * The values of the select menu option
     * @type { string[] }
     */
    values: string[];
    /**
     * The values of the resolved menu options.
     * @type { Collection<string, SelectMenuResolvedValues> }
     */
    resolved: Collection<string, SelectMenuResolvedValues>;
    constructor(data: any, client: Client);
    _____patch(): Promise<void>;
}
