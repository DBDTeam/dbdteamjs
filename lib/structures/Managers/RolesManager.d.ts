import { Collection } from "../../utils/Collection";
import { GuildRole } from "../Role";
import { type Client } from "../../client/Client";
import { type Guild } from "../Guild";
import { type Member } from "../Member";
import { ErrorResponseFromApi, ResponseFromApi } from "../../rest/requestHandler";
export interface GuildRoleCreatePayload {
    name: string;
    permissions?: string;
    color?: number;
    hoist?: boolean;
    icon?: string;
    unicode_emoji?: Record<string, any>;
    mentionable?: boolean;
    reason?: string | null;
}
export interface GuildMemberRoleOptions {
    roles: string[];
    reason?: string | undefined | null;
}
export declare class MemberRolesManager {
    private client;
    readonly guild: Guild;
    readonly member: Member;
    cache: Collection;
    constructor(guild: Guild, member: Member, client: Client);
    private patch;
    add(addObject: GuildMemberRoleOptions): Promise<{
        error: ErrorResponseFromApi[];
        success: ResponseFromApi[];
    } | null>;
    remove(removeObject: GuildMemberRoleOptions): Promise<{
        error: ErrorResponseFromApi[];
        success: ResponseFromApi[];
    } | null>;
    fetch(roleId?: string | null | undefined): Promise<Collection | null>;
}
export declare class GuildRolesManager {
    private client;
    guild: Guild;
    cache: Collection;
    constructor(guild: Guild, client: Client);
    fetch(roleId: string | null | undefined): Promise<Collection | GuildRole>;
    delete(deleteObject: GuildMemberRoleOptions): Promise<{
        error: ErrorResponseFromApi[];
        success: ResponseFromApi[];
    } | Collection>;
    create(createObject: GuildRoleCreatePayload): Promise<Record<any, any> | ResponseFromApi | null>;
}
