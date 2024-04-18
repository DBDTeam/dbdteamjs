import { Client } from "../../client";
import { Nullable } from "../../common";
import { Message } from "../Message";
import { InteractionBase } from "./BaseInteraction";
export declare class MessageInteraction extends InteractionBase {
    #private;
    message: Nullable<Message>;
    constructor(data: any, client: Client);
    private patch;
}
