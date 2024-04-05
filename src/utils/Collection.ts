/**
 * Represents a Collection (Extended from map).
 * @extends {Map}
 * @param {number} limit
 */
class Collection<K extends string, V> extends Map<K, V>  {
  public limit: number | null;
  constructor(limit:number = Infinity) {
    super();
    /**
     * Represents the limit of the Collection.
     */
    this.limit = limit;
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
    const copy = new Map(this);
    let jsonObj = [];
    for (let [id, key] of copy) {
      jsonObj.push(key);
    }
    return jsonObj;
  }

  /**
   * Check if the Collection has any value that you are trying to check.
   * @param {object} keys
   * @returns {boolean}
   */

  hasAny(keys:Array<string>) {
    for (let key of keys) {
      if (this.has(key as K)) {
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

  first(x:number = 1) {
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
  last(x:number = 1) {
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

  set(key:any, value:any) {
    if (this.size >= (this.limit || Infinity)) {
      const firstKey = this.keys().next().value;
      this.delete(firstKey);
    }
    super.set(key, value);
    return this;
  }

  find(expression: (value: V, key: K, map: Map<K, V>) => boolean) {
    for (let [key, value] of this.entries()) {
        if (expression(value, key, this)) {
            return value;
        }
    }
    return undefined;
}

filter(expression: (value: V, key: K, map: Map<K, V>) => boolean) {
    const result = new Collection<K, V>();
    for (let [key, value] of this.entries()) {
        if (expression(value, key, this)) {
            result.set(key, value);
        }
    }
    return result;
}
}

export { Collection };