import { GatewayGuildBanAddDispatch } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildBanAdd extends Event<GatewayGuildBanAddDispatch> {
    handle(data: any, shard: Shard): void;
}
