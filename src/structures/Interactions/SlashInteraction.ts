import { InteractionOptionValue } from "../../common/types/interactions";
import { Client } from "../../client";
import { InteractionBase } from "./BaseInteraction";
import { Collection } from "../../utils/Collection";

export class SlashInteraction extends InteractionBase {
  /**
   * The name of the slash
   */
  name: string;
  /**
   * The values of the slash.
   */
  values: Collection<string, InteractionOptionValue>;

  constructor(data: any, client: Client) {
    super(data, client);
    this.name = data.data.name;
    this.values = new Collection();

    for (var i of data.data?.options || []) {
      this.values.set(i.name, i);
    }
  }
}
