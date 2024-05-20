import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { type Guild } from "../Guild";
import { type ThreadChannel } from "../ThreadChannel";
import { ThreadMember } from "../ThreadMember";
import { FetchWithLimitAndAfter } from "./GuildMemberManager";
export interface FetchWithLimitAfterAndBefore extends FetchWithLimitAndAfter {
    before: string;
}
declare class ThreadMemberManager {
    #private;
    id: string;
    guild?: Guild;
    memberCount: number;
    cache: Collection<string, ThreadMember>;
    constructor(client: Client, thread: ThreadChannel);
    private _fetchAllMembersInThread;
    fetch(memberId: string | FetchWithLimitAfterAndBefore): Promise<import("../../interfaces/rest/requestHandler").ResponseFromApi | ThreadMember | Collection<string, ThreadMember> | null | undefined>;
    remove(memberId: string): Promise<import("../../interfaces/rest/requestHandler").ResponseFromApi | import("../../interfaces/rest/requestHandler").ErrorResponseFromApi | null>;
}
export { ThreadMemberManager };
