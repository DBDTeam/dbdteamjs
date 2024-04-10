import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { Message } from "../Message";
export declare class ChannelMessageManager<T extends Record<any, any>> {
    channel: T;
    private client;
    cache: Collection<string, Message>;
    constructor(channel: T, client: Client);
    get guild(): any;
    fetch(msgId: Record<any, any>): Promise<Message | Message[] | null | undefined>;
}
