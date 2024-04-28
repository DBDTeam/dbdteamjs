import { GatewayGuildMemberAddDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildMemberAdd extends Event<GatewayGuildMemberAddDispatchData> {
    handle(data: GatewayGuildMemberAddDispatchData, shard: Shard): void;
}
