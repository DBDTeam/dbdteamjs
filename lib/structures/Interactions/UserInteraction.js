"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInteraction = void 0;
const BaseInteraction_1 = require("./BaseInteraction");
class UserInteraction extends BaseInteraction_1.InteractionBase {
    #data;
    /**
     * The current target.
     */
    target;
    constructor(data, client) {
        super(data, client);
        this.target = null;
        this.#data = data;
    }
    async patch() {
        const key = this.#data.data?.target_id ||
            Object.keys(this.#data?.data?.resolved)?.[0];
        const member = this.guild?.members?.cache.get(key) ||
            (await this.guild?.members?.fetch(key));
        if (member && "user" in member)
            this.target = {
                user: member?.user,
                member,
            };
    }
}
exports.UserInteraction = UserInteraction;
