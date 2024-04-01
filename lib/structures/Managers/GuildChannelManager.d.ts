import { Collection } from "../../utils/Collection";
import { type Client } from "../../client/Client";
declare class GuildChannelManager {
    readonly client: Client;
    readonly guildId: string;
    cache: Collection;
    constructor(guildId: string, client: Client);
    _fetchAllChannels(): Promise<Collection | undefined>;
    fetch(id: string | undefined | null): Promise<Record<any, any> | Collection | null | undefined>;
}
export { GuildChannelManager };
