import { RESTGetAPIUserResult } from "discord-api-types/v10";
import { Client } from "../client/Client";
import { CDNOptions } from "../common/interfaces/rest/cdn";
import * as Endpoints from "../rest/Endpoints";
import { Base } from "./Base";
import { Badge, BadgesBitfieldValues, MessageBodyRequest, Nullable } from "../common";
import { DMChannel } from "./DMChannel";
import { Utilities } from "../utils/utils";
import { RESTResponse } from "../rest/requestHandler";

/**
 * Represents a User
 */
class User extends Base {
  /**
   * The User ID
   */
  id: string;
  /**
   * If the user is a bot
   */
  bot: boolean;
  /**
   * If the user is the system
   */
  system: boolean;
  /**
   * The user flags
   */
  flags: number;
  /**
   * The User name
   */
  username!: string;
  /**
   * The User global name
   */
  globalName!: Nullable<string>;
  /**
   * The User discriminator (if has)
   */
  discriminator?: Nullable<string>;
  /**
   * The User avatar hash
   */
  avatar?: Nullable<string>;
  /**
   * The User banner hash
   */
  banner?: Nullable<string>;
  /**
   * The User accentColor
   */
  accentColor?: Nullable<number>;
  /**
   * The User avatar decoration hash
   */
  avatarDecoration?: Nullable<string>;

  /**
   * The user badges.
   */
  badges?: Badge[];

  /**
   * The user dm channel to send messages.
   */
  dmChannel?: DMChannel;

  /**
   * Display's the User avatar URL.
   */
  readonly displayAvatarUrl: (opts?: any) => any;
  /**
   * Display's the User banner URL.
   */
  readonly displayBannerUrl: (opts?: any) => any;
  /**
   * Display's the User default avatar URL.
   */
  readonly displayDefaultAvatarUrl: () => any;

  #client: Client;

  #oldUser: Nullable<User>;
  /**
   * @constructor
   * @param data - The data payload
   * @param client - The client
   */
  constructor(data: RESTGetAPIUserResult, client: Client) {
    super(data.id);

    this.id = data.id;
    this.#client = client;
    this.bot = !!data.bot;
    this.system = false;
    this.flags = 0;
    this.#oldUser = this.#client.users.cache.get(data.id);

    this.displayAvatarUrl = this.avatarUrl;
    this.displayDefaultAvatarUrl = this.defaultAvatarUrl;
    this.displayBannerUrl = this.bannerUrl;

    this._patch(data);
  }

  _patch(data: RESTGetAPIUserResult) {
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

    this.banner =
      "banner" in data && data.banner != null
        ? data.banner
        : this.#oldUser?.banner ?? null;

    this.accentColor =
      "accent_color" in data && data.accent_color != null
        ? data.accent_color
        : this.#oldUser?.accentColor ?? null;

    this.avatarDecoration =
      "avatar_decoration" in data && data.avatar_decoration != null
        ? data.avatar_decoration
        : this.#oldUser?.avatarDecoration ?? null;
    this.badges = Object.entries(BadgesBitfieldValues)
      .filter(([flag]) => (this.flags & Number(flag)) !== 0)
      .map(([, badge]) => badge);

      this.dmChannel = this.#oldUser?.dmChannel ?? undefined;

    if (data.premium_type === 3 || data.premium_type === 1) {
      this.badges.push("Nitro Basic");
    }
    if (data.premium_type === 2) {
      this.badges.push("Nitro");
    }

    if (this.discriminator === "0" || this.discriminator === "") {
      this.badges.push("Pomelo");
    }

    this.#client.users.cache.set(this.id, this);
  }

  /**
   * If the User is a partial
   */
  get partial(): boolean {
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
  avatarUrl(opts?: CDNOptions): undefined | string {
    if (!this.id) return;
    return this.#client.rest.cdn.avatar(this.id, this.avatar as string, opts);
  }

  /**
   * Returns the User default avatar URL
   * @example
   * const user = client.users.cache.get("738824089128665118")
   *
   * user.defaultAvatarUrl()// https://cdn.discordapp.com/embed/avatars/0.png
   */
  defaultAvatarUrl(): undefined | string {
    if (!this.id) return;
    return this.#client.rest.cdn.defaultAvatar(this.discriminator, this.id);
  }

  /**
   * Returns the User banner URL
   * @param opts - The CDN Options
   * @example
   * const user = client.users.cache.get("640685917467705344")
   *
   * user.bannerUrl() // https://cdn.discordapp.com/banners/640685917467705344/0510a7bd372082644a05c92ffbbe7b2b.webp
   */
  bannerUrl(opts: CDNOptions) {
    if (!this.id) return;
    return this.#client.rest.cdn.banner(this.id, this.banner as string, opts);
  }

  async createDM() {
    if (this.dmChannel) return this.dmChannel;
    const result = await this.#client.rest.request(
      "POST",
      Endpoints.UserDM(),
      true,
      { recipient_id: this.id }
    );

    if (result?.error || !result) return result as RESTResponse;

    this.dmChannel = new DMChannel(result, this.#client)

    this.#client.users.cache.set(this.id, this)
    this.#client.channels.cache.set(this.dmChannel.id, this.dmChannel)

    return this.dmChannel
  }

  async send(body: MessageBodyRequest | string) {
    if (!this.dmChannel) await this.createDM();

    return this.dmChannel?.send(body);
  }

  /**
   * Returns the User mention
   */
  toString() {
    return `<@${this.id}>`;
  }

  static type = "User";
}

export { User };
