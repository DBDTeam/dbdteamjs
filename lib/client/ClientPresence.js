"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPresence = void 0;
const v10_1 = require("discord-api-types/v10");
/**
 * Represents the client presence (WS presence)
 */
class ClientPresence {
    client;
    status;
    activities;
    since;
    mobilePlatform;
    constructor(client) {
        this.client = client;
        this.client = client;
        /**
         * The status of the bot
         */
        this.status = "online";
        /**
         * An array of activities of the bot
         */
        this.activities = [];
        /**
         * Since when the bot will put the activity
         */
        this.since = 0;
        /**
         * If the bot has the icon of mobile device.
         */
        this.mobilePlatform = client?.gateway?.mobilePlatform;
    }
    /**
     *
     * @param obj - The object that will be used for update the presence of the client
     * @param shardId - The shardID
     * @returns {Promise<boolean>}
     * @async
     */
    async update(obj, shardId = 0) {
        const shard = this.client.shardManager.shards.get(shardId);
        if (!shard) {
            this.client.emit("error", {
                status: 0,
                error: {
                    message: "Shard Not Found while trying to update the presence of the User",
                },
            });
            return null;
        }
        const ws = shard.ws;
        !["online", "invisible", "dnd", "idle"].includes(obj.status)
            ? (obj.status = v10_1.PresenceUpdateStatus.Online)
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
        }
        catch (err) {
            return false;
        }
        return true;
    }
}
exports.ClientPresence = ClientPresence;
