import { Client } from "../../client";
import { Nullable } from "../../common";
import { Message } from "../Message";
import { InteractionBase } from "./BaseInteraction";

export class MessageInteraction extends InteractionBase {
  #data;
  message: Nullable<Message>;

  constructor(data: any, client: Client) {
    super(data, client);
    this.#data = data;
    this.patch();
  }

  private patch() {
    this.message = new Message(
      {
        ...(Object.values(this.#data.data.resolved.messages)[0] as object), //@ts-ignore
        guild: this.guild,
      },
      this.client
    );
  }
}
