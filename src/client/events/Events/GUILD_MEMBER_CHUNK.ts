import { GatewayGuildMembersChunkDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Member, Shard } from "../../../structures";
import { Collection } from "../../../utils/Collection";
import { EventNames } from "../../../common";

export default class GuildMemberChunk extends Event<GatewayGuildMembersChunkDispatchData> {
  handle(data: GatewayGuildMembersChunkDispatchData, shard: Shard) {
    const guild = this.client.guilds.cache.get(data.guild_id);
    if (!guild) return;
    const members = data.members;
    var membersArray = new Collection<any, Member>();
    const chunk = { count: data.chunk_count, index: data.chunk_index };

    for (var member of members) {
      if (!member.user) continue;
      const newMember = this.getMember(
        { ...member, id: member.user.id },
        guild
      );
      membersArray.set(newMember.id, newMember);
    }

    this.client.emit(
      EventNames.GuildMemberChunk,
      guild,
      membersArray.toJSON(),
      chunk,
      shard
    );
  }
}
