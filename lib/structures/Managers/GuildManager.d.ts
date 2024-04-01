import { Collection } from "../../utils/Collection";
import { type Client } from "../../client/Client";
declare class GuildManager {
    readonly client: Client;
    cache: Collection;
    constructor(client: Client);
    fetch(id: string): Promise<Record<any, any> | null | undefined>;
}
export { GuildManager };
