import { Client } from "../../client";
import { Nullable } from "../../common";
import { Message } from "../Message";
import { InteractionBase } from "./BaseInteraction";
export declare class MessageInteraction extends InteractionBase {
    #private;
    /**
     * The message of the interaction
     * @type { Nullable<Message> }
     */
    message: Nullable<Message>;
    constructor(data: any, client: Client);
    private patch;
}
