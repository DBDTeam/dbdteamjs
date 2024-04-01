/**
 * Represents a Collection (Extended from map).
 * @extends {Map}
 * @param {number} limit
 */
declare class Collection extends Map {
    limit: number | null;
    constructor(limit?: number);
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
    toJSON(): any[];
    /**
     * Check if the Collection has any value that you are trying to check.
     * @param {object} keys
     * @returns {boolean}
     */
    hasAny(keys: Array<string>): boolean;
    /**
     * Returns the first value. (or firsts values)
     * @param {number} [x = 1] - The number of amount values you want to get.
     * @returns {Array}
     */
    first(x?: number): any;
    last(x?: number): any[];
    set(key: any, value: any): this;
    find(expression: (arg: Collection) => Array<Object>): any;
    filter(expression: (arg: Collection) => Array<Object>): any[];
}
export { Collection };
