"use strict";

/**
 * @typedef {import('../client/Client').Client} Client
 */

/**
 * @abstract
 */
class Base {
  /**
   * The client that instantiated this
   * @name Base#client
   * @type {Client}
   * @readonly
   */
  client;
  /**
   * @param {Client} client - The client
   */
  constructor(client) {
    Object.defineProperty(this, "client", { value: client });
  }

  _patch(data) {
    return data;
  }

  get getBinary() {
    return BigInt(this.id) >> 22n;
  }

  get getEpoch() {
    return 1420070400000n;
  }

  get getTimestamp() {
    // ?
    return Date.parse(this.getCreatedAt);
  }

  get _getTimestamp() {
    return this.getBinary + this.getEpoch;
  }

  get getUnixStamp() {
    return Number(this.getTimestamp) / 1000;
  }

  get getCreatedAt() {
    return new Date(Number(this._getTimestamp));
  }
}

module.exports = { Base };
