import {
  GatewayPresenceUpdate,
  GatewayPresenceUpdateDispatchData,
} from "discord-api-types/v10";
import { Event } from "../Event";
import { Member, Shard } from "../../../structures";
import { EventNames, PresenceData } from "../../../common";
import { GatewayActivityPayload, PresencePlatforms, PresenceStatus } from "../../../common/types/Presences";

export default class PresenceUpdate extends Event<GatewayPresenceUpdateDispatchData> {
  handle(data: GatewayPresenceUpdate, shard: Shard) {
    const guild = this.client.guilds.cache.get(data.guild_id);

    if (!guild) return;

    const member = guild.members?.cache.get(data.user.id);

    if (!member || !(member instanceof Member)) return;

    const oldPresence = member.presence;

    member.presence = data;

    guild.members?.cache.set(data.user.id, member);

    this.client.emit(
      EventNames.PresenceUpdate,
      member,
      oldPresence,
      member.presence,
      shard
    );
  }
}
