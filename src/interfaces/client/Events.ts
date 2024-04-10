import { InteractionBase } from "../../structures/Interactions/BaseInteraction";
import { Message } from "../../structures/Message";

export enum EventNames {
  "MessageCreate" = "messageCreate",
  "InteractionCreate" = "interactionCreate",
}

export interface ClientEvents {
  debug: (...args: unknown[]) => unknown;
  messageCreate: (message: Message) => unknown;
  interactionCreate: (interaction: InteractionBase) => unknown;
  ready: () => unknown;
}
