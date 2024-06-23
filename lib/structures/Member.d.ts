import { Client } from "../client/Client";
import { Nullable, PresenceData } from "../common";
import { SnowflakeInformation } from "../utils/utils";
import { Base } from "./Base";
import { Guild } from "./Guild";
import { MemberRolesManager } from "./Managers/RolesManager";
import { User } from "./User";
import { ErrorResponseFromApi, ResponseFromApi } from "../interfaces/rest/requestHandler";
/**
 * Represents a guild member and provides methods to manage and interact with it.
 */
declare class Member extends Base {
    #private;
    readonly guild: Guild;
    /**
     * The date the member joined the guild.
     */
    joined: SnowflakeInformation;
    /**
     * The user associated with this member.
     */
    user: User;
    /**
     * Whether the member is muted.
     */
    muted: boolean;
    /**
     * Whether the member is deafened.
     */
    deafened: boolean;
    /**
     * The flags associated with the member.
     */
    flags: bigint;
    /**
     * The permissions of the member.
     */
    permissions: any;
    /**
     * The IDs of the roles assigned to the member.
     */
    role_ids: string[];
    /**
     * The roles manager for the member.
     */
    roles: MemberRolesManager;
    /**
     * The presence status of the member.
     */
    presence: Nullable<PresenceData>;
    /**
     * The nickname of the member.
     */
    nick: Nullable<string>;
    /**
     * The avatar of the member.
     */
    avatar: Nullable<string>;
    /**
     * The date the member started boosting the guild.
     */
    premiumSince: SnowflakeInformation;
    /**
     * Whether the member is pending.
     */
    pending: boolean;
    /**
     * The date until the member is communication disabled.
     */
    communicationDisabledUntil: Nullable<SnowflakeInformation>;
    /**
     * The timeout date of the member.
     */
    timeoutUntil: Nullable<SnowflakeInformation>;
    /**
     * Whether the member is communication disabled.
     */
    communicationDisabled: boolean;
    /**
     * Whether the member is timeouted.
     */
    timeouted: boolean;
    /**
     * Creates a new Member instance.
     * @param data - The data for the member.
     * @param guild - The guild the member belongs to.
     * @param client - The client instance.
     */
    constructor(data: Record<any, any>, guild: Guild, client: Client);
    /**
     * Gets the user associated with this member.
     * @returns The User instance of the member.
     */
    get author(): any;
    /**
     * Patches the member with new data.
     * @param data - The data to patch the member with.
     * @private
     */
    _patch(data: any): void;
    /**
     * Makes the member leave the guild.
     */
    leave(): void;
    /**
     * Checks if the member is kickable.
     * @returns True if the member can be kicked, false otherwise.
     */
    get kickable(): boolean;
    /**
     * Checks if the member is bannable.
     * @returns True if the member can be banned, false otherwise.
     */
    get bannable(): boolean;
    /**
     * Edits the member with the provided payload.
     * @param obj - The payload for editing the member.
     * @returns {Promise<boolean>} True if the edit was successful, false otherwise.
     */
    edit(obj: any): Promise<boolean>;
    /**
     * Changes the nickname of the member.
     * @param nickname - The new nickname.
     * @param reason - The reason for changing the nickname.
     * @returns The response from the API.
     */
    changeNickname(nickname: string, reason: string): Promise<Nullable<ErrorResponseFromApi | ResponseFromApi>>;
    /**
     * Kicks the member from the guild.
     * @param reason - The reason for kicking the member.
     * @returns The response from the API.
     */
    kick(reason: string): Promise<Nullable<ErrorResponseFromApi | ResponseFromApi>>;
    /**
     * Bans the member from the guild.
     * @param obj - The payload for banning the member.
     * @returns The response from the API.
     */
    ban(obj: {
        delete_message_seconds: number;
        reason: string;
    }): Promise<Nullable<ErrorResponseFromApi | ResponseFromApi>>;
    /**
     * Returns a string representation of the member.
     * @returns The mention string of the member.
     */
    toString(): string;
}
export { Member };
