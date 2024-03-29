class ClientPresence {
  #client;
  /**
   * Represents the client presence (WS presence)
   * @param {import("./Client").Client} client
   */
  constructor(client) {
    this.#client = client;
    /**
     * The status of the bot
     * @type {string}
     */
    this.status = "online";
    /**
     * An array of activities of the bot
     * @type {object}
     */
    this.activities = [];
    /**
     * Since when the bot will put the activity
     * @type {number}
     */
    this.since = 0;
    /**
     * If the bot has the icon of mobile device.
     * @type {boolean}
     */
    this.mobilePlatform = client?.gateway?.mobilePlatform;
  }

  /**
   *
   * @param {object} obj - The object that will be used for update the presence of the client
   * @param {number} shardId [shardId=0] - The shardID
   * @returns {Promise<boolean>}
   * @async
   */
  async update(obj, shardId = 0) {
    const shard = this.#client.shardManager.shards.get(shardId);
    if (!shard) {
      this.#client.emit("error", {
        status: 0,
        error: {
          message:
            "Shard Not Found while trying to update the presence of the User",
        },
      });
      return null;
    }

    const ws = shard.ws;

    !["online", "invisible", "dnd", "idle"].includes(obj.status)
      ? (obj.status = "online")
      : null;

    Number.isInteger(obj.since) ? null : (obj.since = 0);

    const payload = {
      op: 3,
      d: {
        activities: obj.activities || [],
        status: obj.status,
        afk: obj.status == "idle" ? true : false,
        since: obj.since,
      },
    };

    this.status = obj.status;
    this.activities = obj.activities;
    this.since = obj.since;

    try {
      var i = await ws.send(JSON.stringify(payload));
    } catch (err) {
      return false;
    }

    return true;
  }
}

module.exports = { ClientPresence };
