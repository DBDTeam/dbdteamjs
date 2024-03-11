class Collection extends Map {
    constructor(limit= null){
        super()
        this.limit = limit || Infinity
    }
    toJSON() {
        const copy = new Map(this)
        let jsonObj = [];
        for (let [id, key] of copy) {
            jsonObj.push(key)
        }
        return jsonObj;
    }

    hasAny(keys) {
        for (let key of keys) {
            if (this.has(key)) {
                return true;
            }
        }
        return false;
    }

    first(x=1) {
        let result = [];
        let count = 0;
        for (let [id, key] of this) {
            result.push(key);
            count++;
            if (count === x) {
                break;
            }
        }
        return result?.[1] ? result : result[0];
    }
    last(x=1) {
        let result = [];
        let count = 0;
        for (let [id, key] of [...this.entries()].reverse()) {
            result.unshift([id, key]);
            count++;
            if (count === x) {
                break;
            }
        }
        return result?.[1] ? result : result[0];
    }

    set(key, value) {
        if (this.size >= this.limit) {
          const firstKey = this.keys().next().value;
          this.delete(firstKey);
        }
        super.set(key, value);
        return this;
    }

    find(expression) {
        var obj = this.toJSON()

        return obj.find(expression)
    }

    filter(expression) {
        var obj = this.toJSON()

        return obj.filter(expression)
    }
}

module.exports = { Collection }