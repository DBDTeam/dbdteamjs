import { ProbablyPromise } from "../../common";
import { Guild, GuildRole } from "../../structures";
import { Member } from "../../structures/Member";
import { Message } from "../../structures/Message";
import { Shard } from "../../structures/Sharding";
import { User } from "../../structures/User";
import { type Client } from "../Client";
export declare abstract class Event<T> {
    client: Client;
    constructor(client: Client);
    abstract handle(data: T, shard: Shard): ProbablyPromise<any>;
    getMessage(data: any): Promise<Message>;
    getChannel(data: any): import("../../structures").Channel;
    getUser(data: any): User;
    getMember(data: any, guildId: any): Member;
    getGuild(data: any): Guild;
    getRole(data: any, guildId: string): GuildRole | undefined;
}
