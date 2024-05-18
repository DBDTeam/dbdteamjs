import {
  GatewayGuildRoleModifyDispatchData,
  GatewayGuildRoleUpdateDispatchData,
} from "discord-api-types/v10";
import { Event } from "../Event";
import { GuildRole, Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildRoleUpdate extends Event<GatewayGuildRoleUpdateDispatchData> {
  handle(data: GatewayGuildRoleModifyDispatchData, shard: Shard) {
    const guild = this.client.guilds.cache.get(data.guild_id);

    if (!guild) return;

    const oldRole = guild.roles?.cache.get(data.role.id);
    const newRole = new GuildRole(data.role, guild, this.client);
    guild.roles?.cache.set(data.role.id, newRole);

    this.client.emit(
      EventNames.GuildRoleUpdate,
      newRole,
      oldRole as GuildRole,
      shard
    );
  }
}
