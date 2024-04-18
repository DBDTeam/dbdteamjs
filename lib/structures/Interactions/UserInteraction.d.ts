import { Client } from "../../client";
import { InteractionBase } from "./BaseInteraction";
export declare class UserInteraction extends InteractionBase {
    #private;
    target: unknown;
    constructor(data: any, client: Client);
    patch(): Promise<void>;
}
