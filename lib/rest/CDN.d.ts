import { Nullable } from "../common";
import { CDNOptions } from "../interfaces/rest/cdn";
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
    avatar(id: string, avatar: string, options?: CDNOptions): string;
    /**
     * Generates a default avatar URL for a user.
     * @param discriminator - The user discriminator for which to generate the default avatar URL.
     * @param id - The user id for which to generate the default avatar URL.
     * @returns The default avatar URL.
     */
    defaultAvatar(discriminator: Nullable<string>, id: string): string;
    /**
     * Generates a banner URL for a user.
     * @param id - The user id for which to generate the banner URL.
     * @param banner - The user banner hash for which to generate the banner URL.
     * @param options - Optional options for the banner.
     * @returns The banner URL.
     */
    banner(id: string, banner: string, options: CDNOptions): string;
    /**
     * Generates a user avatar decoration URL.
     * @param id - The user id for which to generate the avatar decoration URL.
     * @param decoration - The user avatar decoration hash for which to generate the avatar decoration URL.
     * @param options - Optional options for the avatar decoration.
     * @returns The avatar decoration URL.
     */
    avatarDecoration(id: string, decoration: string, options: CDNOptions): string;
    /**
     * Generates an emoji URL.
     * @param emojiId - The ID of the emoji.
     * @param options - Optional options for the emoji.
     * @returns The emoji URL.
     */
    emoji(emojiId: string, options: CDNOptions): string;
    /**
     * Generates a guild icon URL.
     * @param id - The guild id for which to generate the icon URL.
     * @param icon - The guild icon for which to generate the icon URL.
     * @param options - Optional options for the icon.
     * @returns The guild icon URL.
     */
    guildIcon(id: string, icon: string, options: CDNOptions): string;
    /**
     * Generates a guild splash URL.
     * @param id - The guild id for which to generate the splash URL.
     * @param splash - The guild splash hash for which to generate the splash URL.
     * @param options - Optional options for the splash.
     * @returns The guild splash URL.
     */
    guildSplash(id: string, splash: string, options: CDNOptions): string;
    /**
     * Generates a discovery splash URL for a guild.
     * @param id - The guild id for which to generate the discovery splash URL.
     * @param discovery_splash - The guild discovery splash for which to generate the discovery splash URL.
     * @param options - Optional options for the discovery splash.
     * @returns The discovery splash URL.
     */
    discoverySplash(id: string, discovery_splash: string, options: CDNOptions): string;
    /**
     * Generates a guild banner URL.
     * @param id - The guild id for which to generate the banner URL.
     * @param banner - The guild banner for which to generate the banner URL.
     * @param options - Optional options for the banner.
     * @returns The guild banner URL.
     */
    guildBanner(id: string, banner: string, options: CDNOptions): string;
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
    roleIcon(roleIcon: string, options: CDNOptions): string;
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
    _getInfo(opts: CDNOptions, exten: string[], d: any): CDNOptions;
}
