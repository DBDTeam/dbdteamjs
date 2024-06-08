import { type Client } from "../../client/Client";
import { ErrorResponseFromApi, ResponseFromApi } from "../../interfaces/rest/requestHandler";
import { Nullable } from "../../common";
interface ChannelPermissionSuccessResponse extends ResponseFromApi {
    /**
    * The allowed perms of the response. (if any)
    */
    allow?: number;
    /**
     * The disallowed perms of the response. (if any)
     */
    deny?: number;
}
interface targetObj {
    /**
     * The type of permission overwrite, 0 for GuildRoles, 1 for GuildMembers.
     */
    type?: 0 | 1;
    /**
     * The target id of the role or member.
     */
    targetId: string;
    /**
     * The Channel Id
     */
    id?: string;
}
interface ObjectOfThePerms {
    /**
     * The array of permissions bitwise to allow in the current channel.
     */
    allow?: number[];
    /**
     * The array of permissions bitwise to disable in the current channel.
     */
    deny?: number[];
}
export declare class ChannelPermissionManager {
    #private;
    private target;
    overwrites: Record<string, any>;
    constructor(overwrites: any, target: string, client: Client);
    /**
     *
     * @param targetObj
     * @param permsObj
     * @param reason
     * @returns
     */
    edit(targetObj: targetObj | "everyone", permsObj: ObjectOfThePerms, reason?: Nullable<string>): Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>;
    add(targetObj: targetObj | "everyone", permsObj: ObjectOfThePerms, reason?: Nullable<string>): Promise<{
        allow: number;
    } | {
        allow: number;
        d?: Record<string, any> | undefined;
        shard: string | number | null | undefined;
        type: string;
        time: number;
        data?: Record<any, any> | undefined;
        status: number;
        error: boolean;
    } | {
        allow: number;
        /**
         * The disallowed perms of the response. (if any)
         */
        deny?: number | undefined;
        data?: Record<any, any> | undefined;
        status: number;
        error: boolean;
    }>;
    remove(targetObj: Record<string, any> | "everyone", permsObj: Record<string, any>, reason?: string | null | undefined): Promise<{
        deny: number;
    } | {
        deny: number;
        d?: Record<string, any> | undefined;
        shard: string | number | null | undefined;
        type: string;
        time: number;
        data?: Record<any, any> | undefined;
        status: number;
        error: boolean;
    } | {
        deny: number;
        /**
        * The allowed perms of the response. (if any)
        */
        allow?: number | undefined;
        data?: Record<any, any> | undefined;
        status: number;
        error: boolean;
    }>;
}
export {};
