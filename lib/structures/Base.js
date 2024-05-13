"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
class Base {
    id;
    /* The base data. */
    data;
    /**
     * @param string - The snowflake
     */
    constructor(id) {
        this.id = typeof id === "string" ? id : id?.id || id?.user?.id;
    }
    _patch(data) {
        return data;
    }
    get getBinary() {
        return BigInt(this.id || 0) >> 22n;
    }
    get getEpoch() {
        return 1420070400000n;
    }
}
exports.Base = Base;
