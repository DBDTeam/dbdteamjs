import { Collection } from "../../utils/Collection";
import { type Client } from "../../client/Client";
import { type Guild } from "../Guild";
import { Member } from "../Member";
import { Nullable } from "../../common";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
export interface FetchWithLimitAndAfter {
    limit?: number;
    after?: number;
}
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
     * Fetches all members of the guild with optional configuration.
     * @param {FetchWithLimitAndAfter} config - The configuration for fetching members, including limit and after.
     * @returns {Promise<Collection<string, Member> | null>} - A collection of members or null if an error occurred.
     */
    _fetchAllMembers(config: FetchWithLimitAndAfter): Promise<Collection<string, Member> | null>;
    /**
     * Fetches a member by their ID or fetches all members if an object is provided.
     * @param {string | Record<string, any>} memberId - The ID of the member to fetch or a configuration object.
     * @returns {Promise<Nullable<Member | ErrorResponseFromApi | Collection<string, Member>>>} - The fetched member or collection of members, or null if an error occurred.
     */
    fetch(memberId: string | Record<string, any>): Promise<Nullable<Member | ErrorResponseFromApi | Collection<string, Member>>>;
    /**
     * Gets the client user as a member of the guild.
     * @returns {Nullable<Member | unknown>} - The member instance or null if not found, or an error if an error occurred.
     */
    get me(): Nullable<Member | unknown>;
}
export { GuildMemberManager };
