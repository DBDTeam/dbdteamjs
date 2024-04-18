import { GatewayIntegrationCreateDispatchData } from "discord-api-types/v10";
import { Shard } from "../../../structures";
import { Event } from "../Event";
export default class InteractionCreate extends Event<GatewayIntegrationCreateDispatchData> {
    handle(data: GatewayIntegrationCreateDispatchData, shard: Shard): Promise<void>;
}
