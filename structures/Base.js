class Base {
    constructor(id) {
        this.id = BigInt(id);
    }
    
    get getBinary() {
        return BigInt(this.id) >> 22n;
    }

    get getEpoch() {
        return 1420070400000n;
    }
    
    get getTimestamp() {
        return Date.parse(this.getCreatedAt)
    }

    get _getTimestamp() {
        return this.getBinary + this.getEpoch;
    }
    
    get getUnixStamp() {
        return Number(this.getTimestamp) / 1000;
    }

    get getCreatedAt() {
        return new Date(Number(this._getTimestamp));
    }
}

module.exports = { Base }