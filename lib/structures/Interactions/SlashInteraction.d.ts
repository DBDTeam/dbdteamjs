import { Collection } from "../..";
import { Client } from "../../client";
import { InteractionBase } from "./BaseInteraction";
export declare class SlashInteraction extends InteractionBase {
    name: string;
    options: Collection<string, unknown>;
    constructor(data: any, client: Client);
}
