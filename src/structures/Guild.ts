const { Base } = require("./Base");
const { GuildChannelManager } = require("./Managers/ChannelManager");
const { readOnly, getAllStamps } = require("../utils/utils");
const { Collection } = require("../utils/Collection");
const { GuildMemberManager } = require("./Managers/UserManager");
const { GuildRolesManager } = require("./Managers/RolesManager");
const { GuildRole } = require("./Role");

class Guild extends Base {
  #exists;
  /**
   * Represents a Guild
   * @param {object} data - Guild payload
   * @param {?} client - The Client
   */
  constructor(data, client) {
    super(client);
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
    this.approximateMemberCount =
      data.approximate_member_count || this.#exists?.approximateMemberCount;
    /**
     * The Guild approximate presence count
     * @type {number | undefined}
     */
    this.approximatePresenceCount =
      data.approximate_presence_count || this.#exists?.approximatePresenceCount;
    /**
     * The Guild roles
     * @type {GuildRolesManager}
     */
    this.roles = new GuildRolesManager(data, this.client);
    /**
     * The Guild emojis
     * @type {Collection}
     */
    this.emojis = new Collection();
    /**
     * The Guild stickers
     * @type {Collection}
     */
    this.stickers = new Collection();
    /**
     * The Guild channels
     * @type {GuildChannelManager}
     */
    this.channels = new GuildChannelManager(this.id, this.client);
    /**
     * The Guild voice channels in the cache.
     * @type {Collection}
     */
    this.voiceStates = new Collection();
    /**
     * The Guild members in the cache.
     * @type {GuildMemberManager}
     */
    this.members = new GuildMemberManager(this.client, data);
    /**
     * The Guild time information.
     * @type {object}
     */
    this.created = getAllStamps(this.getCreatedAt);
    this._patch(data);
  }

  async _patch(data) {
    for (var i of data.voice_states || []) {
      this.voiceStates.set(i.channel_id, i);
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
      this.discoverySplash = data.discovery_spash;
    }
    if (data.owner_id) {
      /**
       * The Guild owner ID
       * @type {string}
       */
      this.ownerId = data.owner_id;
    }
    if (data.afk_channel_id) {
      /**
       * The Guild afk channel ID
       * @type {string | undefined}
       */
      this.afkChannel = data.afk_channel_id;
    }
    if (data.afk_timeout) {
      /**
       * The Guild afk timeout in seconds
       * @type {string | undefined}
       */
      this.afkTimeout = data.afk_timeout;
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
      readOnly(this, "widgetChannelId", data.widget_channel_id);
    }
    if (data.verification_level) {
      /**
       * The Guild verification level of users that join in the Guild
       * @type {number}
       */
      this.verificationLevel = data.verification_level;
    }
    if (data.default_message_notifications) {
      /**
       * The Guild default message notifactions level
       * @type {number}
       */
      this.defaultMessageNotificationsLevel =
        data.default_message_notifications;
    }
    if (data.explicit_content_filter) {
      /**
       * The Guild explicit content level
       * @type {number}
       */
      this.explicitContentLevel = data.explicit_content_filter;
    }
    if (data.roles?.[0]) {
      for (var i of data.roles) {
        const role = new GuildRole(i, this, this.client);
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
      this.mfaLevel = data.mfa_level;
    }
    if (data.system_channel_id) {
      /**
       * The Guild system channel ID
       * @type {string | undefined}
       */
      this.systemChannel = data.system_channel_id;
    }
    if (this.systemChannel && data.system_channel_flags) {
      /**
       * The Guild system channel flags
       * @type {number | undefined}
       */
      this.systemChannelFlags = data.system_channel_flags;
    }
    if (data.rules_channel_id) {
      /**
       * The Guild rules channel id
       * @type {string | undefined}
       */
      this.rulesChannel = data.rules_channel_id;
    }
    if (data.max_members) {
      /**
       * The Guild max members
       * @type {number}
       */
      this.maxMembers = data.max_members;
    }
    if (data.vanity_url_code) {
      /**
       * The Guild vanity code (only if the Guild has more than 15 boosts or Boost Tier 3)
       * @type {string}
       */
      this.vanityInvite = data.vanity_url_code;
    }
    if (data.description) {
      /**
       * The Guild description
       * @type {string | undefined}
       */
      this.descriptionn = data.description;
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
      this.boostTier = data.premium_tier;
    }
    if (data.premium_subscription_count) {
      /**
       * The Guild Premium Subscription Count (Boost Count)
       * @type {number}
       */
      this.boostCount = data.premium_subscription_count;
    }
    if (data.preferred_locale) {
      /**
       * The Guild preferred locale
       * @type {string}
       */
      this.preferredLocale = data.preferred_locale;
    }
    if (data.public_updates_channel_id) {
      /**
       * The Guild public channel updates ID
       * @type {string | undefined}
       */
      this.publicChannelUpdates = data.public_updates_channel_id;
    }
    if (data.welcome_screen) {
      /**
       * The Guild welcome screen
       * @type {object | null}
       */
      this.welcomeScreen = data.welcome_screen;
    }
    if (data.nsfw_level) {
      /**
       * The Guild nsfw level
       * @type {number}
       */
      this.nsfwLevel = data.nsfw_level;
    }
  }
}

export { Guild };