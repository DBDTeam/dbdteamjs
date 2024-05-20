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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
const Collection_1 = require("../utils/Collection");
const utils_1 = require("../utils/utils");
const Base_1 = require("./Base");
const ChannelManager_1 = require("./Managers/ChannelManager");
const RolesManager_1 = require("./Managers/RolesManager");
const UserManager_1 = require("./Managers/UserManager");
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
    voice_states;
    members;
    created;
    splash;
    discovery_splash;
    owner_id;
    afk_channel;
    afk_timeout;
    widget;
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
    guild;
    bans;
    /**
     * Represents a Guild
     * @param {object} data - Guild payload
     * @param {?} client - The Client
     */
    constructor(data, client) {
        super(data);
        this.client = client;
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
            data.approximate_member_count || this.#exists?.approximate_members;
        /**
         * The Guild approximate presence count
         * @type {number | undefined}
         */
        this.approximate_presences =
            data.approximate_presence_count || this.#exists?.approximate_presences;
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
        this.channels = new ChannelManager_1.GuildChannelManager(this.id, this.client);
        /**
         * The Guild Bans Manager.
         * @type {GuildBanManager}
         */
        this.bans = new BanManager_1.GuildBanManager(this, this.client);
        /**
         * The Guild voice channels in the cache.
         * @type {Collection}
         */
        this.voice_states = new Collection_1.Collection();
        /**
         * The Guild time information.
         * @type {object}
         */
        this.created = (0, utils_1.getAllStamps)(this);
        this.owner_id = undefined;
        this.widget = false;
        this.widget_channel_id = undefined;
        this.verification_level = 0;
        this.default_message_notifications = 0;
        this.explicit_level = 0;
        this.mfa_level = 0;
        this.welcome_screen = {};
        this.nsfw_level = 0;
        this._patch(data);
    }
    async _patch(data) {
        /**
         * The Guild roles
         * @type {GuildRolesManager}
         */
        this.roles = new RolesManager_1.GuildRolesManager(data, this.client);
        /**
         * The Guild members in the cache.
         * @type {GuildMemberManager}
         */
        this.members = new UserManager_1.GuildMemberManager(this.client, data);
        for (var i of data.voice_states || []) {
            this.voice_states.set(i.channel_id, i);
        }
        if (data.splash) {
            /**
             * The Guild splash hash
             * @type {string | undefined}
             */
            this.splash = data.splash;
        }
        if (data.discovery_spash) {
            /**
             * The Guild discovery splash hash
             * @type {string | undefined}
             */
            this.discovery_splash = data.discovery_spash;
        }
        if (data.owner_id) {
            /**
             * The Guild owner ID
             * @type {string}
             */
            this.owner_id = data.owner_id;
        }
        if (data.afk_channel_id) {
            /**
             * The Guild afk channel ID
             * @type {string | undefined}
             */
            this.afk_channel = data.afk_channel_id;
        }
        if (data.afk_timeout) {
            /**
             * The Guild afk timeout in seconds
             * @type {string | undefined}
             */
            this.afk_timeout = data.afk_timeout;
        }
        if (data.widget_enable) {
            /**
             * If the Guild widget is enabled
             * @type {boolean}
             */
            this.widget = data.widget_enable;
        }
        if (data.widget_channel_id) {
            /**
             * The Guild widget channel ID
             * @type {string | undefined}
             * @readonly
             */
            this.widget_channel_id = data.widget_channel_id;
        }
        if (data.verification_level) {
            /**
             * The Guild verification level of users that join in the Guild
             * @type {number}
             */
            this.verification_level = data.verification_level;
        }
        if (data.default_message_notifications) {
            /**
             * The Guild default message notifactions level
             * @type {number}
             */
            this.default_message_notifications = data.default_message_notifications;
        }
        if (data.explicit_content_filter) {
            /**
             * The Guild explicit content level
             * @type {number}
             */
            this.explicit_level = data.explicit_content_filter;
        }
        if (data.roles?.[0]) {
            for (var i of data.roles) {
                const role = new Role_1.GuildRole(i, this, this.client);
                this.roles.cache.set(i.id, role);
            }
        }
        if (data.emojis?.[0]) {
            for (var i of data.emojis) {
                this.emojis.set(i.id, i);
            }
        }
        if (data?.stickers?.[0]) {
            for (var i of data.stickers) {
                this.stickers.set(i.id, i);
            }
        }
        if (data.mfa_level) {
            /**
             * The Guild MFA (2FA) level
             * @type {number}
             */
            this.mfa_level = data.mfa_level;
        }
        if (data.system_channel_id) {
            /**
             * The Guild system channel ID
             * @type {string | undefined}
             */
            this.system_channel = data.system_channel_id;
        }
        if (this.system_channel && data.system_channel_flags) {
            /**
             * The Guild system channel flags
             * @type {number | undefined}
             */
            this.system_channel_flags = data.system_channel_flags;
        }
        if (data.rules_channel_id) {
            /**
             * The Guild rules channel id
             * @type {string | undefined}
             */
            this.rules_channel = data.rules_channel_id;
        }
        if (data.max_members) {
            /**
             * The Guild max members
             * @type {number}
             */
            this.max_members = data.max_members;
        }
        if (data.vanity_url_code) {
            /**
             * The Guild vanity code (only if the Guild has more than 15 boosts or Boost Tier 3)
             * @type {string}
             */
            this.vanity_invite = data.vanity_url_code;
        }
        if (data.description) {
            /**
             * The Guild description
             * @type {string | undefined}
             */
            this.description = data.description;
        }
        if (data.banner) {
            /**
             * The Guild banner hash
             * @type {string | undefined}
             */
            this.banner = data.banner;
        }
        if (data.premium_tier) {
            /**
             * The Guild Premium Tier (Boost Tier)
             * @type {number}
             */
            this.boost_tier = data.premium_tier;
        }
        if (data.premium_subscription_count) {
            /**
             * The Guild Premium Subscription Count (Boost Count)
             * @type {number}
             */
            this.boost_count = data.premium_subscription_count;
        }
        if (data.preferred_locale) {
            /**
             * The Guild preferred locale
             * @type {string}
             */
            this.preferred_locale = data.preferred_locale;
        }
        if (data.public_updates_channel_id) {
            /**
             * The Guild public channel updates ID
             * @type {string | undefined}
             */
            this.public_channel_id = data.public_updates_channel_id;
        }
        if (data.welcome_screen) {
            /**
             * The Guild welcome screen
             * @type {object | null}
             */
            this.welcome_screen = data.welcome_screen;
        }
        if (data.nsfw_level) {
            /**
             * The Guild nsfw level
             * @type {number}
             */
            this.nsfw_level = data.nsfw_level;
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
        return this.client.rest.cdn.guildIcon(this.id, this.icon, config);
    }
    /**
     * Returns the icon banner of the guild (if has)
     * @param {CDNOptions} config - The config of the request.
     * @returns {Nullable<string>}
     */
    bannerUrl(config) {
        if (!this.banner)
            return null;
        return this.client.rest.cdn.guildBanner(this.id, this.banner, config);
    }
    /**
     * Returns the icon banner of the guild (if has)
     * @param {CDNOptions} config - The config of the request.
     * @returns {Nullable<string>}
     */
    splashUrl(config) {
        if (!this.splash)
            return null;
        return this.client.rest.cdn.guildSplash(this.id, this.splash, config);
    }
    /**
     * Returns the icon banner of the guild (if has)
     * @param {CDNOptions} config - The config of the request.
     * @returns {Nullable<string>}
     */
    discoverySplashUrl(config) {
        if (!this.discovery_splash)
            return null;
        return this.client.rest.cdn.discoverySplash(this.id, this.discovery_splash, config);
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
