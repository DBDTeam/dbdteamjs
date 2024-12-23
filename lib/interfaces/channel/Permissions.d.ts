import { ResponseFromApi } from "../rest/requestHandler";
export interface ChannelPermissionSuccessResponse extends ResponseFromApi {
    /**
    * The allowed perms of the response. (if any)
    */
    allow?: number;
    /**
     * The disallowed perms of the response. (if any)
     */
    deny?: number;
}
export interface TargetPayload {
    /**
     * The type of permission overwrite, 0 for GuildRoles, 1 for GuildMembers.
     */
    type?: 0 | 1;
    /**
     * The target id of the role or member.
     */
    targetId: string;
    /**
     * The Channel Id
     */
    id?: string;
}
export interface ObjectOfThePerms {
    /**
     * The array of permissions bitwise to allow in the current channel.
     */
    allow?: number[];
    /**
     * The array of permissions bitwise to disable in the current channel.
     */
    deny?: number[];
}
export type AllPermissionsNames = "CreateInstantInvite" | "KickMembers" | "BanMembers" | "Administrator" | "ManageChannels" | "ManageGuilds" | "AddReactions" | "ViewAuditLog" | "PrioritySpeaker" | "Stream" | "ViewChannel" | "SendMessages" | "SendTTSMessages" | "ManageMessages" | "EmbedLinks" | "AttachFiles" | "ReadMessageHistory" | "MentionEveryone" | "UseExternalEmojis" | "ViewGuildInsights" | "Connect" | "Speak" | "MuteMembers" | "DeafenMembers" | "MoveMembers" | "UseVAD" | "ChangeNickname" | "ManageNicknames" | "ManageRoles" | "ManageWebhooks" | "ManageEmojis";
export type PermissionRoleNames = Omit<AllPermissionsNames, "ManageChannels" | "SendMessages" | "SendTTSMessages" | "ManageMessages" | "EmbedLinks" | "AttachFiles" | "MentionEveryone" | "UseExternalEmojis" | "ViewChannel" | "ReadMessageHistory">;
export type PermissionsChannelName = Omit<AllPermissionsNames, "Administrator" | "ManageGuilds" | "ManageRoles" | "ManageNicknames" | "ManageWebhooks" | "ManageEmojis">;
export declare enum PermissionsNames {
    CreateInstantInvite = "CreateInstantInvite",
    KickMembers = "KickMembers",
    BanMembers = "BanMembers",
    Administrator = "Administrator",
    ManageChannels = "ManageChannels",
    ManageGuilds = "ManageGuilds",
    AddReactions = "AddReactions",
    ViewAuditLog = "ViewAuditLog",
    PrioritySpeaker = "PrioritySpeaker",
    Stream = "Stream",
    ViewChannel = "ViewChannel",
    SendMessages = "SendMessages",
    SendTTSMessages = "SendTTSMessages",
    ManageMessages = "ManageMessages",
    EmbedLinks = "EmbedLinks",
    AttachFiles = "AttachFiles",
    ReadMessageHistory = "ReadMessageHistory",
    MentionEveryone = "MentionEveryone",
    UseExternalEmojis = "UseExternalEmojis",
    ViewGuildInsights = "ViewGuildInsights",
    Connect = "Connect",
    Speak = "Speak",
    MuteMembers = "MuteMembers",
    DeafenMembers = "DeafenMembers",
    MoveMembers = "MoveMembers",
    UseVAD = "UseVAD",
    ChangeNickname = "ChangeNickname",
    ManageNicknames = "ManageNicknames",
    ManageRoles = "ManageRoles",
    ManageWebhooks = "ManageWebhooks",
    ManageEmojis = "ManageEmojis",
    ChannelCreateInstantInvite = "CreateInstantInvite",
    ChannelManageChannels = "ManageChannels",
    ChannelManageRoles = "ManageRoles",
    ChannelManageWebhooks = "ManageWebhooks",
    ChannelViewChannel = "ViewChannel",
    ChannelSendMessages = "SendMessages",
    ChannelSendTTSMessages = "SendTTSMessages",
    ChannelManageMessages = "ManageMessages",
    ChannelEmbedLinks = "EmbedLinks",
    ChannelAttachFiles = "AttachFiles",
    ChannelReadMessageHistory = "ReadMessageHistory",
    ChannelMentionEveryone = "MentionEveryone",
    ChannelUseExternalEmojis = "UseExternalEmojis",
    ChannelConnect = "Connect",
    ChannelSpeak = "Speak",
    ChannelMuteMembers = "MuteMembers",
    ChannelDeafenMembers = "DeafenMembers",
    ChannelMoveMembers = "MoveMembers",
    ChannelUseVAD = "UseVAD",
    ChannelPrioritySpeaker = "PrioritySpeaker",
    ChannelStream = "Stream"
}
