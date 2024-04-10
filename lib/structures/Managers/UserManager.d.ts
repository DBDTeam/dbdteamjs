import { Collection } from "../../utils/Collection";
import { User } from "../User";
import { Member } from "../Member";
import { type Client } from "../../client/Client";
import { type Guild } from "../Guild";
declare class UserManager {
    private client;
    cache: Collection<string, User>;
    constructor(client: Client);
    fetch(userId: string): Promise<import("../../interfaces/rest/requestHandler").ResponseFromApi | User | null>;
}
declare class GuildMemberManager {
    private client;
    readonly guild: Guild;
    guildId: string;
    cache: Collection<string, Member>;
    constructor(client: Client, guild: Guild);
    private _fetchAllMembers;
    fetch(memberId: string | undefined | null): Promise<import("../../interfaces/rest/requestHandler").ResponseFromApi | Member | Collection<string, Member> | null | undefined>;
    get me(): unknown;
}
export { UserManager, GuildMemberManager };
