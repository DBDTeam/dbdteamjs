import {
  APIGuild,
  APIGuildWelcomeScreen,
  GatewayGuildCreateDispatchData,
  GuildDefaultMessageNotifications,
  GuildExplicitContentFilter,
  GuildMFALevel,
  GuildNSFWLevel,
  GuildPremiumTier,
  GuildVerificationLevel,
  RESTPatchAPIGuildJSONBody,
} from "discord-api-types/v10";
import { CDNOptions } from "../interfaces/rest/cdn";
import { type Client } from "../client/Client";
import { Nullable } from "../common";
import { Collection } from "../utils/Collection";
import { getAllStamps } from "../utils/utils";
import { Base } from "./Base";
import { GuildChannelManager } from "./Managers/GuildChannelManager";
import { GuildRolesManager } from "./Managers/RolesManager";
import { GuildMemberManager } from "./Managers/GuildMemberManager";
import { GuildRole } from "./Role";
import { VoiceChannel } from "./VoiceChannel";
import * as Endpoints from "../rest/Endpoints";
import { GuildBanManager } from "./Managers/BanManager";

class Guild extends Base {
  #exists: any;
  readonly client: Client;
  name: string;
  icon: Nullable<string>;
  permissions: Nullable<string>;
  features: Nullable<string[]>;
  approximate_members: Nullable<number>;
  approximate_presences: Nullable<number>;
  roles: GuildRolesManager;
  emojis: Collection<any, any>;
  stickers: Collection<any, any>;
  channels: GuildChannelManager;
  members: GuildMemberManager;
  created: any;
  splash: Nullable<string>;
  discovery_splash: Nullable<unknown>;
  owner_id: Nullable<string>;
  afk_channel: Nullable<string>;
  afk_timeout: Nullable<number>;
  widget_enabled: Nullable<unknown>;
  widget_channel_id: Nullable<string>;
  verification_level?: GuildVerificationLevel;
  default_message_notifications?: GuildDefaultMessageNotifications;
  explicit_level?: GuildExplicitContentFilter;
  mfa_level?: GuildMFALevel;
  system_channel: Nullable<string>;
  system_channel_flags: Nullable<number>;
  rules_channel: Nullable<string>;
  max_members: Nullable<number>;
  vanity_invite: Nullable<string>;
  description: Nullable<string>;
  banner: Nullable<string>;
  boost_tier: Nullable<GuildPremiumTier>;
  boost_count: Nullable<number>;
  preferred_locale: Nullable<string>;
  public_channel_id: Nullable<string>;
  welcome_screen: Nullable<APIGuildWelcomeScreen>;
  nsfw_level!: GuildNSFWLevel;
  bans: GuildBanManager;
  #data: any;
  /**
   * Represents a Guild
   * @param {object} data - Guild payload
   * @param {?} client - The Client
   */
  constructor(data: APIGuild | GatewayGuildCreateDispatchData, client: Client) {
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
     * The Guild time information.
     * @type {object}
     */
    this.created = getAllStamps(this);
    /**
     * The owner id of the guild
     * @type {string}
     */
    this.owner_id = data.owner_id;
     /**
     * The Guild roles
     * @type {GuildRolesManager}
     */
     this.roles = new GuildRolesManager(this, this.client);
     /**
     * The Guild members in the cache.
     * @type {GuildMemberManager}
     */
    this.members = new GuildMemberManager(this.client, this);
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
        const role = new GuildRole(roleData, this, this.client);
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
  public iconUrl(config?: CDNOptions): Nullable<string> {
    if(!this.icon) return null;
    return this.client.rest.cdn.guildIcon(this.id, this.icon, config || {})
  }

  /**
   * Returns the icon banner of the guild (if has)
   * @param {CDNOptions} config - The config of the request.
   * @returns {Nullable<string>}
   */
  public bannerUrl(config?: CDNOptions): Nullable<string> {
    if(!this.banner) return null;
    return this.client.rest.cdn.guildBanner(this.id, this.banner, config || {})
  }

  /**
   * Returns the icon banner of the guild (if has)
   * @param {CDNOptions} config - The config of the request.
   * @returns {Nullable<string>}
   */
  public splashUrl(config?: CDNOptions): Nullable<string> {
    if(!this.splash) return null;
    return this.client.rest.cdn.guildSplash(this.id, this.splash, config || {})
  }

  /**
   * Returns the icon banner of the guild (if has)
   * @param {CDNOptions} config - The config of the request.
   * @returns {Nullable<string>}
   */
  public discoverySplashUrl(config?: CDNOptions): Nullable<string> {
    if(!this.discovery_splash) return null;
    return this.client.rest.cdn.discoverySplash(this.id, this.discovery_splash as string, config || {})
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

  public async edit(body: RESTPatchAPIGuildJSONBody) {
    if (!body || typeof body !== "object") return null;

    const response = await this.client.rest.request(
      "PATCH",
      Endpoints.Guild(this.id),
      true,
      { data: body }
    );

    if(!response || response?.error || !response?.data) return response;

    return new Guild(response.data as APIGuild, this.client)
  }
}

export { Guild };
