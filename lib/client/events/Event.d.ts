import { ProbablyPromise } from "../../common";
import { Message } from "../../structures/Message";
import { Shard } from "../../structures/Sharding";
import { User } from "../../structures/User";
import { type Client } from "../Client";
export declare abstract class Event<T> {
    client: Client;
    constructor(client: Client);
    abstract handle(data: T, shard: Shard): ProbablyPromise<unknown>;
    getMessage(data: any): Message;
    getChannel(data: any): import("../../structures").CategoryChannel | import("../../structures").Channel | import("../../structures").VoiceChannel | import("../../structures").TextChannel | import("../../structures").ThreadChannel;
    getUser(data: any): User;
}
