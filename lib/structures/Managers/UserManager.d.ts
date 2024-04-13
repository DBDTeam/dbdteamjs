import { Nullable } from "../../../lib/interfaces/other";
import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { type Guild } from "../Guild";
import { Member } from "../Member";
import { User } from "../User";
declare class UserManager {
    private client;
    cache: Collection<string, User>;
    constructor(client: Client);
    fetch(userId: string): Promise<User | import("../../interfaces/rest/requestHandler").ResponseFromApi | null>;
}
declare class GuildMemberManager {
    private client;
    readonly guild: Guild;
    guildId: string;
    cache: Collection<string, Member>;
    constructor(client: Client, guild: Guild);
    private _fetchAllMembers;
    fetch(memberId: string | undefined | null): Promise<import("../../interfaces/rest/requestHandler").ResponseFromApi | Member | Collection<string, Member> | null | undefined>;
    get me(): Nullable<Member>;
}
export { GuildMemberManager, UserManager };
