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
  
      // Recorremos los tipos presentes en resolvedData
      for (const [type, resolvedItems] of Object.entries(resolvedData)) { //@ts-ignore
        const cache: GuildChannelManager | GuildMemberManager | GuildRolesManager = resolveTypes[type]; // Seleccionamos la caché correspondiente al tipo
        if (!cache) continue; // Si no hay caché para este tipo, saltamos
  
        // @ts-ignore Recorremos los elementos dentro del tipo 
        for (const [id, item] of Object.entries(resolvedItems)) {

          let entity = cache.cache.get(id); // Intentamos obtenerlo de la caché

          if (!entity) {
            // @ts-ignore Si no está en la caché, intentamos fetchearlo
            entity = await cache.fetch(id);
          }
          
          //@ts-ignore
          this.resolved.set(id, entity);
        }
      }
    }
  }  
}
