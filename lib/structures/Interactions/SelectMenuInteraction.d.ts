import { Client } from "../../client";
import { ComponentInteraction } from "./ComponentInteraction";
export declare class SelectMenuInteraction extends ComponentInteraction {
    #private;
    values: any[];
    resolved: any[];
    constructor(data: any, client: Client);
    private patch;
}
