import { Nullable } from "../../../lib/interfaces/other";
import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { type Guild } from "../Guild";
import { Member } from "../Member";
import { User } from "../User";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
/**
 * Manages user-related operations such as fetching user data.
 */
declare class UserManager {
    #private;
    cache: Collection<string, User>;
    /**
     * Constructs a new UserManager.
     * @param client - The client instance.
     */
    constructor(client: Client);
    /**
     * Fetches a user by their ID.
     * @param userId - The ID of the user to fetch.
     * @returns The fetched User instance or an error response.
     */
    fetch(userId: string): Promise<Nullable<User | ErrorResponseFromApi>>;
}
/**
 * Manages guild member-related operations such as fetching and caching members.
 */
declare class GuildMemberManager {
    #private;
    readonly guild: Guild;
    guildId: string;
    cache: Collection<string, Member>;
    /**
     * Constructs a new GuildMemberManager.
     * @param client - The client instance.
     * @param guild - The guild whose members are being managed.
     */
    constructor(client: Client, guild: Guild);
    /**
     * Fetches all members of the guild with specified options.
     * @param obj - Options for fetching members.
     * @returns A collection of guild members or null if an error occurs.
     * @private
     */
    private _fetchAllMembers;
    /**
     * Fetches a guild member by their ID or fetches all members with specified options.
     * @param memberId - The ID of the member to fetch or options for fetching members.
     * @returns A guild member, a collection of guild members, or an error response.
     */
    fetch(memberId: string | undefined | null): Promise<Nullable<Collection<string, Member> | Member | ErrorResponseFromApi>>;
    /**
     * Gets the member instance of the client user.
     * @returns The client user's member instance or null if not available.
     */
    get me(): Nullable<Member>;
}
export { GuildMemberManager, UserManager };
