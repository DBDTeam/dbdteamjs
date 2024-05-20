import {
  GuildDefaultMessageNotifications,
  GuildExplicitContentFilter,
  GuildMFALevel,
  GuildNSFWLevel,
  GuildVerificationLevel,
} from "discord-api-types/v10";
import { CDNOptions } from "../interfaces/rest/cdn";
import { type Client } from "../client/Client";
import { Nullable } from "../common";
import { Collection } from "../utils/Collection";
import { getAllStamps } from "../utils/utils";
import { Base } from "./Base";
import { GuildChannelManager } from "./Managers/ChannelManager";
import { GuildRolesManager } from "./Managers/RolesManager";
import { GuildMemberManager } from "./Managers/UserManager";
import { GuildRole } from "./Role";
import { VoiceChannel } from "./VoiceChannel";
import * as Endpoints from "../rest/Endpoints";
import { GuildEditData } from "../interfaces/guild/Guild";
import { GuildBanManager } from "./Managers/BanManager";

class Guild extends Base {
  #exists: any;
  readonly client: Client;
  name: string;
  icon: Nullable<string>;
  permissions: number;
  features: Nullable<string[]>;
  approximate_members: Nullable<number>;
  approximate_presences: Nullable<number>;
  roles?: GuildRolesManager;
  emojis: Collection<any, any>;
  stickers: Collection<any, any>;
  channels: GuildChannelManager;
  voice_states: Collection<string, VoiceChannel>;
  members?: GuildMemberManager;
  created: any;
  splash: Nullable<string>;
  discovery_splash: Nullable<string>;
  owner_id: Nullable<string>;
  afk_channel: Nullable<string>;
  afk_timeout: Nullable<number>;
  widget: boolean;
  widget_channel_id: Nullable<string>;
  verification_level: GuildVerificationLevel;
  default_message_notifications: GuildDefaultMessageNotifications;
  explicit_level: GuildExplicitContentFilter;
  mfa_level: GuildMFALevel;
  system_channel: Nullable<string>;
  system_channel_flags: Nullable<number>;
  rules_channel: Nullable<string>;
  max_members: Nullable<number>;
  vanity_invite: Nullable<string>;
  description: Nullable<string>;
  banner: Nullable<string>;
  boost_tier: Nullable<string>;
  boost_count: Nullable<string>;
  preferred_locale: Nullable<string>;
  public_channel_id: Nullable<string>;
  welcome_screen: Record<any, any>;
  nsfw_level: GuildNSFWLevel;
  guild: any;
  bans: GuildBanManager;
  /**
   * Represents a Guild
   * @param {object} data - Guild payload
   * @param {?} client - The Client
   */
  constructor(data: Record<any, any>, client: Client) {
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
     * The Guild Bans Manager.
     * @type {GuildBanManager}
     */
    this.bans = new GuildBanManager(this, this.client)

    /**
     * The Guild voice channels in the cache.
     * @type {Collection}
     */
    this.voice_states = new Collection();
    /**
     * The Guild time information.
     * @type {object}
     */
    this.created = getAllStamps(this);
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

  async _patch(data: any) {
    /**
     * The Guild roles
     * @type {GuildRolesManager}
     */
    this.roles = new GuildRolesManager(data, this.client);
    /**
     * The Guild members in the cache.
     * @type {GuildMemberManager}
     */
    this.members = new GuildMemberManager(this.client, data);
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
  public iconUrl(config: CDNOptions): Nullable<string> {
    if(!this.icon) return null;
    return this.client.rest.cdn.guildIcon(this.id, this.icon, config)
  }

  /**
   * Returns the icon banner of the guild (if has)
   * @param {CDNOptions} config - The config of the request.
   * @returns {Nullable<string>}
   */
  public bannerUrl(config: CDNOptions): Nullable<string> {
    if(!this.banner) return null;
    return this.client.rest.cdn.guildBanner(this.id, this.banner, config)
  }

  /**
   * Returns the icon banner of the guild (if has)
   * @param {CDNOptions} config - The config of the request.
   * @returns {Nullable<string>}
   */
  public splashUrl(config: CDNOptions): Nullable<string> {
    if(!this.splash) return null;
    return this.client.rest.cdn.guildSplash(this.id, this.splash, config)
  }

  /**
   * Returns the icon banner of the guild (if has)
   * @param {CDNOptions} config - The config of the request.
   * @returns {Nullable<string>}
   */
  public discoverySplashUrl(config: CDNOptions): Nullable<string> {
    if(!this.discovery_splash) return null;
    return this.client.rest.cdn.discoverySplash(this.id, this.discovery_splash, config)
  }

  /**
   * Leaves from the server.
   * @async
   */
  public async leave(): Promise<boolean | null> {
    const response = await this.client.rest.request(
      "DELETE",
      Endpoints.UserGuild(this.id),
      true
    );

    if (!response) return response;

    return !response?.error ? true : false;
  }

  public async edit(body: GuildEditData) {
    if (!body || typeof body !== "object") return null;

    const response = await this.client.rest.request(
      "PATCH",
      Endpoints.Guild(this.id),
      true,
      { data: body }
    );

    if(!response || response?.error || !response?.data) return response;

    return new Guild(response.data, this.client)
  }
}

export { Guild };
