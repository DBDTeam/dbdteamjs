import { GatewayGuildDeleteDispatch } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildDelete extends Event<GatewayGuildDeleteDispatch> {
    handle(data: any, shard: Shard): void;
}
