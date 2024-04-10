import { Collection } from "../../utils/Collection";
import { type Client } from "../../client/Client";
import { type Channel } from "../BaseChannel";
import { type TextChannel } from "../TextChannel";
import { type VoiceChannel } from "../VoiceChannel";
import { type ThreadChannel } from "../ThreadChannel";
import { type CategoryChannel } from "../CategoryChannel";
declare class GuildChannelManager {
    readonly client: Client;
    readonly guildId: string;
    cache: Collection<string, Channel | TextChannel | VoiceChannel | ThreadChannel | CategoryChannel>;
    constructor(guildId: string, client: Client);
    _fetchAllChannels(): Promise<Collection<unknown, unknown> | undefined>;
    fetch(id: string | undefined | null): Promise<Record<any, any> | Collection<unknown, unknown> | null | undefined>;
}
export { GuildChannelManager };
