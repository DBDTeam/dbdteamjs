import { APIChannelPatchOverwrite, APIGuildForumDefaultReactionEmoji, APIGuildForumTag, ChannelType, ForumLayoutType, SortOrderType, VideoQualityMode } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { type Channel } from "../BaseChannel";
import { type VoiceChannel } from "../VoiceChannel";
import { type TextChannel } from "../TextChannel";
import { type ThreadChannel } from "../ThreadChannel";
import { type CategoryChannel } from "../CategoryChannel";
export interface ChannnelCreatePayload {
    name: string;
    type: ChannelType;
    topic?: string;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    position?: number;
    permission_overwrites?: APIChannelPatchOverwrite[];
    parent_id?: string;
    nsfw?: boolean;
    rtc_region?: string;
    video_quality_mode?: VideoQualityMode;
    default_auto_archive_duration?: number;
    default_reaction_emoji?: APIGuildForumDefaultReactionEmoji;
    available_tags?: APIGuildForumTag;
    default_sort_order?: SortOrderType;
    default_forum_layout?: ForumLayoutType;
    default_thread_rate_limit_per_user?: number;
    reason?: string;
}
declare class GuildChannelManager {
    private client;
    private guildId;
    cache: Collection<string, Channel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>;
    constructor(guildId: string, client: Client);
    _fetchAllChannels(): Promise<Collection<unknown, unknown> | null | undefined>;
    fetch(id: string): Promise<Record<string, any> | Collection<unknown, unknown> | null | undefined>;
    create(channelObj: ChannnelCreatePayload): Promise<true | Channel | null>;
    delete(channelId: string, reason?: string): Promise<true | Channel | null>;
}
declare class ChannelManager {
    readonly client: Client;
    cache: Collection<string, Channel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>;
    constructor(client: Client);
    fetch(id: string): Promise<import("../../interfaces/rest/requestHandler").ResponseFromApi | Channel | null>;
}
export { GuildChannelManager, ChannelManager };
