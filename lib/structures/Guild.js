"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
const Collection_1 = require("../utils/Collection");
const utils_1 = require("../utils/utils");
const Base_1 = require("./Base");
const GuildChannelManager_1 = require("./Managers/GuildChannelManager");
const RolesManager_1 = require("./Managers/RolesManager");
const GuildMemberManager_1 = require("./Managers/GuildMemberManager");
const Role_1 = require("./Role");
const Endpoints = __importStar(require("../rest/Endpoints"));
const BanManager_1 = require("./Managers/BanManager");
class Guild extends Base_1.Base {
    #exists;
    client;
    name;
    icon;
    permissions;
    features;
    approximate_members;
    approximate_presences;
    roles;
    emojis;
    stickers;
    channels;
    members;
    created;
    splash;
    discovery_splash;
    owner_id;
    afk_channel;
    afk_timeout;
    widget_enabled;
    widget_channel_id;
    verification_level;
    default_message_notifications;
    explicit_level;
    mfa_level;
    system_channel;
    system_channel_flags;
    rules_channel;
    max_members;
    vanity_invite;
    description;
    banner;
    boost_tier;
    boost_count;
    preferred_locale;
    public_channel_id;
    welcome_screen;
    nsfw_level;
    bans;
    #data;
    /**
     * Represents a Guild
     * @param {object} data - Guild payload
     * @param {?} client - The Client
     */
    constructor(data, client) {
        super(data);
        this.client = client;
        this.#data = data;
        this.#exists = client.guilds.cache.get(data.id);
        /**
         * The Guild name
         * @type {string}
         */
        this.name = data.name;
        /**
         * The Guild id
         * @type {string}
         */
        this.id = data.id;
        /**
         * The Guild icon hash
         * @type {string}
         */
        this.icon = data.icon;
        /**
         * The Guild permissions
         * @type {object}
         */
        this.permissions = data.permissions;
        /**
         * The Guild features
         * @type {array | undefined}
         */
        this.features = data.features;
        /**
         * The Guild approximate member count
         * @type {number | undefined}
         */
        this.approximate_members =
            data.approximate_member_count ?? this.#exists?.approximate_members;
        /**
         * The Guild approximate presence count
         * @type {number | undefined}
         */
        this.approximate_presences =
            data.approximate_presence_count ?? this.#exists?.approximate_presences;
        /**
         * The Guild emojis
         * @type {Collection}
         */
        this.emojis = new Collection_1.Collection();
        /**
         * The Guild stickers
         * @type {Collection}
         */
        this.stickers = new Collection_1.Collection();
        /**
         * The Guild channels
         * @type {GuildChannelManager}
         */
        this.channels = new GuildChannelManager_1.GuildChannelManager(this.id, this.client);
        /**
         * The Guild Bans Manager.
         * @type {GuildBanManager}
         */
        this.bans = new BanManager_1.GuildBanManager(this, this.client);
        /**
         * The Guild time information.
         * @type {object}
         */
        this.created = (0, utils_1.getAllStamps)(this);
        /**
         * The owner id of the guild
         * @type {string}
         */
        this.owner_id = data.owner_id;
        /**
        * The Guild roles
        * @type {GuildRolesManager}
        */
        this.roles = new RolesManager_1.GuildRolesManager(this, this.client);
        /**
        * The Guild members in the cache.
        * @type {GuildMemberManager}
        */
        this.members = new GuildMemberManager_1.GuildMemberManager(this.client, this);
        if ("splash" in this.#data) {
            /**
             * The Guild splash hash
             * @type {string | undefined}
             */
            this.splash = this.#data.splash;
        }
        if ("discovery_spash" in this.#data) {
            /**
             * The Guild discovery splash hash
             * @type {string | undefined}
             */
            this.discovery_splash = this.#data.discovery_spash;
        }
        if ("afk_channel_id" in this.#data) {
            /**
             * The Guild afk channel ID
             * @type {string | undefined}
             */
            this.afk_channel = this.#data.afk_channel_id;
        }
        if ("afk_timeout" in this.#data) {
            /**
             * The Guild afk timeout in seconds
             * @type {string | undefined}
             */
            this.afk_timeout = this.#data.afk_timeout;
        }
        if ("widget_enable" in this.#data) {
            /**
             * If the Guild widget is enabled
             * @type {boolean}
             */
            this.widget_enabled = this.#data.widget_enable;
        }
        if ("widget_channel_id" in this.#data) {
            /**
             * The Guild widget channel ID
             * @type {string | undefined}
             * @readonly
             */
            this.widget_channel_id = this.#data.widget_channel_id;
        }
        if ("verification_level" in this.#data) {
            /**
             * The Guild verification level of users that join in the Guild
             * @type {number}
             */
            this.verification_level = this.#data.verification_level;
        }
        if ("default_message_notifications" in this.#data) {
            /**
             * The Guild default message notifactions level
             * @type {number}
             */
            this.default_message_notifications = this.#data.default_message_notifications;
        }
        if ("explicit_content_filter" in this.#data) {
            /**
             * The Guild explicit content level
             * @type {number}
             */
            this.explicit_level = this.#data.explicit_content_filter;
        }
        if ("roles" in this.#data && this.roles) {
            for (var roleData of this.#data.roles) {
                const role = new Role_1.GuildRole(roleData, this, this.client);
                this.roles.cache.set(role.id, role);
            }
        }
        if ("emojis" in this.#data) {
            for (var emojiData of this.#data.emojis) {
                this.emojis.set(emojiData.id, emojiData);
            }
        }
        if ("stickers" in this.#data) {
            for (var stickerData of this.#data.stickers) {
                this.stickers.set(stickerData.id, stickerData);
            }
        }
        if ("mfa_level" in this.#data) {
            /**
             * The Guild MFA (2FA) level
             * @type {number}
             */
            this.mfa_level = this.#data.mfa_level;
        }
        if ("system_channel_id" in this.#data) {
            /**
             * The Guild system channel ID
             * @type {string | undefined}
             */
            this.system_channel = this.#data.system_channel_id;
        }
        if ("system_channel_flags" in this.#data) {
            /**
             * The Guild system channel flags
             * @type {number | undefined}
             */
            this.system_channel_flags = this.#data.system_channel_flags;
        }
        if ("rules_channel_id" in this.#data) {
            /**
             * The Guild rules channel id
             * @type {string | undefined}
             */
            this.rules_channel = this.#data.rules_channel_id;
        }
        if ("max_members" in this.#data) {
            /**
             * The Guild max members
             * @type {number}
             */
            this.max_members = this.#data.max_members;
        }
        if ("vanity_url_code" in this.#data) {
            /**
             * The Guild vanity code (only if the Guild has more than 15 boosts or Boost Tier 3)
             * @type {string}
             */
            this.vanity_invite = this.#data.vanity_url_code;
        }
        if ("description" in this.#data) {
            /**
             * The Guild description
             * @type {string | undefined}
             */
            this.description = this.#data.description;
        }
        if ("banner" in this.#data) {
            /**
             * The Guild banner hash
             * @type {string | undefined}
             */
            this.banner = this.#data.banner;
        }
        if ("premium_tier" in this.#data) {
            /**
             * The Guild Premium Tier (Boost Tier)
             * @type {number}
             */
            this.boost_tier = this.#data.premium_tier;
        }
        if ("premium_subscription_count" in this.#data) {
            /**
             * The Guild Premium Subscription Count (Boost Count)
             * @type {number}
             */
            this.boost_count = this.#data.premium_subscription_count;
        }
        if ("preferred_locale" in this.#data) {
            /**
             * The Guild preferred locale
             * @type {string}
             */
            this.preferred_locale = this.#data.preferred_locale;
        }
        if ("public_updates_channel_id" in this.#data) {
            /**
             * The Guild public channel updates ID
             * @type {string | undefined}
             */
            this.public_channel_id = this.#data.public_updates_channel_id;
        }
        if ("welcome_screen" in this.#data) {
            /**
             * The Guild welcome screen
             * @type {object | null}
             */
            this.welcome_screen = this.#data.welcome_screen;
        }
        if (this.#data.nsfw_level) {
            /**
             * The Guild nsfw level
             * @type {number}
             */
            this.nsfw_level = this.#data.nsfw_level;
        }
    }
    /**
     * Returns the icon url of the guild (if has)
     * @param {CDNOptions} config - The config of the request.
     * @returns {Nullable<string>}
     */
    iconUrl(config) {
        if (!this.icon)
            return null;
        return this.client.rest.cdn.guildIcon(this.id, this.icon, config || {});
    }
    /**
     * Returns the icon banner of the guild (if has)
     * @param {CDNOptions} config - The config of the request.
     * @returns {Nullable<string>}
     */
    bannerUrl(config) {
        if (!this.banner)
            return null;
        return this.client.rest.cdn.guildBanner(this.id, this.banner, config || {});
    }
    /**
     * Returns the icon banner of the guild (if has)
     * @param {CDNOptions} config - The config of the request.
     * @returns {Nullable<string>}
     */
    splashUrl(config) {
        if (!this.splash)
            return null;
        return this.client.rest.cdn.guildSplash(this.id, this.splash, config || {});
    }
    /**
     * Returns the icon banner of the guild (if has)
     * @param {CDNOptions} config - The config of the request.
     * @returns {Nullable<string>}
     */
    discoverySplashUrl(config) {
        if (!this.discovery_splash)
            return null;
        return this.client.rest.cdn.discoverySplash(this.id, this.discovery_splash, config || {});
    }
    /**
     * Leaves from the server.
     * @async
     */
    async leave() {
        const response = await this.client.rest.request("DELETE", Endpoints.UserGuild(this.id), true);
        if (!response)
            return response;
        return !response?.error ? true : false;
    }
    async edit(body) {
        if (!body || typeof body !== "object")
            return null;
        const response = await this.client.rest.request("PATCH", Endpoints.Guild(this.id), true, { data: body });
        if (!response || response?.error || !response?.data)
            return response;
        return new Guild(response.data, this.client);
    }
}
exports.Guild = Guild;
