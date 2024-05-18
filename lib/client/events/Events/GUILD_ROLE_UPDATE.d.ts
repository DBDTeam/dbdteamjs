import { GatewayGuildRoleModifyDispatchData, GatewayGuildRoleUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildRoleUpdate extends Event<GatewayGuildRoleUpdateDispatchData> {
    handle(data: GatewayGuildRoleModifyDispatchData, shard: Shard): void;
}
