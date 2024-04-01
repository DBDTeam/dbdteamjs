"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Base_1 = require("./Base");
/**
 * Represents a User
 */
class User extends Base_1.Base {
    /**
     * The User ID
     */
    id;
    /**
     * If the user is a bot
     */
    bot;
    /**
     * If the user is the system
     */
    system;
    /**
     * The user flags
     */
    flags;
    /**
     * The User name
     */
    username;
    /**
     * The User global name
     */
    globalName;
    /**
     * The User discriminator (if has)
     */
    discriminator;
    /**
     * The User avatar hash
     */
    avatar;
    /**
     * The User banner hash
     */
    banner;
    /**
     * The User accentColor
     */
    accentColor;
    /**
     * The User avatar decoration hash
     */
    avatarDecoration;
    /**
     * Display's the User avatar URL.
     */
    displayAvatarUrl;
    /**
     * Display's the User banner URL.
     */
    displayBannerUrl;
    /**
     * Display's the User default avatar URL.
     */
    displayDefaultAvatarUrl;
    /**
     * @constructor
     * @param data - The data payload
     * @param client - The client
     */
    constructor(data, client) {
        super(client);
        this.id = data.id;
        this.bot = false;
        this.system = false;
        this.flags = 0;
        this.displayAvatarUrl = this.avatarUrl;
        this.displayDefaultAvatarUrl = this.defaultAvatarUrl;
        this.displayBannerUrl = this.bannerUrl;
        this._patch(data);
    }
    _patch(data) {
        if ("username" in data) {
            this.username = data.username;
        }
        if ("global_name" in data) {
            this.globalName = data.global_name;
        }
        if ("discriminator" in data) {
            this.discriminator = data.discriminator;
        }
        if ("avatar" in data) {
            this.avatar = data.avatar;
        }
        if ("banner" in data) {
            this.banner = data.banner;
        }
        if ("accent_color" in data) {
            this.accentColor = data.accent_color;
        }
        if ("avatar_decoration" in data) {
            this.avatarDecoration = data.avatar_decoration;
        }
    }
    /**
     * If the User is a partial
     */
    get partial() {
        return typeof this.username !== "string";
    }
    /**
     * Returns the User avatar URL
     * @param opts - The CDN Options
     * @example
     * const user = client.users.cache.get("738824089128665118")
     *
     * user.avatarUrl({
     *  size: 64,
     *  format: "jpg"
     * })// https://cdn.discordapp.com//avatars/738824089128665118/f67c14413c916648f2fb50be239adf5f.jpg?size=64
     */
    avatarUrl(opts) {
        if (!this.id)
            return;
        return this.client.rest.cdn.avatar(this, opts);
    }
    /**
     * Returns the User default avatar URL
     * @example
     * const user = client.users.cache.get("738824089128665118")
     *
     * user.defaultAvatarUrl()// https://cdn.discordapp.com/embed/avatars/0.png
     */
    defaultAvatarUrl() {
        if (!this.id)
            return;
        return this.client.rest.cdn.defaultAvatar(this);
    }
    /**
     * Returns the User banner URL
     * @param opts - The CDN Options
     * @example
     * const user = client.users.cache.get("640685917467705344")
     *
     * user.bannerUrl() // https://cdn.discordapp.com/banners/640685917467705344/0510a7bd372082644a05c92ffbbe7b2b.webp
     */
    bannerUrl(opts) {
        if (!this.id)
            return;
        return this.client.rest.cdn.banner(this, opts);
    }
    /**
     * Returns the User mention
     */
    toString() {
        return `<@${this.id}>`;
    }
}
exports.User = User;
