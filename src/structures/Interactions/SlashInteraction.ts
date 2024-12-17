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

    // Procesar opciones y guardar subcommand y subcommand_group si existen
    const processOptions = (options: any[]): void => {
      for (const option of options || []) {
        if (option.type === 2) {
          // SubCommandGroup
          this.subcommand_group = option.name;
          processOptions(option.options || []);
        } else if (option.type === 1) {
          // SubCommand
          this.subcommand = option.name;
          processOptions(option.options || []);
        } else {
          // Opciones finales con valores directos
          this.values.set(option.name, {
            name: option.name,
            type: option.type,
            value: option.value,
          });
        }
      }
    };

    processOptions(data.data?.options || []);
  }
}
