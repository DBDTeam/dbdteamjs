import { Event } from "../Event";
import { Shard } from "../../../structures";
import { GatewayGuildUpdateDispatchData } from "discord-api-types/v10";
export default class GuildCreate extends Event<GatewayGuildUpdateDispatchData> {
    handle(data: any, shard: Shard): void;
}
