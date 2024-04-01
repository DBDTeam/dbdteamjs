import { Guild } from "../structures/Guild";
import { GuildRole } from "../structures/Role";
import { User } from "../structures/User";
export interface CDNOptions {
    /**
     * - The size of the image.
     */
    size?: number;
    /**
     * - The extension of the image file.
     */
    extension?: string;
    /**
     * - Whether the image is dynamic or not.
     */
    dynamic?: boolean;
}
/**
 * Represents a Discord CDN (Content Delivery Network) utility.
 */
export declare class CDN {
    BASE_URL: (arg: any) => string;
    default_options: CDNOptions;
    constructor();
    /**
     * Generates an avatar URL for a user.
     * @param user - The user for which to generate the avatar URL.
     * @param options - Optional options for the avatar.
     * @returns The avatar URL.
     */
    avatar(user: User, options?: CDNOptions): string;
    /**
     * Generates a default avatar URL for a user.
     * @param user - The user for which to generate the default avatar URL.
     * @returns The default avatar URL.
     */
    defaultAvatar(user: User): string;
    /**
     * Generates a banner URL for a user.
     * @param user - The user for which to generate the banner URL.
     * @param options - Optional options for the banner.
     * @returns The banner URL.
     */
    banner(user: User, options: CDNOptions): string;
    /**
     * Generates a user avatar decoration URL.
     * @param user - The user for which to generate the avatar decoration URL.
     * @param options - Optional options for the avatar decoration.
     * @returns The avatar decoration URL.
     */
    avatarDecoration(user: User, options: CDNOptions): string;
    /**
     * Generates an emoji URL.
     * @param emojiId - The ID of the emoji.
     * @param options - Optional options for the emoji.
     * @returns The emoji URL.
     */
    emoji(emojiId: string, options: CDNOptions): string;
    /**
     * Generates a guild icon URL.
     * @param guild - The guild for which to generate the icon URL.
     * @param options - Optional options for the icon.
     * @returns The guild icon URL.
     */
    guildIcon(guild: Guild, options: CDNOptions): string;
    /**
     * Generates a guild splash URL.
     * @param guild - The guild for which to generate the splash URL.
     * @param options - Optional options for the splash.
     * @returns The guild splash URL.
     */
    guildSplash(guild: Guild, options: CDNOptions): string;
    /**
     * Generates a discovery splash URL for a guild.
     * @param guild - The guild for which to generate the discovery splash URL.
     * @param options - Optional options for the discovery splash.
     * @returns The discovery splash URL.
     */
    discoverySplash(guild: Guild, options: CDNOptions): string;
    /**
     * Generates a guild banner URL.
     * @param guild - The guild for which to generate the banner URL.
     * @param options - Optional options for the banner.
     * @returns The guild banner URL.
     */
    guildBanner(guild: Guild, options: CDNOptions): string;
    /**
     * Generates a sticker URL.
     * @param stickerId - The ID of the sticker.
     * @param guildSplash - The Guild splash hash
     * @param options - Optional options for the sticker.
     * @returns The sticker URL.
     */
    sticker(stickerId: string, guildSplash: string, options: CDNOptions): string;
    /**
     * Generates a role icon URL.
     * @param role - The role for which to generate the icon URL.
     * @param options - Optional options for the icon.
     * @returns The role icon URL.
     */
    roleIcon(role: GuildRole, options: CDNOptions): string;
    /**
     * Validates and adjusts the size option.
     * @param n - The size value.
     * @returns The adjusted size.
     */
    _validSize(n: number): number;
    /**
     * Checks if the URL is animated.
     * @param url - The URL to check.
     * @returns `true` if animated, `false` otherwise.
     */
    _isAnimated(url: string): boolean;
    /**
     * Retrieves information based on options and extensions.
     * @param opts - Options for the request.
     * @param exten - Supported extensions.
     * @param d - Data to consider.
     * @returns Processed options.
     */
    _getInfo(opts: CDNOptions, exten: string[], d?: string): CDNOptions;
}
