import {
  GatewayPresenceUpdate,
  GatewayPresenceUpdateDispatchData,
} from "discord-api-types/v10";
import { Event } from "../Event";
import { Member, Shard } from "../../../structures";
import { EventNames, PresenceData } from "../../../common";
import { GatewayActivityPayload, PresencePlatforms, PresenceStatus } from "../../../types/Presences";

export default class PresenceUpdate extends Event<GatewayPresenceUpdateDispatchData> {
  handle(data: GatewayPresenceUpdate, shard: Shard) {
    const guild = this.client.guilds.cache.get(data.guild_id);

    if (!guild) return;

    const member = guild.members?.cache.get(data.user.id);

    if (!member || !(member instanceof Member)) return;

    const oldPresence = member.presence;

    const newPresence = {
      status: data.status,
      activities: data.activities,
      platforms: data.client_status,
    } as PresenceData;

    member.presence = newPresence;

    guild.members?.cache.set(data.user.id, member);

    this.client.emit(
      EventNames.PresenceUpdate,
      member,
      oldPresence,
      newPresence,
      shard
    );
  }
}
