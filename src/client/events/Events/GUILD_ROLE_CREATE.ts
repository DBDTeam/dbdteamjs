import { GatewayGuildRoleCreateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildRoleCreate extends Event<GatewayGuildRoleCreateDispatchData> {
  async handle(data: GatewayGuildRoleCreateDispatchData, shard: Shard) {
    const guild = this.client.guilds.cache.get(data.guild_id);

    const role = await this.getRole(data, guild?.id);

    if (!role) return;

    this.client.emit(EventNames.GuildRoleCreate, role, shard);
  }
}
