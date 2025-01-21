import { APIThreadMetadata, Snowflake } from "discord-api-types/v10";
import { type Client } from "../client";
import { Message } from "./Message";
import { ThreadMember } from "./ThreadMember";
import { GuildChannel } from "./GuildChannel";
export declare class ForumThreadChannel extends GuildChannel {
    thread_metadata: APIThreadMetadata;
    message_count: number;
    member_count: number;
    total_messages_sent: number;
    applied_tags: Snowflake[];
    member: ThreadMember;
    message?: Message;
    constructor(data: any, client: Client);
    setTags(tagsIds: Snowflake[], reason?: string): Promise<ForumThreadChannel | undefined>;
    addTags(tagsIds: string[], reason?: string): Promise<ForumThreadChannel | undefined>;
    removeTags(tagsIds: string[], reason?: string): Promise<ForumThreadChannel | undefined>;
}
