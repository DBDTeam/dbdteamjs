import { Client } from "../client/Client";
import { Guild } from "./Guild";
import { APIRole, APIRoleTags, RESTPatchAPIGuildRoleJSONBody } from "discord-api-types/v10";
import { Base } from "./Base";
import { ErrorResponseFromApi } from "../interfaces";
export interface EditRolePayload {
    name: string;
    permissions: string;
    color: number;
    hoist: boolean;
    icon: string;
    unicode_emoji: string;
    mentionable: boolean;
    reason?: string;
}
/**
 * Represents a Discord Guild Role
 */
export declare class GuildRole extends Base {
    #private;
    data: APIRole;
    /**
     * The ID of the guild to which the role belongs.
     */
    guildId: string;
    /**
     * The name of the role.
     */
    name: string;
    /**
     * Whether the role is displayed separately in the member list.
     */
    hoist: boolean;
    /**
     * The role's icon hash, if it has one.
     */
    icon: string | null;
    /**
     * The role's position in the hierarchy.
     */
    position: number;
    /**
     * The permissions the role has.
     */
    permissions: number;
    /**
     * Whether the role is managed by an integration.
     */
    managed: boolean;
    /**
     * Whether the role is mentionable.
     */
    mentionable: boolean;
    /**
     * The role's tags.
     */
    tags: APIRoleTags;
    /**
     * The role's flags.
     */
    role_flags: number;
    /**
     * The guild to which the role belongs.
     */
    private guild;
    constructor(data: APIRole, guild: Guild, client: Client);
    _patch(): void;
    delete(reason?: undefined): Promise<boolean>;
    edit(body: RESTPatchAPIGuildRoleJSONBody & {
        position?: number;
    }, reason?: string): Promise<ErrorResponseFromApi | GuildRole>;
    setName(name: string, reason?: string): Promise<ErrorResponseFromApi | GuildRole>;
    setPosition(position: number, reason?: string): Promise<ErrorResponseFromApi | GuildRole>;
    setColor(color: number, reason?: string): Promise<ErrorResponseFromApi | GuildRole>;
    setHoist(hoist: boolean, reason?: string): Promise<ErrorResponseFromApi | GuildRole>;
    setIcon(icon: string, reason?: string): Promise<ErrorResponseFromApi | GuildRole>;
    setEmoji(unicode_emoji: string, reason?: string): Promise<ErrorResponseFromApi | GuildRole>;
    setMentionable(mentionable: boolean, reason?: string): Promise<ErrorResponseFromApi | GuildRole>;
}
