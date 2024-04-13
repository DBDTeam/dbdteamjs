declare abstract class Base {
    id: any;
    data: unknown;
    /**
     * @param string - The snowflake
     */
    constructor(id: string | Record<any, any>);
    _patch(data: unknown): unknown;
    get getBinary(): bigint;
    get getEpoch(): bigint;
}
export { Base };
