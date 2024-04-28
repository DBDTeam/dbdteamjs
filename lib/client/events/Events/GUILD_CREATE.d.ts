import { GatewayGuildCreateDispatch } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildCreate extends Event<GatewayGuildCreateDispatch> {
    handle(data: any, shard: Shard): void;
}
