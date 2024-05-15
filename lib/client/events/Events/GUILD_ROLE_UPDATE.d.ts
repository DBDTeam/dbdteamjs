import { APIGuild, GatewayGuildUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildUpdate extends Event<GatewayGuildUpdateDispatchData> {
    handle(data: APIGuild, shard: Shard): void;
}
