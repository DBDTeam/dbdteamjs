const { User } = require("../structures/User.js");
const Endpoints = require("../rest/Endpoints.js");
const { resolveImage } = require("../utils/ImageResolver.js");

interface EditClientUserPayload {
  username: string | undefined,
  avatar: string | undefined,
}

/**
 * @extends {User}
 */
class ClientUser extends User {
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

    object.avatar = await resolveImage(object.avatar);

    const result = await this.client.rest.request(
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
    if (result.error) {
      return result;
    } else {
      var bot = new ClientUser(result.data, this.client);
      this.client.users.cache.set(this.client.user.id, bot);
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
  async editUsername(username) {
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

  async editAvatar(url) {
    const imageUrl = await resolveImage(url);

    return await this.edit({ avatar: imageUrl });
  }
}

export { ClientUser }
