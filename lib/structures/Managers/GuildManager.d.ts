import { Collection } from "../../utils/Collection";
import { type Client } from "../../client/Client";
import { Guild } from "../Guild";
declare class GuildManager {
    #private;
    cache: Collection<string, Guild>;
    constructor(client: Client);
    /**
     * Fetches a guild using the guild id.
     * @param id - The Guild id
     * @returns {Guild | null}
     */
    fetch(id: string): Promise<Guild | null>;
}
export { GuildManager };
