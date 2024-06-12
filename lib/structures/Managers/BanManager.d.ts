import { type Client } from "../../client";
import { Collection } from "../../utils/Collection";
import { type Guild } from "../Guild";
import { FetchWithLimitAfterAndBefore } from "./ThreadMemberManager";
import { Nullable } from "../../common";
import { User } from "../User";
import { Member } from "../Member";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
export declare class GuildBanManager {
    readonly client: Client;
    /**
     * Represents the Guild bans cache.
     */
    cache: Collection<string, Record<string, any>>;
    /**
     * Represents the guild id.
     */
    id: string;
    constructor(guild: Guild, client: Client);
    get guild(): Guild;
    /**
     * Fetches a guild ban if target is defined, otherwise, it fetches the first 100 bans.
     * @param {Nullable<string>} target - The target id of the ban to fetch.
     * @param {FetchWithLimitAfterAndBefore} [options] - The options of the fetch. (Only when target is not defined.)
     * @returns {Promise<Nullable<ErrorResponseFromApi | Record<string, any>>> }
     */
    fetch(target: Nullable<string>, options?: FetchWithLimitAfterAndBefore): Promise<Nullable<ErrorResponseFromApi | Record<string, any>>>;
    /**
     * Creates a ban in the current guild.
     * @param {string | User | Member} userId - The user to ban.
     * @param {string} [reason] - The reason of the ban.
     * @returns
     */
    create(userId: User | string | Member, reason?: string): Promise<boolean>;
    /**
     * Removes a ban in the current guild.
     * @param {string | User | Member} userId - The user to unban.
     * @returns
     */
    remove(userId: User | string | Member): Promise<boolean>;
}
