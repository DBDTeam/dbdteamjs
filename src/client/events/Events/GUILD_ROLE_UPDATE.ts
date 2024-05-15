import { APIGuild, GatewayGuildUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";

export default class GuildUpdate extends Event<GatewayGuildUpdateDispatchData> {
    handle(data: APIGuild, shard: Shard) {
        const oldGuild = this.client.guilds.cache.get(data.id)
        if(!oldGuild) return;
        const newGuild = this.getGuild(data)

        this.client.emit("guildUpdate", oldGuild, newGuild, shard)
    }
}