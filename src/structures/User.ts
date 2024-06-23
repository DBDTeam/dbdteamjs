import { RESTGetAPIUserResult } from "discord-api-types/v10";
import { Client } from "../client/Client";
import { CDNOptions } from "../interfaces/rest/cdn";
import { Base } from "./Base";

/**
 * Represents a User
 */
export class User extends Base {
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
  globalName!: string;
  /**
   * The User discriminator (if has)
   */
  discriminator?: string;
  /**
   * The User avatar hash
   */
  avatar?: string;
  /**
   * The User banner hash
   */
  banner?: string;
  /**
   * The User accentColor
   */
  accentColor?: string;
  /**
   * The User avatar decoration hash
   */
  avatarDecoration?: string;

  /**
   * Display's the User avatar URL.
   */
  readonly displayAvatarUrl: (opts: any) => any;
  /**
   * Display's the User banner URL.
   */
  readonly displayBannerUrl: (opts: any) => any;
  /**
   * Display's the User default avatar URL.
   */
  readonly displayDefaultAvatarUrl: () => any;

  #client: Client;

  /**
   * @constructor
   * @param data - The data payload
   * @param client - The client
   */
  constructor(data: RESTGetAPIUserResult, client: Client) {
    super(data.id);

    this.id = data.id;
    this.#client = client;
    this.bot = false;
    this.system = false;
    this.flags = 0;

    this.displayAvatarUrl = this.avatarUrl;
    this.displayDefaultAvatarUrl = this.defaultAvatarUrl;
    this.displayBannerUrl = this.bannerUrl;

    this._patch(data);
  }

  _patch(data: any) {
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

  /**
   * Returns the User mention
   */
  toString() {
    return `<@${this.id}>`;
  }
}
