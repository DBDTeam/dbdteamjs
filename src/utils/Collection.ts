/**
 * Represents a Collection (Extended from Map).
 * @extends {Map}
 * @template K, V
 */
class Collection<K, V> extends Map<K, V> {
  /**
   * The limit of the Collection.
   * @type {number | null}
   */
  public limit: number | null;

  /**
   * Creates an instance of Collection.
   * @param {number} [limit=Infinity] - The limit of the Collection.
   */
  constructor(limit: number = Infinity) {
    super();
    this.limit = limit;
  }

  /**
   * Returns the Collection values as an array.
   * @returns {V[]} The values of the Collection.
   * @example
   * const myFirstCollection = new Collection();
   *
   * myFirstCollection.set("hi", "hello");
   * myFirstCollection.set("hallo", "hi");
   * console.log(myFirstCollection.toJSON()); // ["hello", "hi"]
   */
  toJSON(): V[] {
    const copy = new Map(this);
    const jsonObj: V[] = [];
    for (const [key, value] of copy) {
      jsonObj.push(value);
    }
    return jsonObj;
  }

  /**
   * Checks if the Collection has any of the specified keys.
   * @param {Array<K>} keys - The keys to check.
   * @returns {boolean} True if the Collection has any of the keys, otherwise false.
   */
  hasAny(keys: K[]): boolean {
    for (const key of keys) {
      if (this.has(key)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the first value(s) in the Collection.
   * @param {number} [x=1] - The number of values to get.
   * @returns {V | V[]} The first value or values.
   */
  first(x: number = 1): V | V[] {
    const result: V[] = [];
    let count = 0;
    for (const value of this.values()) {
      result.push(value);
      count++;
      if (count === x) {
        break;
      }
    }
    return result.length > 1 ? result : result[0];
  }

  /**
   * Returns the last value(s) in the Collection.
   * @param {number} [x=1] - The number of values to get.
   * @returns {V | V[]} The last value or values.
   */
  last(x: number = 1): V | V[] {
    const result: V[] = [];
    let count = 0;
    for (const [key, value] of [...this.entries()].reverse()) {
      result.unshift(value);
      count++;
      if (count === x) {
        break;
      }
    }
    return result.length > 1 ? result : result[0];
  }

  /**
   * Sets a value in the Collection, respecting the limit.
   * @param {K} key - The key of the value.
   * @param {V} value - The value to set.
   * @returns {this} The Collection instance.
   */
  set(key: K, value: V): this {
    if (this.size >= (this.limit || Infinity)) {
      const firstKey = this.keys().next().value;
      this.delete(firstKey);
    }
    super.set(key, value);
    return this;
  }

  /**
   * Finds a value in the Collection that matches the expression.
   * @param {function} expression - The expression to evaluate.
   * @returns {V | undefined} The value if found, otherwise undefined.
   */
  find(expression: (value: V, key: K, map: Map<K, V>) => boolean): V | undefined {
    for (const [key, value] of this.entries()) {
      if (expression(value, key, this)) {
        return value;
      }
    }
    return undefined;
  }

  /**
   * Filters the Collection based on the expression.
   * @param {function} expression - The expression to evaluate.
   * @returns {Collection<K, V>} A new Collection with the filtered values.
   */
  filter(expression: (value: V, key: K, map: Map<K, V>) => boolean): Collection<K, V> {
    const result = new Collection<K, V>();
    for (const [key, value] of this.entries()) {
      if (expression(value, key, this)) {
        result.set(key, value);
      }
    }
    return result;
  }
}

export { Collection };