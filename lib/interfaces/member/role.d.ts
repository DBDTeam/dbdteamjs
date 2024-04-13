export interface GuildRoleCreatePayload {
    name: string;
    permissions?: string;
    color?: number;
    hoist?: boolean;
    icon?: string;
    unicode_emoji?: Record<string, any>;
    mentionable?: boolean;
    reason?: string | null;
}
export interface GuildMemberRoleOptions {
    roles: string[];
    reason?: string | undefined | null;
}
