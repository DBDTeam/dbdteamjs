class Collection extends Map {
    /**
     * Represents a Collection (Extended from map).
     * @param {number} limit 
     */
    constructor(limit= null){
        super()
        /**
         * Represents the limit of the Collection.
         */
        this.limit = limit || Infinity
    }
    /**
     * Returns a the Collection values in a object
     * @returns {Array<*>}
     * @example
     * const myFirstCollection = new Collection()
     * 
     * myFirstCollection.set("hi", "hello")
     * myFirstCollection.set("hallo", "hi")
     * console.log(myFirstCollection.toJSON()) // ["hello", "hi"]
     */
    toJSON() {
        const copy = new Map(this)
        let jsonObj = [];
        for (let [id, key] of copy) {
            jsonObj.push(key)
        }
        return jsonObj;
    }

    /**
     * Check if the Collection has any value that you are trying to check.
     * @param {object} keys 
     * @returns {boolean}
     */

    hasAny(keys) {
        for (let key of keys) {
            if (this.has(key)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns the first value. (or firsts values)
     * @param {number} [x = 1] - The number of amount values you want to get. 
     * @returns {Array}
     */

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