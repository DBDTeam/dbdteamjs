const RequestHandler = require("./requestHandler");
const { CDN } = require("./CDN");

/**
 * @typedef {import('../client/Client').Client} Client
 */

class REST extends RequestHandler {
  /**
   *  Create a new instance of the rest client.
   *
   * @param {Client} client
   */
  constructor(client) {
    super(client);
    /**
     * The CDN handler for this client's requests
     *
     * @type {CDN}
     */
    this.cdn = new CDN();
  }
}

module.exports = { REST };
