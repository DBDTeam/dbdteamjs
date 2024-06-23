import { APIUser } from "discord-api-types/v10";
import { EditClientUserPayload } from "../common";
import * as Endpoints from "../rest/Endpoints";
import { User } from "../structures/User";
import { resolveImage } from "../utils/ImageResolver";
import { Client } from "./Client";

/**
 * @extends {User}
 */
class ClientUser extends User {
  #client: Client;
  constructor(data: any, client: Client) {
    super(data, client)
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
  async edit(object: EditClientUserPayload) {
    if (object.avatar) {
      object.avatar = await resolveImage(object.avatar);
    }

    const result = await this.#client.rest.request(
      "PATCH",
      Endpoints.User("@me"),
      true,
      {
        data: object,
        headers: {
          "Content-Length": Buffer.byteLength(JSON.stringify(object)),
        },
      }
    );

    if (!result) return result;

    if (result.error || !this.#client.user) {
      return result;
    } else {
      var bot = new ClientUser(result.data as APIUser, this.#client);
      this.#client.users.cache.set(this.#client.user.id, bot);
      return bot;
    }
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
    const imageUrl = await resolveImage(url);

    return await this.edit({ avatar: imageUrl });
  }
}

export { ClientUser };
