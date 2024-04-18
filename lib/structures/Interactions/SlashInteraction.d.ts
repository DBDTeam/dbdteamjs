import { Collection } from "../..";
import { Client } from "../../client";
import { InteractionBase } from "./BaseInteraction";
export declare class SlashInteraction extends InteractionBase {
    name: any;
    options: Collection<unknown, unknown>;
    constructor(data: any, client: Client);
}
