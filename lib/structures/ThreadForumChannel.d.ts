import { APIThreadMetadata, Snowflake } from "discord-api-types/v10";
import { type Client } from "../client";
import { Channel } from "./BaseChannel";
import { Message } from "./Message";
import { ThreadMember } from "./ThreadMember";
export declare class ForumThreadChannel extends Channel {
    thread_metadata: APIThreadMetadata;
    message_count: number;
    member_count: number;
    total_messages_sent: number;
    applied_tags: Snowflake[];
    member: ThreadMember;
    message?: Message;
    constructor(data: any, client: Client);
    setTags(tagsIds: Snowflake[], reason?: string): Promise<((import("../rest/requestHandler").RESTResponse | Record<string, any>) & {
        error?: boolean;
    }) | null | undefined>;
    addTags(tagsIds: string[], reason?: string): Promise<((import("../rest/requestHandler").RESTResponse | Record<string, any>) & {
        error?: boolean;
    }) | null | undefined>;
    removeTags(tagsIds: string[], reason?: string): Promise<((import("../rest/requestHandler").RESTResponse | Record<string, any>) & {
        error?: boolean;
    }) | null | undefined>;
}
