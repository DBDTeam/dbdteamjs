"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMenuInteraction = void 0;
const ComponentInteraction_1 = require("./ComponentInteraction");
class SelectMenuInteraction extends ComponentInteraction_1.ComponentInteraction {
    #data;
    constructor(data, client) {
        super(data, client);
        this.#data = data;
        this.patch();
    }
    async patch() {
        this.values = [...this.#data.data.values];
        const resolvedData = this.#data.data.resolved;
        if (resolvedData) {
            this.resolved = [];
            const resolveTypes = {
                channels: this.guild?.channels,
                roles: this.guild?.roles,
                users: this.guild?.members,
            };
            for (const [type, cache] of Object.entries(resolveTypes)) {
                const resolvedItems = resolvedData[type];
                if (resolvedItems) {
                    for (const item of Object.values(resolvedItems)) {
                        const _item = item;
                        if (this.values.includes(_item.id)) {
                            let x = cache?.cache.get(_item.id);
                            if (!x) {
                                x = await cache?.fetch(_item.id);
                            }
                            this.resolved.push(x);
                        }
                    }
                }
            }
        }
    }
}
exports.SelectMenuInteraction = SelectMenuInteraction;
