import { APIThreadMember } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { FetchWithLimitAfterAndBefore } from "../../common";
import { RESTResponse } from "../../rest/requestHandler";
import { Collection } from "../../utils/Collection";
import { type Guild } from "../Guild";
import { type ThreadChannel } from "../ThreadChannel";
import { ThreadMember } from "../ThreadMember";
/**
 * Manages the members of a thread in a guild.
 */
declare class ThreadMemberManager {
    #private;
    id: string;
    guild: Guild;
    memberCount: number;
    cache: Collection<string, ThreadMember>;
    /**
     * Constructs a new ThreadMemberManager.
     * @param client - The client instance.
     * @param thread - The thread channel whose members are being managed.
     */
    constructor(client: Client, thread: ThreadChannel);
    /**
     * Fetches a thread member by ID or fetches all members with specified options.
     * @param memberId - The ID of the member to fetch or options for fetching members.
     * @returns A thread member, a collection of thread members, or an error response.
     */
    fetch(memberId: string | FetchWithLimitAfterAndBefore): Promise<ThreadMember | Collection<string, ThreadMember> | RESTResponse<APIThreadMember> | null>;
    /**
     * Removes a member from a thread.
     * @param memberId - The ID of the member to remove.
     * @returns {boolean} - Returns true or false if the member was removed from the thread.
     */
    remove(memberId: string): Promise<boolean>;
}
export { ThreadMemberManager };
