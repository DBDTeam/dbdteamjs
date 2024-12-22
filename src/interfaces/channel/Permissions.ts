import { ResponseFromApi } from "../rest/requestHandler";

export interface ChannelPermissionSuccessResponse extends ResponseFromApi {
    /**
    * The allowed perms of the response. (if any)
    */
   allow?: number,
   /**
    * The disallowed perms of the response. (if any)
    */
   deny?: number
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

// Tipo base que contiene todos los permisos
export type AllPermissionsNames =
  | "CreateInstantInvite"
  | "KickMembers"
  | "BanMembers"
  | "Administrator"
  | "ManageChannels"
  | "ManageGuilds"
  | "AddReactions"
  | "ViewAuditLog"
  | "PrioritySpeaker"
  | "Stream"
  | "ViewChannel"
  | "SendMessages"
  | "SendTTSMessages"
  | "ManageMessages"
  | "EmbedLinks"
  | "AttachFiles"
  | "ReadMessageHistory"
  | "MentionEveryone"
  | "UseExternalEmojis"
  | "ViewGuildInsights"
  | "Connect"
  | "Speak"
  | "MuteMembers"
  | "DeafenMembers"
  | "MoveMembers"
  | "UseVAD"
  | "ChangeNickname"
  | "ManageNicknames"
  | "ManageRoles"
  | "ManageWebhooks"
  | "ManageEmojis";

export type PermissionRoleNames = Omit<AllPermissionsNames, "ManageChannels" | "SendMessages" | "SendTTSMessages" | "ManageMessages" | "EmbedLinks" | "AttachFiles" | "MentionEveryone" | "UseExternalEmojis" | "ViewChannel" | "ReadMessageHistory">;

export type PermissionsChannelName = Omit<AllPermissionsNames, "Administrator" | "ManageGuilds" | "ManageRoles" | "ManageNicknames" | "ManageWebhooks" | "ManageEmojis">;
