import { GatewayGuildBanAddDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildBanAdd extends Event<GatewayGuildBanAddDispatchData> {
    handle(data: GatewayGuildBanAddDispatchData, shard: Shard): void;
}
