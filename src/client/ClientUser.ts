import { APIUser } from "discord-api-types/v10";
import { EditClientUserPayload } from "../common";
import * as Endpoints from "../rest/Endpoints";
import { User } from "../structures/User";
import { resolveImage } from "../utils/ImageResolver";
import { Client } from "./Client";
import { ErrorNames } from "./errors/ErrorList";
import { ClientTypeError } from "./errors/ClientError";

/**
 * @extends {User}
 */
class ClientUser extends User {
  #client: Client;
  constructor(data: any, client: Client) {
    super(data, client);
    this.#client = client;
  }
  /**
   *
   * @param {object} object - The new info to edit the client
   * @example
   * client.edit({
   *  username: "DBDTeamJS",
   *  avatar: `https://cdn.discordapp.com/icons/759558437088264202/a_a54e72d76462c99427db0287b7312d02.png`
   * }).then((result) => {
   *  if(result.error){console.log(result)}
   *  console.log(`Changed avatar + username successfully!`)
   * })
   * @returns {Promise<ClientUser>}
   */
  async edit(newInfo: EditClientUserPayload) {
    if (!newInfo || typeof newInfo !== "object")
      throw new ClientTypeError(ErrorNames.InvalidType, "object", "newInfo");

    let avatar: Record<any, any> | null = null;

    if (newInfo.avatar) {
      avatar = await resolveImage(newInfo.avatar);
    }

    const payload = {
      username: newInfo.username,
      avatar: avatar?.uri ?? (newInfo.avatar === "" ? "" : null),
    };

    const result = await this.#client.rest.request(
      "PATCH",
      Endpoints.User("@me"),
      true,
      payload,
      null,
      null
    );

    if (!result || result.error) return result;

    var bot = new ClientUser(result as APIUser, this.#client);
    this.#client.users.cache.set(this.#client.user.id, bot);
    return bot;
  }

  /**
   *
   * @param {string} username - The new username of the Client
   *
   * @example
   * client.editUsername(`DBDTeamJS`).then((result) => {
   *  if(result.error){console.log(result)}
   *  console.log(`Changed username successfully!`)
   * })
   *
   * @returns {Promise<ClientUser>}
   */
  async editUsername(username: string) {
    return await this.edit({ username });
  }

  /**
   *
   * @param {string} url - The new username of the Client
   *
   * @example
   * const link = `https://cdn.discordapp.com/icons/759558437088264202/a_a54e72d76462c99427db0287b7312d02.png`
   * client.editAvatar(link).then((result) => {
   *  if(result.error){console.log(result)}
   *  console.log(`Changed avatar successfully!`)
   * })
   *
   * @returns {Promise<ClientUser>}
   */

  async editAvatar(url: string) {
    return await this.edit({ avatar: url });
  }
}

export { ClientUser };
