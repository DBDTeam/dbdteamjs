import {
  GatewayThreadListSync,
  GatewayThreadListSyncDispatchData,
} from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard, ThreadChannel } from "../../../structures";
import { ThreadMember } from "../../../structures/ThreadMember";
import { Collection } from "../../../utils/Collection";
import { EventNames } from "../../../common";

export default class ThreadListSync extends Event<GatewayThreadListSyncDispatchData> {
  handle(data: GatewayThreadListSync, shard: Shard) {
    let guild = this.client.guilds.cache.get(data.guild_id);
    var channels = new Collection<string, ThreadChannel>()
    var members = new Collection<string, ThreadMember>()

    if (!guild) return;

    for (let thread of data.threads) {
      let threadChannel = new ThreadChannel(thread, this.client);
      this.client.channels.cache.set(threadChannel.id, threadChannel);
      guild.channels.cache.set(threadChannel.id, threadChannel);
      channels.set(threadChannel.id, threadChannel)
    }

    for(let member of data.members) {
        let threadMember = new ThreadMember(member, guild, this.client)

        if(!threadMember.thread) continue;

        threadMember.thread.members.cache.set(threadMember.id, threadMember)
        members.set(threadMember.id, threadMember)
    }

    this.client.emit(EventNames.ThreadListSync, guild, channels, members, shard)
  }
}
