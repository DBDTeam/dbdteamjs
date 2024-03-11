class ClientPresence {
    #client;
    constructor(client) {
        this.#client = client;
        this.status = "online";
        this.activities = [];
        this.since = 0;
        this.mobilePlatform = client?.gateway?.mobilePlatform;
    }

    async update(obj, shardId = 0) {
        const shard = this.#client.shardManager.shards.get(shardId);
        if (!shard) {
            this.#client.emit("error", { status: 0, error: { message: "Shard Not Found while trying to update the presence of the User" } });
            return null;
        }

        const ws = shard.ws;

        !(["online", "invisible", "dnd", "idle"].includes(obj.status)) ? obj.status = "online" : null
        
        Number.isInteger(obj.since) ? null : obj.since = 0
        
        const payload = {
            op: 3,
            d: {
                activities: obj.activities || [],
                status: obj.status,
                afk: obj.status == "idle" ? true : false,
                since: obj.since,
            }
        };

        this.status = obj.status
        this.activities = obj.activities
        this.since = obj.since

        ws.send(JSON.stringify(payload));
    }
}

module.exports = { ClientPresence }