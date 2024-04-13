import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { type Channel } from "../BaseChannel";
import { type CategoryChannel } from "../CategoryChannel";
import { type TextChannel } from "../TextChannel";
import { type ThreadChannel } from "../ThreadChannel";
import { type VoiceChannel } from "../VoiceChannel";
declare class GuildChannelManager {
    readonly client: Client;
    readonly guildId: string;
    cache: Collection<string, Channel | TextChannel | VoiceChannel | ThreadChannel | CategoryChannel>;
    constructor(guildId: string, client: Client);
    _fetchAllChannels(): Promise<Collection<unknown, unknown> | undefined>;
    fetch(id: string | undefined | null): Promise<Record<any, any> | Collection<unknown, unknown> | null | undefined>;
}
export { GuildChannelManager };
