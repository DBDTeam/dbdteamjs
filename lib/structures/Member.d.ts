declare const Base: any;
/**
 * @typedef {import('./Guild.js').Guild} Guild
 * @typedef {import("./Payloads/MemberEditPayload").MemberEditPayloadData} MemberEditPayloadData
 */
declare class Member extends Base {
    #private;
    /**
     * Represents a GuildMember
     * @param {Object} data - The member payload
     * @param {Guild} guild - The guild where the member is it
     * @param {?} client - The Client
     */
    constructor(data: any, guild: any, client: any);
    /**
     * Represents the user
     * @type {User}
     * @returns {User}
     */
    get author(): any;
    _patch(data: any): void;
    /**
     * If the GuildMember is kickable by the Client
     * @type {boolean}
     * @returns {boolean}
     */
    get kickable(): boolean;
    /**
     * If the GuildMember is banneable by the Client
     * @type {boolean}
     * @returns {boolean}
     */
    get banneable(): boolean;
    /**
     * Changes the nickname of the GuildMember
     *
     * @param {MemberEditPayloadData} obj -
     * @returns {Promise<boolean>}
     * @async
     */
    edit(obj: any): Promise<boolean>;
    /**
     * Edits the GuildMember nickname
     *
     * @param {string} nickname - The new nickname for the GuildMember
     * @param {string} reason - The reason
     * @returns {Promise<Object>}
     * @async
     */
    changeNickname(nickname: any, reason: any): Promise<any>;
    /**
     * Kick the GuildMember from the server
     * @param {string} reason - The reason
     * @returns {Promise<Object>}
     * @async
     */
    kick(reason: any): Promise<any>;
    /**
     * Ban the GuildMember from the server
     *
     * @typedef {Object} MemberBanOptions
     * @property {string} [reason] - The reason
     * @property {number} [delete_message_seconds]
     *
     * @param {MemberBanOptions} obj - The options to ban a member
     *
     * @returns {Promise<Object>}
     * @async
     */
    ban(obj: any): Promise<any>;
    /**
     * Returns the mention of the GuildMember
     * @returns {string}
     */
    toString(): string;
}
export { Member };
