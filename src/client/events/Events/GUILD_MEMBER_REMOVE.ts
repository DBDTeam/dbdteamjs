import { GatewayGuildMemberRemoveDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildMemberRemove extends Event<GatewayGuildMemberRemoveDispatchData> {
  handle(data: GatewayGuildMemberRemoveDispatchData, shard: Shard) {
    const guild = this.client.guilds.cache.get(data.guild_id);

    const oldMember = guild?.members?.cache.get(data.user.id);
    if (!oldMember) return;
    guild?.members?.cache.delete(data.user.id);
    //@ts-ignore
    guild?.approximate_members--;
    this.client.emit(EventNames.GuildMemberLeave, oldMember, shard);
  }
}
