import { Client } from "../client/Client";
import * as Endpoints from "../rest/Endpoints";
import { PermissionsBitField } from "../types/PermissionsBitFields";
import { getAllStamps, setObj } from "../utils/utils";
import { Base } from "./Base";
import { Guild } from "./Guild";
import { MemberRolesManager } from "./Managers/RolesManager";
import { MemberEditPayload } from "./Payloads/MemberEditPayload";
import { User } from "./User";

class Member extends Base {
  DATE: any;
  private PREMIUM: any;
  private TIMEOUTED: any;
  private d: any;
  joined: any;
  user: any;
  muted: any;
  deafened: any;
  flags: any;
  permissions: any;
  role_ids: any;
  roles: any;
  presence: any;
  nick: any;
  avatar: any;
  premiumSince: any;
  pending: any;
  communicationDisabledUntil: any;
  timeoutUntil: any;
  communicationDisabled: any;
  timeouted: any;

  constructor(data: Record<any, any>, readonly guild: Guild, private client: Client) {
    super(client);
    this.d = data;

    if(typeof guild === "string") {
      this.guild = client.guilds.cache.get(guild) as Guild
    }

    this.guild = guild as Guild

    this.DATE = new Date(data.joined_at);
    this.PREMIUM = new Date(data.premium_since);
    this.TIMEOUTED = new Date(data.communication_disabled_until);

    this.joined = getAllStamps(this);
    this.user = this.author;

    this.muted = data.mute;
    this.deafened = data.deaf;
    this.flags = data.flags;
    this.permissions = data.permissions;
    this.role_ids = data.roles;

    this.roles = new MemberRolesManager(this.guild, this, this.client);
    this.presence = null;

    this._patch(data);
  }

  get author() {
    var x: any;
    if (this.id !== this.client.user.id) {
      if (this.client.users.cache.get(this.id)) {
        x = this.client.users.cache.get(this.id);
      } else {
        var user = this.d.user;
        if (!user) {
          user = this.d.author;
        }
        this.client.users.cache.set(this.id, new User(user, this.client));
        x = this.client.users.cache.get(this.id);
      }
    } else {
      x = this.client.user;
    }
    return x;
  }

  _patch(data: any) {
    if ("nick" in data && data.nick !== null && data.nick !== undefined) {
      this.nick = data.nick;
    }
    if ("avatar" in data && data.avatar !== null && data.avatar !== undefined) {
      this.avatar = data.avatar;
    }
    if (
      "premium_since" in data &&
      data.premium_since !== null &&
      data.premium_since !== undefined
    ) {
      this.premiumSince = getAllStamps(this.PREMIUM);
    }
    if ("pending" in data) {
      this.pending = data.pending;
    }
    if ("permissions" in data && !data.permissions) {
      this.permissions = data.permissions;
    }
    if ("communication_disabled_until" in data) {
      this.communicationDisabledUntil = getAllStamps(this.TIMEOUTED);
      this.timeoutUntil = this.communicationDisabledUntil;
      this.communicationDisabled = data.communication_disabled_until
        ? true
        : false;
      this.timeouted = this.communicationDisabled;
    }

    if (this.id === this.client.user.id) {
      this.edit;
      this.kick;
      this.ban;
      this.leave = async () => {
        const response = await this.client.rest.request(
          "DELETE",
          Endpoints.UserGuild(this.guild.id),
          true
        );
        return response;
      };
    }
  }
  leave() {}
  get kickable() {
    var _p = 0;
    var _h =
      this.roles.cache
        .toJSON()
        .sort((a: any, b: any) => b.position - a.position)?.[0]?.position || 0;
    const c = this.guild.members?.me;
    var _h1 =
      c?.roles.cache
        .toJSON()
        .sort((a: any, b: any) => b.position - a.position)?.[0]?.position || 0;
    for (var perms of c?.roles.cache.toJSON()) {
      _p |= perms.permissions;
    }

    const conditions = {
      kick:
        _p & PermissionsBitField.Roles.KickMembers ||
        _p & PermissionsBitField.Roles.Administrator,
      client: this.id !== this.client.user.id,
      owner: this.id.toString() !== this.guild.owner_id,
      highest: _h <= _h1,
    };

    var expression =
      !!conditions.kick &&
      conditions.client &&
      conditions.owner &&
      conditions.highest;

    return expression;
  }

  get banneable() {
    var _p = 0;
    var _h =
      this.roles.cache
        .toJSON()
        .sort((a: any, b: any) => b.position - a.position)?.[0]?.position || 0;
    const c = this.guild.members?.me;
    var _h1 =
      c?.roles.cache
        .toJSON()
        .sort((a: any, b: any) => b.position - a.position)?.[0]?.position || 0;
    for (var perms of c?.roles.cache.toJSON()) {
      _p |= perms.permissions;
    }

    const conditions = {
      ban:
        _p & PermissionsBitField.Roles.BanMembers ||
        _p & PermissionsBitField.Roles.Administrator,
      client: this.id !== this.client.user.id,
      owner: this.id.toString() !== this.guild.owner_id,
      highest: _h <= _h1,
    };

    var expression =
      !!conditions.ban &&
      conditions.client &&
      conditions.owner &&
      conditions.highest;

    return expression;
  }

  async edit(obj: any) {
    var payload = new MemberEditPayload(obj);

    var reason = payload.payload.reason;

    delete payload.payload.reason;

    var response = await this.client.rest.request(
      "PATCH",
      Endpoints.GuildMember(this.guild.id, this.id),
      true,
      { data: payload.payload },
      reason
    );

    if (response?.error) {
      return false;
    } else {
      return true;
    }
  }

  async changeNickname(nickname: string, reason: string) {
    reason = reason?.trim();
    var response = await this.client.rest.request(
      "PATCH",
      Endpoints.GuildMember(this.guild.id, this.id),
      true,
      { data: { roles: this.roles, flags: this.flags, nick: nickname } },
      reason
    );

    return response;
  }

  async kick(reason: string) {
    reason = reason?.trim();

    var response = await this.client.rest.request(
      "DELETE",
      Endpoints.GuildMember(this.guild.id, this.id),
      true,
      {},
      reason
    );

    return response;
  }

  async ban(obj: any) {
    const banObj = {
      delete_message_seconds: 0,
      reason: null,
    };

    var data = setObj(banObj, obj, {
      delete_message_seconds: "deleteMessageSeconds",
    });

    var response = await this.client.rest.request(
      "PUT",
      Endpoints.GuildBan(this.guild.id, this.id),
      true,
      {},
      data.reason
    );

    return response;
  }

  toString() {
    return `<@${this.id}>`;
  }
}

export { Member };
