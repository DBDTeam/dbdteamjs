import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { User } from "../User";
import { Nullable } from "../../common";
import { RESTResponse } from "../../rest/requestHandler";
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
    fetch(userId: string): Promise<Nullable<User | RESTResponse>>;
}
export { UserManager };
