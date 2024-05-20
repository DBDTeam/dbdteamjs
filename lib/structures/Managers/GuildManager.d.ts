import { Collection } from "../../utils/Collection";
import { type Client } from "../../client/Client";
import { type Guild } from "../Guild";
declare class GuildManager {
    #private;
    cache: Collection<string, Guild>;
    constructor(client: Client);
    fetch(id: string): Promise<Record<any, any> | null | undefined>;
}
export { GuildManager };
