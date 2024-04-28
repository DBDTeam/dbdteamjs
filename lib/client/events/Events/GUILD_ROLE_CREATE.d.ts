import { GatewayGuildRoleCreateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildRoleCreate extends Event<GatewayGuildRoleCreateDispatchData> {
    handle(data: GatewayGuildRoleCreateDispatchData, shard: Shard): void;
}
