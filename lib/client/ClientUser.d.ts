import { User } from "../structures/User";
interface EditClientUserPayload {
    username: string | undefined;
    avatar: string | undefined;
}
/**
 * @extends {User}
 */
declare class ClientUser extends User {
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
    edit(object: EditClientUserPayload): Promise<import("../rest/requestHandler").ResponseFromApi | ClientUser | null>;
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
    editUsername(username: any): Promise<import("../rest/requestHandler").ResponseFromApi | ClientUser | null>;
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
    editAvatar(url: any): Promise<import("../rest/requestHandler").ResponseFromApi | ClientUser | null>;
}
export { ClientUser };
