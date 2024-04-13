import { CDNOptions } from "../interfaces/rest/cdn";
import { Guild } from "../structures/Guild";
import { User } from "../structures/User";
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
  avatar(user: User, options: CDNOptions = {}) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, user?.avatar);
    return this.BASE_URL(
      `/avatars/${user?.id}/${user?.avatar}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a default avatar URL for a user.
   * @param user - The user for which to generate the default avatar URL.
   * @returns The default avatar URL.
   */
  defaultAvatar(user: User) {
    const index =
      user?.discriminator === "0"
        ? Number(BigInt(user?.id) >> 22n) % 6
        : Number(user?.discriminator) % 5;
    return this.BASE_URL(`/embed/avatars/${index}.png`);
  }

  /**
   * Generates a banner URL for a user.
   * @param user - The user for which to generate the banner URL.
   * @param options - Optional options for the banner.
   * @returns The banner URL.
   */
  banner(user: User, options: CDNOptions) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, user?.banner);
    return this.BASE_URL(
      `/banners/${user?.id}/${user?.banner}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a user avatar decoration URL.
   * @param user - The user for which to generate the avatar decoration URL.
   * @param options - Optional options for the avatar decoration.
   * @returns The avatar decoration URL.
   */
  avatarDecoration(user: User, options: CDNOptions) {
    const data = this._getInfo(
      options,
      EXTENSIONS.NOTGIF,
      user?.avatarDecoration
    );
    return this.BASE_URL(
      `/avatars-decoration/${user?.id}/${user?.avatarDecoration}.${data.extension}?size=${data.size}`
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
   * @param guild - The guild for which to generate the icon URL.
   * @param options - Optional options for the icon.
   * @returns The guild icon URL.
   */
  guildIcon(guild: Guild, options: CDNOptions) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, guild?.icon);
    return this.BASE_URL(
      `/icons/${guild?.id}/${guild?.icon}.${data.extension}`
    );
  }

  /**
   * Generates a guild splash URL.
   * @param guild - The guild for which to generate the splash URL.
   * @param options - Optional options for the splash.
   * @returns The guild splash URL.
   */
  guildSplash(guild: Guild, options: CDNOptions) {
    const data = this._getInfo(options, EXTENSIONS.NOTGIF, guild?.splash);
    return this.BASE_URL(
      `/splashs/${guild?.id}/${guild?.splash}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a discovery splash URL for a guild.
   * @param guild - The guild for which to generate the discovery splash URL.
   * @param options - Optional options for the discovery splash.
   * @returns The discovery splash URL.
   */
  discoverySplash(guild: Guild, options: CDNOptions) {
    const data = this._getInfo(
      options,
      EXTENSIONS.NOTGIF,
      guild?.discovery_splash
    );
    return this.BASE_URL(
      `/discovery-splashes/${guild?.id}/${guild?.discovery_splash}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a guild banner URL.
   * @param guild - The guild for which to generate the banner URL.
   * @param options - Optional options for the banner.
   * @returns The guild banner URL.
   */
  guildBanner(guild: Guild, options: CDNOptions) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, guild?.banner);
    return this.BASE_URL(
      `/banners/${guild?.id}/${guild?.banner}.${data.extension}?size=${data.size}`
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
