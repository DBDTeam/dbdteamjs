import { GuildDefaultMessageNotifications, GuildExplicitContentFilter, GuildMFALevel, GuildNSFWLevel, GuildVerificationLevel } from "discord-api-types/v10";
import { CDNOptions } from "../interfaces/rest/cdn";
import { type Client } from "../client/Client";
import { Nullable } from "../common";
import { Collection } from "../utils/Collection";
import { Base } from "./Base";
import { GuildChannelManager } from "./Managers/ChannelManager";
import { GuildRolesManager } from "./Managers/RolesManager";
import { GuildMemberManager } from "./Managers/UserManager";
import { VoiceChannel } from "./VoiceChannel";
import { GuildEditData } from "../interfaces/guild/Guild";
import { GuildBanManager } from "./Managers/BanManager";
declare class Guild extends Base {
    private exists;
    readonly client: Client;
    name: string;
    icon: Nullable<string>;
    permissions: number;
    features: Nullable<string[]>;
    approximate_members: Nullable<number>;
    approximate_presences: Nullable<number>;
    roles?: GuildRolesManager;
    emojis: Collection<any, any>;
    stickers: Collection<any, any>;
    channels: GuildChannelManager;
    voice_states: Collection<string, VoiceChannel>;
    members?: GuildMemberManager;
    created: any;
    splash: Nullable<string>;
    discovery_splash: Nullable<string>;
    owner_id: Nullable<string>;
    afk_channel: Nullable<string>;
    afk_timeout: Nullable<number>;
    widget: boolean;
    widget_channel_id: Nullable<string>;
    verification_level: GuildVerificationLevel;
    default_message_notifications: GuildDefaultMessageNotifications;
    explicit_level: GuildExplicitContentFilter;
    mfa_level: GuildMFALevel;
    system_channel: Nullable<string>;
    system_channel_flags: Nullable<number>;
    rules_channel: Nullable<string>;
    max_members: Nullable<number>;
    vanity_invite: Nullable<string>;
    description: Nullable<string>;
    banner: Nullable<string>;
    boost_tier: Nullable<string>;
    boost_count: Nullable<string>;
    preferred_locale: Nullable<string>;
    public_channel_id: Nullable<string>;
    welcome_screen: Record<any, any>;
    nsfw_level: GuildNSFWLevel;
    guild: any;
    bans: GuildBanManager;
    /**
     * Represents a Guild
     * @param {object} data - Guild payload
     * @param {?} client - The Client
     */
    constructor(data: Record<any, any>, client: Client);
    _patch(data: any): Promise<void>;
    /**
     * Returns the icon url of the guild (if has)
     * @param {CDNOptions} config - The config of the request.
     * @returns {Nullable<string>}
     */
    iconUrl(config: CDNOptions): Nullable<string>;
    /**
     * Returns the icon banner of the guild (if has)
     * @param {CDNOptions} config - The config of the request.
     * @returns {Nullable<string>}
     */
    bannerUrl(config: CDNOptions): Nullable<string>;
    /**
     * Returns the icon banner of the guild (if has)
     * @param {CDNOptions} config - The config of the request.
     * @returns {Nullable<string>}
     */
    splashUrl(config: CDNOptions): Nullable<string>;
    /**
     * Returns the icon banner of the guild (if has)
     * @param {CDNOptions} config - The config of the request.
     * @returns {Nullable<string>}
     */
    discoverySplashUrl(config: CDNOptions): Nullable<string>;
    /**
     * Leaves from the server.
     * @async
     */
    leave(): Promise<boolean | null>;
    edit(body: GuildEditData): Promise<import("../interfaces/rest/requestHandler").ResponseFromApi | Guild | null>;
}
export { Guild };
