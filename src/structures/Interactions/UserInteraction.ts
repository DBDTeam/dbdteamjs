import { Client } from "../../client";
import { InteractionBase } from "./BaseInteraction";

export class UserInteraction extends InteractionBase {
  #data;
  target: unknown;
  constructor(data: any, client: Client) {
    super(data, client);
    this.target = null;
    this.#data = data;
  }
  public async patch() {
    const key =
      this.#data.data?.target_id ||
      Object.keys(this.#data?.data?.resolved)?.[0];
    const member =
      this.guild?.members?.cache.get(key) ||
      (await this.guild?.members?.fetch(key));

    if (member && "user" in member)
      this.target = {
        user: member?.user,
        member,
      };
  }
}
