import { Client } from "../client/Client";
import { Guild } from "./Guild";
import { APIRole, APIRoleTags, RESTPatchAPIGuildRoleJSONBody } from "discord-api-types/v10";
import { Base } from "./Base";
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
    data: APIRole;
    private client;
    guildId: any;
    name: any;
    hoist: boolean;
    icon: string | null;
    position: any;
    permissions: any;
    managed: boolean;
    mentionable: boolean;
    tags: APIRoleTags;
    flags: any;
    readonly guild?: Guild;
    constructor(data: APIRole, guild: Guild, client: Client);
    _patch(): void;
    delete(reason?: undefined): Promise<boolean>;
    edit(body: RESTPatchAPIGuildRoleJSONBody & {
        position?: number;
    }, reason?: string): Promise<GuildRole | null>;
    setName(name: string, reason?: string): Promise<GuildRole | null>;
    setPosition(position: number, reason?: string): Promise<GuildRole | null>;
    setColor(color: number, reason?: string): Promise<GuildRole | null>;
    setHoist(hoist: boolean, reason?: string): Promise<GuildRole | null>;
    setIcon(icon: string, reason?: string): Promise<GuildRole | null>;
    setEmoji(unicode_emoji: string, reason?: string): Promise<GuildRole | null>;
    setMentionable(mentionable: boolean, reason?: string): Promise<GuildRole | null>;
}
