declare const Base: any;
declare class Guild extends Base {
    #private;
    /**
     * Represents a Guild
     * @param {object} data - Guild payload
     * @param {?} client - The Client
     */
    constructor(data: any, client: any);
    _patch(data: any): Promise<void>;
}
export { Guild };
