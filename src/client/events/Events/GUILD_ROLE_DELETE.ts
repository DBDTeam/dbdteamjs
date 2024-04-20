import { GatewayGuildRoleDeleteDispatchData } from "discord-api-types/v10"
import { Event } from "../Event"
import { Shard } from "../../../structures"
import { EventNames } from "../../../common"

export default class GuildRoleDelete extends Event<GatewayGuildRoleDeleteDispatchData> {
    handle(data: GatewayGuildRoleDeleteDispatchData, shard: Shard) {
        const guild = this.client.guilds.cache.get(data.guild_id)
        const oldRole = guild?.roles?.cache.get(data.role_id)
        if(!oldRole) return;
        guild?.roles?.cache.delete(data.role_id)

        this.client.emit(EventNames.GuildRoleDelete, oldRole, shard)
    }
}