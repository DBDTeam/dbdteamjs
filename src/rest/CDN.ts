import { Nullable } from "../common";
import { CDNOptions } from "../interfaces/rest/cdn";
import { setObj } from "../utils/utils";

/**
 * Default options for CDN requests
 */
const OPTIONS: CDNOptions = {
  size: 1024,
  extension: "jpg",
  dynamic: false,
};

// Supported extensions for various resources
const EXTENSIONS = {
  GLOBAL: ["jpg", "gif", "webp", "png"],
  DEFAULT: ["png"],
  NOTGIF: ["jpg", "webp", "png"],
  LOTTIE: ["png", "gif", "json"],
};

/**
 * Represents a Discord CDN (Content Delivery Network) utility.
 */
export class CDN {
  BASE_URL: (arg: any) => string;
  default_options: CDNOptions;

  constructor() {
    /**
     * Base URL for the CDN.
     * @param {string} arg - The argument to append to the base URL.
     * @returns {string} The complete URL.
     */
    this.BASE_URL = (arg) => `https://cdn.discordapp.com${arg}`;
    /**
     * Default options for CDN requests.
     */
    this.default_options = OPTIONS;
  }

  // USERS & MEMBERS

  /**
   * Generates an avatar URL for a user.
   * @param user - The user for which to generate the avatar URL.
   * @param options - Optional options for the avatar.
   * @returns The avatar URL.
   */
  avatar(id: string, avatar: string, options: CDNOptions = {}) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, avatar);
    return this.BASE_URL(
      `/avatars/${id}/${avatar}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a default avatar URL for a user.
   * @param discriminator - The user discriminator for which to generate the default avatar URL.
   * @param id - The user id for which to generate the default avatar URL.
   * @returns The default avatar URL.
   */
  defaultAvatar(discriminator: Nullable<string>, id: string) {
    const index =
      discriminator == "0"
        ? Number(BigInt(id) >> 22n) % 6
        : Number(discriminator) % 5;
    return this.BASE_URL(`/embed/avatars/${index}.png`);
  }

  /**
   * Generates a banner URL for a user.
   * @param id - The user id for which to generate the banner URL.
   * @param banner - The user banner hash for which to generate the banner URL.
   * @param options - Optional options for the banner.
   * @returns The banner URL.
   */
  banner(id: string, banner: string, options: CDNOptions) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, banner);
    return this.BASE_URL(
      `/banners/${id}/${banner}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a user avatar decoration URL.
   * @param id - The user id for which to generate the avatar decoration URL.
   * @param decoration - The user avatar decoration hash for which to generate the avatar decoration URL.
   * @param options - Optional options for the avatar decoration.
   * @returns The avatar decoration URL.
   */
  avatarDecoration(id: string, decoration: string, options: CDNOptions) {
    const data = this._getInfo(
      options,
      EXTENSIONS.NOTGIF,
      decoration
    );
    return this.BASE_URL(
      `/avatars-decoration/${id}/${decoration}.${data.extension}?size=${data.size}`
    );
  }

  // EMOJIS

  /**
   * Generates an emoji URL.
   * @param emojiId - The ID of the emoji.
   * @param options - Optional options for the emoji.
   * @returns The emoji URL.
   */
  emoji(emojiId: string, options: CDNOptions) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, emojiId);
    return this.BASE_URL(
      `/emojis/${emojiId}.${data.extension}?size=${data.size}`
    );
  }

  // GUILDS

  /**
   * Generates a guild icon URL.
   * @param id - The guild id for which to generate the icon URL.
   * @param icon - The guild icon for which to generate the icon URL.
   * @param options - Optional options for the icon.
   * @returns The guild icon URL.
   */
  guildIcon(id: string, icon: string, options: CDNOptions) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, icon);
    return this.BASE_URL(
      `/icons/${id}/${icon}.${data.extension}`
    );
  }

  /**
   * Generates a guild splash URL.
   * @param id - The guild id for which to generate the splash URL.
   * @param splash - The guild splash hash for which to generate the splash URL.
   * @param options - Optional options for the splash.
   * @returns The guild splash URL.
   */
  guildSplash(id: string, splash: string, options: CDNOptions) {
    const data = this._getInfo(options, EXTENSIONS.NOTGIF, splash);
    return this.BASE_URL(
      `/splashs/${id}/${splash}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a discovery splash URL for a guild.
   * @param id - The guild id for which to generate the discovery splash URL.
   * @param discovery_splash - The guild discovery splash for which to generate the discovery splash URL.
   * @param options - Optional options for the discovery splash.
   * @returns The discovery splash URL.
   */
  discoverySplash(id: string, discovery_splash: string, options: CDNOptions) {
    const data = this._getInfo(
      options,
      EXTENSIONS.NOTGIF,
      discovery_splash
    );
    return this.BASE_URL(
      `/discovery-splashes/${id}/${discovery_splash}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a guild banner URL.
   * @param id - The guild id for which to generate the banner URL.
   * @param banner - The guild banner for which to generate the banner URL.
   * @param options - Optional options for the banner.
   * @returns The guild banner URL.
   */
  guildBanner(id: string, banner: string, options: CDNOptions) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, banner);
    return this.BASE_URL(
      `/banners/${id}/${banner}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a sticker URL.
   * @param stickerId - The ID of the sticker.
   * @param guildSplash - The Guild splash hash
   * @param options - Optional options for the sticker.
   * @returns The sticker URL.
   */
  sticker(stickerId: string, guildSplash: string, options: CDNOptions) {
    const data = this._getInfo(options, EXTENSIONS.LOTTIE, stickerId);
    return this.BASE_URL(
      `/stickers/${stickerId}/${guildSplash}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a role icon URL.
   * @param role - The role for which to generate the icon URL.
   * @param options - Optional options for the icon.
   * @returns The role icon URL.
   */
  roleIcon(roleIcon: string, options: CDNOptions) {
    const data = this._getInfo(options, EXTENSIONS.NOTGIF, roleIcon);
    return this.BASE_URL(
      `/role-icons/${roleIcon}/${roleIcon}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Validates and adjusts the size option.
   * @param n - The size value.
   * @returns The adjusted size.
   */
  _validSize(n: number) {
    if (n <= 1) return 1;
    const p = Math.ceil(Math.log2(n));
    return Math.min(Math.pow(2, p), 4096);
  }

  /**
   * Checks if the URL is animated.
   * @param url - The URL to check.
   * @returns `true` if animated, `false` otherwise.
   */
  _isAnimated(url: string) {
    return url.startsWith("a_");
  }

  /**
   * Retrieves information based on options and extensions.
   * @param opts - Options for the request.
   * @param exten - Supported extensions.
   * @param d - Data to consider.
   * @returns Processed options.
   */
  _getInfo(opts: CDNOptions, exten: string[], d: any) {
    if (typeof opts !== "object" || !opts) {
      opts = {};
    }

    var _opts = setObj(OPTIONS, opts);

    if (_opts.size) _opts.size = this._validSize(_opts.size);

    var extensions = exten;
    _opts.extension =
      (_opts.dynamic === true ? "gif" : _opts?.extension?.replace(".", "")) ||
      "png";

    if (d)
      if (!extensions.includes(_opts.extension?.toLowerCase())) {
        _opts.extension =
          _opts.dynamic == true
            ? this._isAnimated(d) == true
              ? "gif"
              : "png"
            : "png";
      } else {
        _opts.extension =
          _opts.extension == "gif"
            ? _opts.dynamic == true
              ? this._isAnimated(d) == true
                ? "gif"
                : "png"
              : "png"
            : _opts.extension;
      }

    return _opts;
  }
}
