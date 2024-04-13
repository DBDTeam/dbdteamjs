import { type Client } from "../../client/Client";
import { GuildMemberRoleOptions, GuildRoleCreatePayload } from "../../interfaces/member/role";
import { ErrorResponseFromApi, ResponseFromApi } from "../../interfaces/rest/requestHandler";
import { Collection } from "../../utils/Collection";
import { type Guild } from "../Guild";
import { type Member } from "../Member";
import { GuildRole } from "../Role";
export declare class MemberRolesManager {
    private client;
    readonly guild: Guild;
    readonly member: Member;
    cache: Collection<string, GuildRole>;
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
    fetch(roleId?: string | null | undefined): Promise<Collection<string, GuildRole> | null>;
}
export declare class GuildRolesManager {
    private client;
    guild: Guild;
    cache: Collection<string, GuildRole>;
    constructor(guild: Guild, client: Client);
    fetch(roleId: string | null | undefined): Promise<Collection<string, GuildRole> | GuildRole | ErrorResponseFromApi>;
    delete(deleteObject: GuildMemberRoleOptions): Promise<{
        error: ErrorResponseFromApi[];
        success: ResponseFromApi[];
    } | Collection<string, GuildRole>>;
    create(createObject: GuildRoleCreatePayload): Promise<Record<any, any> | ResponseFromApi | null>;
}
