import { ChannelType, RESTGetAPIUserResult } from "discord-api-types/v10";
import { Client } from "../client/Client";
import { CDNOptions } from "../interfaces/rest/cdn";
import * as Endpoints from "../rest/Endpoints";
import { Base } from "./Base";
import { MessageBodyRequest, Nullable } from "../common";
import { ErrorResponseFromApi } from "../interfaces/rest/requestHandler";
import { TextChannel } from ".";
import { typeChannel } from "../utils/utils";
import { DMChannel } from "./DMChannel";
export type Badge =
  | "Discord Employee"
  | "Discord Partner"
  | "HypeSquad Events"
  | "Bug Hunter Level 1"
  | "HypeSquad Bravery"
  | "HypeSquad Brilliance"
  | "HypeSquad Balance"
  | "Early Nitro Supporter"
  | "Team User"
  | "Bug Hunter Level 2"
  | "Verified Bot"
  | "Early Verified Bot Developer"
  | "Moderator Programs Alumni"
  | "Bot with HTTP Interactions"
  | "Active Developer"
  | "Nitro Basic"
  | "Nitro"
  | "Pomelo";

const badgesMapping: Record<number, Badge> = {
  1: "Discord Employee",
  2: "Discord Partner",
  4: "HypeSquad Events",
  8: "Bug Hunter Level 1",
  64: "HypeSquad Bravery",
  128: "HypeSquad Brilliance",
  256: "HypeSquad Balance",
  512: "Early Nitro Supporter",
  1024: "Team User",
  16384: "Bug Hunter Level 2",
  65536: "Verified Bot",
  131072: "Early Verified Bot Developer",
  262144: "Moderator Programs Alumni",
  524288: "Bot with HTTP Interactions",
  4194304: "Active Developer",
};
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
    this.badges = Object.entries(badgesMapping)
      .filter(([flag]) => (this.flags & Number(flag)) !== 0)
      .map(([, badge]) => badge);

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
      { data: { recipient_id: this.id } }
    );

    if (result?.error || !result?.data) return result as ErrorResponseFromApi;

    const dm = typeChannel(result.data, this.#client) as DMChannel; // idk why, but it works, if
    // i use new TextChannel(...) makes a circular dependency error lmfao

    this.dmChannel = dm;

    return dm;
  }

  async send(body: MessageBodyRequest | string) {
    if(!this.dmChannel) await this.createDM();

    return this.dmChannel?.send(body)
  }

  /**
   * Returns the User mention
   */
  toString() {
    return `<@${this.id}>`;
  }
}

export { User };