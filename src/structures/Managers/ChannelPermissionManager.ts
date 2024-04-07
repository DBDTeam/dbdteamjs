import { User } from "../User";
import { PermissionsBitField } from "../../types/PermissionsBitFields";
import * as Endpoints from "../../rest/Endpoints";
import { Member } from "../Member";
import { type Client } from "../../client/Client";

export class ChannelPermissionManager {
  readonly Perms: Record<string, any>;
  private client: Client;
  private target: any;
  public overwrites: Record<string, any>;
  constructor(overwrites: any, target: string, client: Client) {
    this.client = client;
    this.target = target;
    this.Perms = PermissionsBitField.Channels;
    this.overwrites = overwrites;
  }

  async edit(
    userObj: Record<string, any> | "everyone",
    permsObj: Record<string, any>,
    reason: string | null | undefined = null
  ) {
    let addedPerms = 0;
    let removedPerms = 0;

    const obj = getType(
      userObj == "everyone" ? this.target.guildId : userObj,
      this.target
    );

    for (const allowPerm of permsObj.allow) {
      if (
        this.Perms.hasOwnProperty(allowPerm) &&
        !permsObj.deny.includes(allowPerm)
      ) {
        addedPerms |= this.Perms[allowPerm];
      }
    }

    for (const denyPerm of permsObj.deny) {
      if (
        this.Perms.hasOwnProperty(denyPerm) &&
        !permsObj.allow.includes(denyPerm)
      ) {
        removedPerms |= this.Perms[denyPerm];
      }
    }
    const data = {
      allow: addedPerms,
      deny: removedPerms,
      id: obj.targetId,
      type: obj.type,
    };

    var response = await this.client.rest.request(
      "PUT",
      Endpoints.ChannelPermissions(obj.id, obj.targetId),
      true,
      { data },
      reason
    );

    return { ...response, allow: addedPerms, deny: removedPerms };
  }

  async add(
    userObj: Record<string, any> | "everyone",
    permsObj: Record<string, any>,
    reason: string | null | undefined = null
  ) {
    let addedPerms = 0;

    const obj = getType(
      userObj == "everyone" ? this.target.guildId : userObj,
      this.target
    );

    for (const allowPerm of permsObj.allow) {
      if (
        this.Perms.hasOwnProperty(allowPerm) &&
        !permsObj.deny.includes(allowPerm)
      ) {
        addedPerms |= this.Perms[allowPerm];
      }
    }

    const response = await this.edit(obj, { allow: addedPerms }, reason);

    return { ...response, allow: addedPerms };
  }

  async remove(
    userObj: Record<string, any> | "everyone",
    permsObj: Record<string, any>,
    reason: string | null | undefined = null
  ) {
    let removedPerms = 0;

    const obj = getType(
      userObj == "everyone" ? this.target.guildId : userObj,
      this.target
    );

    for (const denyPerm of permsObj.deny) {
      if (
        this.Perms.hasOwnProperty(denyPerm) &&
        !permsObj.allow.includes(denyPerm)
      ) {
        removedPerms |= this.Perms[denyPerm];
      }
    }

    const response = await this.edit(obj, { deny: removedPerms }, reason);

    return { ...response, deny: removedPerms };
  }
}

function getType(obj: any, channel: any) {
  var isUser = obj instanceof User || obj instanceof Member;

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
