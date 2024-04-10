import { GuildDefaultMessageNotifications, GuildExplicitContentFilter, GuildMFALevel, GuildNSFWLevel, GuildVerificationLevel } from "discord-api-types/v10";
import { type Client } from "../client/Client";
import { Nullable, Nullded } from "../interfaces/other";
import { Collection } from "../utils/Collection";
import { Base } from "./Base";
import { GuildChannelManager } from "./Managers/ChannelManager";
import { GuildRolesManager } from "./Managers/RolesManager";
import { GuildMemberManager } from "./Managers/UserManager";
import { VoiceChannel } from "./VoiceChannel";
declare class Guild extends Base {
    private exists;
    readonly client: Client;
    name: string;
    icon: Nullable<string>;
    permissions: number;
    features: Nullable<string[]>;
    approximate_members: number | Nullded;
    approximate_presences: number | Nullded;
    roles?: GuildRolesManager;
    emojis: Collection<any, any>;
    stickers: Collection<any, any>;
    channels: GuildChannelManager;
    voice_states: Collection<string, VoiceChannel>;
    members?: GuildMemberManager;
    created: any;
    splash: string | Nullded;
    discovery_splash: string | Nullded;
    owner_id: string | Nullded;
    afk_channel: string | Nullded;
    afk_timeout: number | Nullded;
    widget: boolean;
    widget_channel_id: string | Nullded;
    verification_level: GuildVerificationLevel;
    default_message_notifications: GuildDefaultMessageNotifications;
    explicit_level: GuildExplicitContentFilter;
    mfa_level: GuildMFALevel;
    system_channel: string | Nullded;
    system_channel_flags: number | Nullded;
    rules_channel: string | Nullded;
    max_members: number | Nullded;
    vanity_invite: string | Nullded;
    description: string | Nullded;
    banner: string | Nullded;
    boost_tier: string | Nullded;
    boost_count: string | Nullded;
    preferred_locale: string | Nullded;
    public_channel_id: string | Nullded;
    welcome_screen: Record<any, any>;
    nsfw_level: GuildNSFWLevel;
    /**
     * Represents a Guild
     * @param {object} data - Guild payload
     * @param {?} client - The Client
     */
    constructor(data: Record<any, any>, client: Client);
    _patch(data: any): Promise<void>;
}
export { Guild };
