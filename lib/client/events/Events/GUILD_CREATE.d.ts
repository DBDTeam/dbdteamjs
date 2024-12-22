import { GatewayGuildCreateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildCreate extends Event<GatewayGuildCreateDispatchData> {
    handle(data: GatewayGuildCreateDispatchData, shard: Shard): Promise<void>;
}
