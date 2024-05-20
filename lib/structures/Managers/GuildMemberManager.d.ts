import { Collection } from "../../utils/Collection";
import { type Client } from "../../client/Client";
import { type Guild } from "../Guild";
import { Member } from "../Member";
export interface FetchWithLimitAndAfter {
    limit?: number;
    after?: number;
}
declare class GuildMemberManager {
    #private;
    guild: Guild;
    guildId: string;
    cache: Collection<string, Member>;
    constructor(client: Client, guild: Guild);
    _fetchAllMembers(config: FetchWithLimitAndAfter): Promise<Collection<string, Member> | null>;
    fetch(memberId: string | Record<string, any>): Promise<import("../../interfaces/rest/requestHandler").ResponseFromApi | Member | Collection<string, Member> | null | undefined>;
    get me(): unknown;
}
export { GuildMemberManager };
