import { Client } from "../client/Client";
declare abstract class Base {
    /**
     * The client that instantiated this
     * @name Base#client
     */
    readonly client: Client;
    id: any;
    /**
     * @param client - The client
     */
    constructor(client: Client);
    _patch(data: unknown): unknown;
    get getBinary(): bigint;
    get getEpoch(): bigint;
}
export { Base };
