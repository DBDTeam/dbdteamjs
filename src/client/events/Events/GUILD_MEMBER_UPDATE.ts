import { GatewayGuildMemberUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Member, Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildMemberUpdate extends Event<GatewayGuildMemberUpdateDispatchData> {
  handle(data: GatewayGuildMemberUpdateDispatchData, shard: Shard) {
    const guild = this.client.guilds.cache.get(data.guild_id);

    const oldMember = guild?.members?.cache.get(data.user.id) as Member;
    const newMember = this.getMember(data, guild?.id);

    this.client.users.cache.set(newMember.id, newMember.user)

    this.client.emit(EventNames.GuildMemberUpdate, oldMember, newMember, shard);
  }
}
