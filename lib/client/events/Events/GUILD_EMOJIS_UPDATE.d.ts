import { GatewayGuildEmojisUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildEmojis extends Event<GatewayGuildEmojisUpdateDispatchData> {
    handle(data: GatewayGuildEmojisUpdateDispatchData, shard: Shard): void;
}
