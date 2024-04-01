import { setObj } from "../../utils/utils";

/**
 * At least one of the options must be placed and not undefined.
 * @typedef {object} MemberEditPayloadData
 * @property {string} [nick] - The new nickname of the Member
 * @property {Array} [roles] - The ids of the roles that are going to be put in the member (remember that if you want to remove a role from the member, you must remove it from the array and leave the other roles of the member, otherwise the member will lose all of them)
 * @property {boolean} [mute] - Mutes the member of a voice channel. (This field has an alias, that is 'muted')
 * @property {boolean} [deaf] - Defeans the member of a voice channel. (This field has an alias, that is 'defeaned')
 * @property {string} [channel_id] - Moves the member to another voice channel. (This field has an alias, that is 'voiceId')
 * @property {number} [communication_disabled_until] - The time in which the member will be timeouted. (This field has an alias, that is 'timeout')
 * @property {number} [flags] - The new flags of the Member. (Only the flag 'BYPASSES_VERIFICATION (1 << 2)' can be edited)
 * @property {string} [reason=null]  - The reason of the edit.
 */

class MemberEditPayload {
  #Data = {
    nick: null,
    roles: null,
    mute: null,
    deaf: null,
    channel_id: null,
    communication_disabled_until: null,
    flags: null,
    reason: null,
  };

  #d;

  /**
   * Creates a member edit payload to edit messages.
   * @param {MemberEditPayloadData} data
   */
  constructor(data = {}) {
    this.#d =
      typeof data == "string"
        ? data
        : setObj(
            this.#Data,
            data,
            {
              communication_disabled_until: "timeout",
              channel_id: ["voiceId", "channelId"],
              nick: "nickname",
              deaf: "deafeaned",
              mute: "muted",
            },
            false
          );
    if (typeof this.#d == "string") {
      var i = this.#d;
      this.#d = {};
      this.#d.nick = i;
    }
    try {
      delete this.#d.voiceId;
      delete this.#d.timeout;
      delete this.#d.channelId;
      delete this.#d.nickname;
      delete this.#d.deafeaned;
      delete this.#d.muted;
    } catch (err) {}
  }

  get payload() {
    return this.#d;
  }
}

module.exports = { MemberEditPayload };
