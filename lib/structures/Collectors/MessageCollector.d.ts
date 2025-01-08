import { Client } from "../../client";
import { Message } from "../Message";
import { BaseCollector, CollectorOptions } from "./BaseCollector";
export declare class MessageCollector extends BaseCollector<Message> {
    client: Client;
    constructor(client: Client, filter: (message: Message) => boolean, options?: CollectorOptions);
    private initialize;
}
