import { User } from "../User";
import { PermissionsBitField } from "../../types/PermissionsBitFields";
import * as Endpoints from "../../rest/Endpoints";
import { Member } from "../Member";
import { type Client } from "../../client/Client";
import { ErrorResponseFromApi, ResponseFromApi } from "../../interfaces/rest/requestHandler";
import { ThreadMember } from "../ThreadMember";
import { Nullable } from "../../common";

interface ChannelPermissionSuccessResponse extends ResponseFromApi {
   /**
   * The allowed perms of the response. (if any)
   */
  allow?: number,
  /**
   * The disallowed perms of the response. (if any)
   */
  deny?: number
}

interface targetObj {
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

interface ObjectOfThePerms {
  /**
   * The array of permissions bitwise to allow in the current channel.
   */
  allow?: number[];
  /**
   * The array of permissions bitwise to disable in the current channel.
   */
  deny?: number[];
}

export class ChannelPermissionManager {
  #Perms: Record<string, any>;
  #client: Client;
  private target: any;
  public overwrites: Record<string, any>;
  constructor(overwrites: any, target: string, client: Client) {
    this.#client = client;
    this.target = target;
    this.#Perms = PermissionsBitField.Channels;
    this.overwrites = overwrites;
  }

  #resolve(permsObj: ObjectOfThePerms) {
    var addedPerms = 0, addedPermsArr = [];
    var removedPerms = 0, removedPermsArr = [];
      for (const allowPerm of (permsObj?.allow || [])) {
        if (
          this.#Perms.hasOwnProperty(allowPerm) &&
          !permsObj?.deny?.includes(allowPerm)
        ) {
          addedPerms |= this.#Perms[allowPerm];
          addedPermsArr.push(this.#Perms[allowPerm]);
        }
      }
    
      for (const denyPerm of (permsObj.deny || [])) {
        if (
          this.#Perms.hasOwnProperty(denyPerm) &&
          !permsObj?.allow?.includes(denyPerm)
        ) {
          removedPerms |= this.#Perms[denyPerm];
          removedPermsArr.push(this.#Perms[denyPerm]);
        }
      }

      return { removedPerms, addedPerms, removedPermsArr, addedPermsArr }
    }

  /**
   * 
   * @param targetObj 
   * @param permsObj 
   * @param reason 
   * @returns 
   */
  async edit(
    targetObj: targetObj | "everyone",
    permsObj: ObjectOfThePerms,
    reason: Nullable<string> = null
  ): Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null> {
    let addedPerms = 0;
    let removedPerms = 0;

    const obj = getType(
      targetObj == "everyone" ? this.target.guildId : targetObj,
      this.target
    );

    if(!permsObj) return null;

    const result = this.#resolve(permsObj)
    const data = {
      allow: result?.addedPerms,
      deny: result?.removedPerms,
      id: obj.targetId,
      type: obj.type,
    };

    var response = await this.#client.rest.request(
      "PUT",
      Endpoints.ChannelPermissions(obj.id, obj.targetId),
      true,
      { data },
      reason
    );

    if(response?.error) {
      return response as ErrorResponseFromApi;
    } else {
      return { ...response as ResponseFromApi, allow: addedPerms, deny: removedPerms };
    }
  }

  async add(
    targetObj: targetObj | "everyone",
    permsObj: ObjectOfThePerms,
    reason: Nullable<string> = null
  ) {
    const obj = getType(
      targetObj == "everyone" ? this.target.guildId : targetObj,
      this.target
    ) as targetObj;

    const result = this.#resolve(permsObj)

    const response = await this.edit(obj, { allow: result?.addedPermsArr }, reason);

    return { ...response, allow: result?.addedPerms };
  }

  async remove(
    targetObj: Record<string, any> | "everyone",
    permsObj: Record<string, any>,
    reason: string | null | undefined = null
  ) {
    const obj = getType(
      targetObj == "everyone" ? this.target.guildId : targetObj,
      this.target
    ) as targetObj;

    const result = this.#resolve(permsObj)

    const response = await this.edit(obj, { deny: result?.removedPermsArr }, reason);

    return { ...response, deny: result?.removedPerms };
  }
}

function getType(obj: any, channel: any) {
  var isUser = obj instanceof User || obj instanceof Member || obj instanceof ThreadMember;

  return isUser
    ? {
        type: 1,
        id: channel.id,
        targetId: obj.id || obj.user.id,
      }
    : {
        type: 0,
        id: channel.id,
        targetId: obj.id,
      };
}