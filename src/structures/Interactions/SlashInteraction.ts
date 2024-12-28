import { InteractionOptionValue } from "../../common/types/interactions";
import { Client } from "../../client";
import { InteractionBase } from "./BaseInteraction";
import { Collection } from "../../utils/Collection";

export class SlashInteraction extends InteractionBase {
  /**
   * The name of the slash command.
   */
  name: string;

  /**
   * The values of the slash command (only final options).
   */
  values: Collection<string, InteractionOptionValue>;

  /**
   * The name of the subcommand group, if present.
   */
  subcommand_group?: string;

  /**
   * The name of the subcommand, if present.
   */
  subcommand?: string;

  constructor(data: any, client: Client) {
    super(data, client);
    this.name = data.data.name;
    this.values = new Collection();

    this.#processOptions(data);
  }

  #processOptions(data: any) {
    for (const option of data.data?.options || []) {
      if (option.type === 2) {
        this.subcommand_group = option.name;
        this.#processOptions(option.options || []);
      } else if (option.type === 1) {
        this.subcommand = option.name;
        this.#processOptions(option.options || []);
      } else {
        this.values.set(option.name, {
          name: option.name,
          type: option.type,
          value: option.value,
        });
      }
    }
  }
}
