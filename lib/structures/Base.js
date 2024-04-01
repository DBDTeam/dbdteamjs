"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
class Base {
    /**
     * The client that instantiated this
     * @name Base#client
     */
    client;
    id;
    /**
     * @param client - The client
     */
    constructor(client) {
        this.client = client;
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
}
exports.Base = Base;
