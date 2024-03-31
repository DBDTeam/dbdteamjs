import { Client } from "../client/Client";

abstract class Base {
  /**
   * The client that instantiated this
   * @name Base#client
   */
  readonly client: Client;
  id!: any;

  /**
   * @param client - The client
   */
  constructor(client: Client) {
    this.client = client;
  }

  _patch(data: unknown) {
    return data;
  }

  get getBinary() {
    return BigInt(this.id) >> 22n;
  }

  get getEpoch() {
    return 1420070400000n;
  }

  // get getTimestamp() {
  //   // ?
  //   // return Date.parse(this.getCreatedAt);
  // }

  // get _getTimestamp() {
  //   return this.getBinary + this.getEpoch;
  // }

  // get getUnixStamp() {
  //   return Number(this.getTimestamp) / 1000;
  // }

  // get getCreatedAt() {
  //   return new Date(Number(this._getTimestamp));
  // }
}

export { Base };
