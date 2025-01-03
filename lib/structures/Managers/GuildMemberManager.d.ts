import { Collection } from "../../utils/Collection";
import { type Client } from "../../client/Client";
import { type Guild } from "../Guild";
import { Member } from "../Member";
import { FetchWithLimitAndAfter, Nullable } from "../../common";
import { RESTResponse } from "../../rest/requestHandler";
declare class GuildMemberManager {
    #private;
    guild: Guild;
    guildId: string;
    cache: Collection<string, Member>;
    /**
     * Constructs a new GuildMemberManager instance.
     * @param {Client} client - The client instance to interact with the Discord API.
     * @param {Guild} guild - The guild instance for which to manage members.
     */
    constructor(client: Client, guild: Guild);
    /**
     * Fetches a member by their ID or fetches all members if an object is provided.
     * @param {string | FetchWithLimitAndAfter} memberId - The ID of the member to fetch or a configuration object.
     * @returns {Promise<Nullable<Member | ErrorResponseFromApi | Collection<string, Member>>>} - The fetched member or collection of members, or null if an error occurred.
     */
    fetch(memberId: string | FetchWithLimitAndAfter): Promise<Nullable<Member | RESTResponse | Collection<string, Member>>>;
    /**
     * Gets the client user as a member of the guild.
     * @returns {Member} - The member instance or null if not found, or an error if an error occurred.
     */
    get me(): Member;
}
export { GuildMemberManager };
