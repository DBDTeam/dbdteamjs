import {
  ChannelPermissionSuccessResponse,
  ObjectOfThePerms,
  TargetPayload,
} from "../../interfaces/channel/Permissions";
import {
  PermissionsBits,
  PermissionsType,
} from "../../interfaces/channel/Permissions";
import { Client } from "../../client/Client";
import { Nullable } from "../../common";
import { ResponseFromApi } from "../../interfaces/rest/requestHandler";
import * as Endpoints from "../../rest/Endpoints";
import { PermissionManager } from "./PermissionManager";
import { ClientError } from "../../client/errors/ClientError";
import { ErrorNames } from "../../client/errors/ErrorList";

export class ChannelPermissionManager {
  #permissionsBits = PermissionsBits;
  #client: Client;
  private readonly channelId: string;

  /**
   * Constructs a new ChannelPermissionManager instance.
   * @param {string} channelId - The ID of the target channel.
   * @param {Client} #client - The #client instance to interact with the API.
   */
  constructor(channelId: string, client: Client) {
    this.channelId = channelId;
    this.#client = client;
  }

  get channel() {
    return this.#client.channels.cache.get(this.channelId);
  }

  /**
   * Resolves the permissions into bitwise values.
   * @param {ObjectOfThePerms} permsObj - The permissions to resolve.
   * @returns {Object} - Resolved added and removed permissions.
   */
  private resolvePermissions(permsObj: ObjectOfThePerms) {
    let allow = BigInt(0);
    let deny = BigInt(0);

    if (permsObj.allow) {
      const allowArray = Array.isArray(permsObj.allow)
        ? permsObj.allow
        : [permsObj.allow];
      for (const perm of allowArray) {
        if (!PermissionManager.isValidPermission(perm))
          throw new ClientError(ErrorNames.InvalidPermission, perm);
        allow |= this.#permissionsBits[perm];
      }
    }

    if (permsObj.deny) {
      const denyArray = Array.isArray(permsObj.deny)
        ? permsObj.deny
        : [permsObj.deny];
      for (const perm of denyArray) {
        if (!PermissionManager.isValidPermission(perm))
          throw new ClientError(ErrorNames.InvalidPermission, perm);
        deny |= this.#permissionsBits[perm];
      }
    }

    return { allow: allow.toString(), deny: deny.toString() };
  }

  /**
   * Edits permissions for a specific target.
   * @param {TargetPayload} target - The target payload.
   * @param {ObjectOfThePerms} perms - The permissions to apply.
   * @param {Nullable<string>} reason - The reason for the modification.
   * @returns {Promise<ChannelPermissionSuccessResponse | ResponseFromApi>} - API response.
   */
  async edit(
    target: TargetPayload | "everyone",
    perms: ObjectOfThePerms,
    reason: Nullable<string> = null
  ): Promise<ChannelPermissionSuccessResponse | ResponseFromApi> {
    const preparedTarget = this.prepareTarget(target);
    const resolvedPerms = this.resolvePermissions(perms);

    const data = {
      id: this.channel?.id,
      targetId: preparedTarget.targetId,
      type: preparedTarget.type,
      allow: resolvedPerms.allow || [],
      deny: resolvedPerms.deny || [],
    };

    const response = await this.#client.rest.request(
      "PUT",
      Endpoints.ChannelPermissions(this.channelId, data.targetId),
      true,
      { data },
      reason
    );

    return response as ChannelPermissionSuccessResponse;
  }

  /**
   * Adds permissions for a specific target.
   * @param {TargetPayload} target - The target payload.
   * @param {PermissionsType[]} permissions - The permissions to add.
   * @param {Nullable<string>} reason - The reason for adding permissions.
   * @returns {Promise<ChannelPermissionSuccessResponse | ResponseFromApi>} - API response.
   */
  async add(
    target: TargetPayload,
    permissions: PermissionsType[] | PermissionsType,
    reason: Nullable<string> = null
  ): Promise<ChannelPermissionSuccessResponse | ResponseFromApi> {
    const perms: ObjectOfThePerms = { allow: permissions };
    return this.edit(target, perms, reason);
  }

  /**
   * Removes permissions for a specific target.
   * @param {TargetPayload} target - The target payload.
   * @param {PermissionsType[]} permissions - The permissions to remove.
   * @param {Nullable<string>} reason - The reason for removing permissions.
   * @returns {Promise<ChannelPermissionSuccessResponse | ResponseFromApi>} - API response.
   */
  async remove(
    target: TargetPayload,
    permissions: PermissionsType[] | PermissionsType,
    reason: Nullable<string> = null
  ): Promise<ChannelPermissionSuccessResponse | ResponseFromApi> {
    const perms: ObjectOfThePerms = { deny: permissions };
    return this.edit(target, perms, reason);
  }

  private determineTargetType(target: any): "0" | "1" {
    const isUser =
      target?.constructor?.type === "User" ||
      target?.constructor?.type === "Member" ||
      target?.constructor?.type === "ThreadMember";

    return isUser ? "1" : "0";
  }

  private prepareTarget(
    target: TargetPayload | "everyone"
  ): Required<{ targetId: string, type: "0" | "1"}> {
    let targetId: string;
    let targetType: "0" | "1";

    if (target === "everyone") {
      targetId = this.channel?.guildId as string;
      targetType = "0";
    } else {
      targetId = target.target?.id;
      targetType = target.type ?? this.determineTargetType(target.target);
    }

    return {
      targetId,
      type: targetType,
    };
  }
}
