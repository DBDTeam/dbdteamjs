import { Collection } from "../../utils/Collection";
import { User } from "../User";
import { Member } from "../Member";
import { type Client } from "../../client/Client";
import { type Guild } from "../Guild";
declare class UserManager {
    private client;
    cache: Collection;
    constructor(client: Client);
    fetch(userId: string): Promise<import("../../rest/requestHandler").ResponseFromApi | User | null>;
}
declare class GuildMemberManager {
    private client;
    readonly guild: Guild;
    guildId: string;
    cache: Collection;
    constructor(client: Client, guild: Guild);
    private _fetchAllMembers;
    fetch(memberId: string | undefined | null): Promise<Collection | import("../../rest/requestHandler").ResponseFromApi | Member | null | undefined>;
    get me(): any;
}
export { UserManager, GuildMemberManager };
