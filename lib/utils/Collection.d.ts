/**
 * Represents a Collection (Extended from Map).
 * @extends {Map}
 * @template K, V
 */
declare class Collection<K, V> extends Map<K, V> {
    /**
     * The limit of the Collection.
     * @type {number | null}
     */
    limit: number | null;
    /**
     * Creates an instance of Collection.
     * @param {number} [limit=Infinity] - The limit of the Collection.
     */
    constructor(limit?: number);
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
    toJSON(): V[];
    /**
     * Checks if the Collection has any of the specified keys.
     * @param {Array<K>} keys - The keys to check.
     * @returns {boolean} True if the Collection has any of the keys, otherwise false.
     */
    hasAny(keys: K[]): boolean;
    /**
     * Returns the first value(s) in the Collection.
     * @param {number} [x=1] - The number of values to get.
     * @returns {V | V[]} The first value or values.
     */
    first(x?: number): V | V[];
    /**
     * Returns the last value(s) in the Collection.
     * @param {number} [x=1] - The number of values to get.
     * @returns {V | V[]} The last value or values.
     */
    last(x?: number): V | V[];
    /**
     * Sets a value in the Collection, respecting the limit.
     * @param {K} key - The key of the value.
     * @param {V} value - The value to set.
     * @returns {this} The Collection instance.
     */
    set(key: K, value: V): this;
    /**
     * Finds a value in the Collection that matches the expression.
     * @param {function} expression - The expression to evaluate.
     * @returns {V | undefined} The value if found, otherwise undefined.
     */
    find(expression: (value: V, key: K, map: Map<K, V>) => boolean): V | undefined;
    /**
     * Filters the Collection based on the expression.
     * @param {function} expression - The expression to evaluate.
     * @returns {Collection<K, V>} A new Collection with the filtered values.
     */
    filter(expression: (value: V, key: K, map: Map<K, V>) => boolean): Collection<K, V>;
}
export { Collection };
