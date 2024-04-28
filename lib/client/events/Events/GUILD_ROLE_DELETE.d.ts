import { GatewayGuildRoleDeleteDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildRoleDelete extends Event<GatewayGuildRoleDeleteDispatchData> {
    handle(data: GatewayGuildRoleDeleteDispatchData, shard: Shard): void;
}
