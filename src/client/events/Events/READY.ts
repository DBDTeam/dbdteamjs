import { GatewayReadyDispatchData } from "discord-api-types/v10";

import { Guild } from "../../../structures/Guild";
import { Shard } from "../../../structures/Sharding";
import { getAllStamps } from "../../../utils/utils";
import { ClientApplication } from "../../ClientApplication";
import { ClientUser } from "../../ClientUser";
import { Event } from "../Event";
import { EventNames } from "../../../common";

export default class Ready extends Event<GatewayReadyDispatchData> {
  async handle(data: GatewayReadyDispatchData, shard: Shard) {
    this.client.user = new ClientUser(data.user, this.client);
    this.client.application = new ClientApplication(this.client);

    this.client.ready = getAllStamps(new Date());
    this.client.emit(EventNames.Debug, `Client logged successfully`, shard);
    this.client.emit(EventNames.Ready, this.client.user, shard);
  }
}
