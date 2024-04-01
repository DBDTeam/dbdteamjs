import { type Client } from "../../client/Client";
import { Message } from "../Message";
import { User } from "../User";
export declare enum EventNames {
    "MessageCreate" = "messageCreate",
    "InteractionCreate" = "interactionCreate"
}
export declare abstract class Event {
    client: Client;
    constructor(client: Client);
    abstract handle(data: unknown): ProbablyPromise;
    getMessage(data: any): Message;
    getChannel(data: any): import("../BaseChannel").Channel | import("../CategoryChannel").CategoryChannel | import("../TextChannel").TextChannel | import("../ThreadChannel").ThreadChannel | import("../VoiceChannel").VoiceChannel;
    getUser(data: any): User;
}
