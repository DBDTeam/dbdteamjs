import { GatewayGuildBanRemoveDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { Event } from "../Event";
export default class GuildBanRemove extends Event<GatewayGuildBanRemoveDispatchData> {
    handle(data: GatewayGuildBanRemoveDispatchData, shard: Shard): void;
}
