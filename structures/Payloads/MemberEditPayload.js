const { setObj } = require("../../Utils/utils");

class MemberEditPayload {
    #Data = {
        nick: null,
        roles: null,
        mute: null,
        deaf: null,
        channel_id: null,
        communication_disabled_until: null,
        flags: null,
        reason: null
    };
    #d;
    constructor(data = {}) {
        this.#d = typeof data == "string" ? data : setObj(this.#Data, data, {
            communication_disabled_until: "timeout",
            channel_id: ["voiceId", "channelId"],
            nick: "nickname",
            deaf: "deafeaned",
            mute: "muted",
        }, false)
        if(typeof this.#d == "string"){ var i = this.#d; this.#d = {}; this.#d.nick = i };
        try {
            delete this.#d.voiceId;
            delete this.#d.timeout;
            delete this.#d.channelId;
            delete this.#d.nickname;
            delete this.#d.deafeaned;
            delete this.#d.muted;
        } catch(err) {}
    }

    get payload() {
        return this.#d
    }
}

module.exports = { MemberEditPayload }