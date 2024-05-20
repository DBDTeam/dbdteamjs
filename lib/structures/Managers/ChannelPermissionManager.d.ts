import { type Client } from "../../client/Client";
export declare class ChannelPermissionManager {
    #private;
    private target;
    overwrites: Record<string, any>;
    constructor(overwrites: any, target: string, client: Client);
    edit(userObj: Record<string, any> | "everyone", permsObj: Record<string, any>, reason?: string | null | undefined): Promise<{
        allow: number;
        deny: number;
    } | {
        allow: number;
        deny: number;
        data?: Record<any, any> | undefined;
        status: number;
        error: boolean;
    } | {
        allow: number;
        deny: number;
        d?: Record<string, any> | undefined;
        shard: string | number | null | undefined;
        type: string;
        time: number;
        data?: Record<any, any> | undefined;
        status: number;
        error: boolean;
    }>;
    add(userObj: Record<string, any> | "everyone", permsObj: Record<string, any>, reason?: string | null | undefined): Promise<{
        allow: number;
        deny: number;
    } | {
        allow: number;
        deny: number;
        data?: Record<any, any> | undefined;
        status: number;
        error: boolean;
    } | {
        allow: number;
        deny: number;
        d?: Record<string, any> | undefined;
        shard: string | number | null | undefined;
        type: string;
        time: number;
        data?: Record<any, any> | undefined;
        status: number;
        error: boolean;
    }>;
    remove(userObj: Record<string, any> | "everyone", permsObj: Record<string, any>, reason?: string | null | undefined): Promise<{
        deny: number;
        allow: number;
    } | {
        deny: number;
        allow: number;
        data?: Record<any, any> | undefined;
        status: number;
        error: boolean;
    } | {
        deny: number;
        allow: number;
        d?: Record<string, any> | undefined;
        shard: string | number | null | undefined;
        type: string;
        time: number;
        data?: Record<any, any> | undefined;
        status: number;
        error: boolean;
    }>;
}
