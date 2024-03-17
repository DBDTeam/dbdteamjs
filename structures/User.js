const { readOnly } = require("../Utils/utils");
const { Base } = require("./Base");

class User extends Base {
    #client;
    /**
     * Represents a User
     * @param {object} data - The user payload
     * @param {Client} client - The Client
     */
    constructor(data, client){
        super(data.id);
        this.#client = client;
        /**
         * The User ID
         * @type {string}
         */
        this.id = data.id;
        /**
         * If the user is a bot
         * @type {boolean}
         */
        this.bot = null;
        /**
         * If the user is the system
         * @type {boolean}
         */
        this.system = null;
        /**
         * The user flags
         * @type {number}
         */
        this.flags = 0;

        /**
         * Display's the User avatar URL.
         * @readonly
         * @function
         * @returns {string}
         */

        readOnly(this, "displayAvatarUrl", this.avatarUrl);

        /**
         * Display's the User default avatar URL.
         * @readonly
         * @function
         * @returns {string}
         */

        readOnly(this, "displayDefaultAvatarUrl", this.defaultAvatarUrl);

        /**
         * Display's the User banner URL.
         * @readonly
         * @function
         * @returns {string}
         */

        readOnly(this, "displayBannerUrl", this.bannerUrl);
        this._patch(data)
    }
    _patch(data) {
        if ('username' in data) {
            /**
             * The User name
             * @type {string}
             */
            this.username = data.username;
        }

        if ('global_name' in data) {
            /**
             * The User global name
             */
            this.globalName = data.global_name;
        }
        
        if ('discriminator' in data) {
            /**
             * The User discriminator (if has)
             * @type {string|undefined}
             */
            this.discriminator = data.discriminator;
        }

        if ('avatar' in data) {
            /**
             * The User avatar hash
             * @type {string|undefined}
             */
            this.avatar = data.avatar;
        }

        if ('banner' in data) {
            /**
             * The User banner hash
             * @type {string|undefined}
             */
            this.banner = data.banner;
        }

        if ('accent_color' in data) {
            /**
             * The User accentColor
             * @type {string|undefined}
             */
            this.accentColor = data.accent_color;
        }
        
        if ('avatar_decoration' in data) {
            /**
             * The User avatar decoration hash
             * @type {string|undefined}
             */
            this.avatarDecoration = data.avatar_decoration;
        }
    }

    /**
     * If the User is a partial
     * @returns {boolean}
     */

    get partial() {
        return typeof this.username !== 'string';
  	}

    /**
     * Returns the User avatar URL
     * @param {object} opts - The CDN Options
     * @example
     * const user = client.users.cache.get("738824089128665118")
     * 
     * user.avatarUrl({
     *  size: 64,
     *  format: "jpg"
     * })// https://cdn.discordapp.com//avatars/738824089128665118/f67c14413c916648f2fb50be239adf5f.jpg?size=64
     * @returns {string}
     */

    avatarUrl(opts) {
        if (!this.id) return;
        return this.#client.rest.cdn.user_avatar(this, opts);
    }

    /**
     * Returns the User default avatar URL
     * @param {object} opts - The CDN Options
     * @example
     * const user = client.users.cache.get("738824089128665118")
     * 
     * user.defaultAvatarUrl()// https://cdn.discordapp.com/embed/avatars/0.png
     * @returns {string}
     */

    defaultAvatarUrl() {
        if (!this.id) return;
        return this.#client.rest.cdn.default_user_avatar(this);
    }

    /**
     * Returns the User banner URL
     * @param {object} opts - The CDN Options
     * @example
     * const user = client.users.cache.get("640685917467705344")
     * 
     * user.bannerUrl()// https://cdn.discordapp.com/banners/640685917467705344/0510a7bd372082644a05c92ffbbe7b2b.webp
     * @returns {string}
     */

    bannerUrl(opts) {
        if (!this.id) return;
        return this.#client.rest.cdn.user_banner(this, opts);
    }

    /**
     * Returns the User mention
     * @returns {string}
     */

    toString() {
        return `<@${this.id}>`
    }
}

module.exports = { User }