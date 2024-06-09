import { Client } from "../../client";

import { ComponentInteraction } from "./ComponentInteraction";

export class SelectMenuInteraction extends ComponentInteraction {
  #data;
  declare values: string[];
  declare resolved: any[];

  constructor(data: any, client: Client) {
    super(data, client);
    this.#data = data;

    this.patch();
  }

  private async patch() {
    this.values = [...this.#data.data.values];
    const resolvedData = this.#data.data.resolved;
    if (resolvedData) {
      this.resolved = [];
      const resolveTypes = {
        channels: this.guild?.channels,
        roles: this.guild?.roles,
        users: this.guild?.members,
      };
      for (const [type, cache] of Object.entries(resolveTypes)) {
        const resolvedItems = resolvedData[type];
        if (resolvedItems) {
          for (const item of Object.values(resolvedItems)) {
            const _item: any = item;
            if (this.values.includes(_item.id)) {
              let x: any = cache?.cache.get(_item.id);
              if (!x) {
                x = await cache?.fetch(_item.id);
              }
              this.resolved.push(x);
            }
          }
        }
      }
    }
  }
}
