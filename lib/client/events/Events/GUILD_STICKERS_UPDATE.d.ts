import { GatewayGuildStickersUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildStickersUpdate extends Event<GatewayGuildStickersUpdateDispatchData> {
    handle(data: GatewayGuildStickersUpdateDispatchData, shard: Shard): void;
}
