import { Client } from "../../client";
import { SelectMenuResolvedValues } from "../../common";
import { Collection } from "../../utils/Collection";
import { GuildChannelManager, GuildMemberManager, GuildRolesManager } from "../Managers";
import { ComponentInteraction } from "./ComponentInteraction";

export class SelectMenuInteraction extends ComponentInteraction {
  #data;
  /**
   * The values of the select menu option
   * @type { string[] }
   */
  declare values: string[];
  /**
   * The values of the resolved menu options.
   * @type { Collection<string, SelectMenuResolvedValues> }
   */
  declare resolved: Collection<string, SelectMenuResolvedValues>;

  constructor(data: any, client: Client) {
    super(data, client);
    this.#data = data;
  }

  async _____patch() {
    this.values = this.#data.data.values

    const resolvedData = this.#data.data.resolved;
  
    if (resolvedData) {
      this.resolved = new Collection();
  
      const resolveTypes = {
        channels: this.guild?.channels,
        roles: this.guild?.roles,
        users: this.guild?.members,
      };
  
      for (const [type, resolvedItems] of Object.entries(resolvedData)) {
        const cache: GuildChannelManager | GuildMemberManager | GuildRolesManager = resolveTypes[type as "channels" | "roles" | "users"];
        if (!cache) continue;
  
        for (const [id, item] of Object.entries(resolvedItems as Record<string, any>)) {

          let entity: any = cache.cache.get(id);

          if (!entity) {
            entity = await cache.fetch(id);
          }
          
          this.resolved.set(id, entity);
        }
      }
    }
  }  
}
