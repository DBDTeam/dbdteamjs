const { setObj } = require("../utils/utils");

/**
 * @typedef {import('../structures/User').User} User
 * @typedef {import('../structures/Guild').Guild} Guild
 * @typedef {import('../structures/Role').GuildRole} GuildRole
 */

/**
 * Represents a Discord CDN (Content Delivery Network) utility.
 */
class CDN {
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
   * @param {User} user - The user for which to generate the avatar URL.
   * @param {Object} options - Optional options for the avatar.
   * @returns {string} The avatar URL.
   */
  avatar(user, options = {}) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, user?.avatar);
    return this.BASE_URL(
      `/avatars/${user?.id}/${user?.avatar}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a default avatar URL for a user.
   * @param {User} user - The user for which to generate the default avatar URL.
   * @returns {string} The default avatar URL.
   */
  defaultAvatar(user) {
    const index =
      user?.discriminator === "0"
        ? Number(BigInt(user?.id) >> 22n) % 6
        : Number(user?.discriminator) % 5;
    return this.BASE_URL(`/embed/avatars/${index}.png`);
  }

  /**
   * Generates a banner URL for a user.
   * @param {User} user - The user for which to generate the banner URL.
   * @param {Object} options - Optional options for the banner.
   * @returns {string} The banner URL.
   */
  banner(user, options) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, user?.banner);
    return this.BASE_URL(
      `/banners/${user?.id}/${user?.banner}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a user avatar decoration URL.
   * @param {User} user - The user for which to generate the avatar decoration URL.
   * @param {Object} options - Optional options for the avatar decoration.
   * @returns {string} The avatar decoration URL.
   */
  avatarDecoration(user, options) {
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
   * @param {string} emojiId - The ID of the emoji.
   * @param {Object} options - Optional options for the emoji.
   * @returns {string} The emoji URL.
   */
  emoji(emojiId, options) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, emojiId);
    return this.BASE_URL(
      `/emojis/${emojiId}.${data.extension}?size=${data.size}`
    );
  }

  // GUILDS

  /**
   * Generates a guild icon URL.
   * @param {Object} guild - The guild for which to generate the icon URL.
   * @param {OPTIONS} options - Optional options for the icon.
   * @returns {string} The guild icon URL.
   */
  guildIcon(guild, options) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, guild?.icon);
    return this.BASE_URL(
      `/icons/${guild?.id}/${guild?.icon}.${data.extension}`
    );
  }

  /**
   * Generates a guild splash URL.
   * @param {Guild} guild - The guild for which to generate the splash URL.
   * @param {OPTIONS} options - Optional options for the splash.
   * @returns {string} The guild splash URL.
   */
  guildSplash(guild, options) {
    const data = this._getInfo(options, EXTENSIONS.NOTGIF, guild?.splash);
    return this.BASE_URL(
      `/splashs/${guild?.id}/${guild?.splash}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a discovery splash URL for a guild.
   * @param {Guild} guild - The guild for which to generate the discovery splash URL.
   * @param {OPTIONS} options - Optional options for the discovery splash.
   * @returns {string} The discovery splash URL.
   */
  discoverySplash(guild, options) {
    const data = this._getInfo(
      options,
      EXTENSIONS.NOTGIF,
      guild?.discoverySplash
    );
    return this.BASE_URL(
      `/discovery-splashes/${guild?.id}/${guild?.discoverySplash}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a guild banner URL.
   * @param {Guild} guild - The guild for which to generate the banner URL.
   * @param {OPTIONS} options - Optional options for the banner.
   * @returns {string} The guild banner URL.
   */
  guildBanner(guild, options) {
    const data = this._getInfo(options, EXTENSIONS.GLOBAL, guild?.banner);
    return this.BASE_URL(
      `/banners/${guild?.id}/${guild?.banner}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a sticker URL.
   * @param {string} stickerId - The ID of the sticker.
   * @param {string} guildSplash - The Guild splash hash
   * @param {OPTIONS} options - Optional options for the sticker.
   * @returns {string} The sticker URL.
   */
  sticker(stickerId, guildSplash, options) {
    const data = this._getInfo(options, EXTENSIONS.LOTTIE, stickerId);
    return this.BASE_URL(
      `/stickers/${stickerId}/${guildSplash}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Generates a role icon URL.
   * @param {GuildRole} role - The role for which to generate the icon URL.
   * @param {OPTIONS} options - Optional options for the icon.
   * @returns {string} The role icon URL.
   */
  roleIcon(role, options) {
    const data = this._getInfo(options, EXTENSIONS.NOTGIF, role.icon);
    return this.BASE_URL(
      `/role-icons/${role.id}/${role.icon}.${data.extension}?size=${data.size}`
    );
  }

  /**
   * Validates and adjusts the size option.
   * @param {number} n - The size value.
   * @returns {number} The adjusted size.
   */
  _validSize(n) {
    if (n <= 1) return 1;
    const p = Math.ceil(Math.log2(n));
    return Math.min(Math.pow(2, p), 4096);
  }

  /**
   * Checks if the URL is animated.
   * @param {string} url - The URL to check.
   * @returns {boolean} True if animated, false otherwise.
   */
  _isAnimated(url) {
    return url.startsWith("a_");
  }

  /**
   * Retrieves information based on options and extensions.
   * @param {Options} opts - Options for the request.
   * @param {Array} exten - Supported extensions.
   * @param {string} d - Data to consider.
   * @returns {Options} Processed options.
   */
  _getInfo(opts, exten, d) {
    if (typeof opts !== "object" || !opts) {
      opts = {};
    }

    var _opts = setObj(OPTIONS, opts);

    _opts.size = this._validSize(_opts.size);

    var extensions = exten;
    _opts.extension =
      (_opts.dynamic === true ? "gif" : _opts?.extension?.replace(".", "")) ||
      "png";

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

module.exports = { CDN };

/**
 * @typedef {Object} Options
 * @property {number} [size] - The size of the image.
 * @property {string} [extension] - The extension of the image file.
 * @property {boolean} [dynamic] - Whether the image is dynamic or not.
 */

/**
 * Default options for CDN requests
 * @type {Options}
 */
const OPTIONS = {
  size: 64,
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
