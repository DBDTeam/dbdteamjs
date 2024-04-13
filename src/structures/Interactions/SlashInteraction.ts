import { Collection } from "../..";
import { Client } from "../../client";
import { InteractionBase } from "./BaseInteraction";

export class SlashInteraction extends InteractionBase {
  name: any;
  options: Collection<unknown, unknown>;

  constructor(data: any, client: Client) {
    super(data, client);
    this.name = data.data.name;
    this.options = new Collection();

    for (var i of data.data?.options || []) {
      this.options.set(i.name, i);
    }
  }
}
