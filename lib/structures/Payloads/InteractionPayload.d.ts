import { InteractionBodyRequest } from "../../common";
/**
 * Represents the data structure of an interaction payload.
 */
export declare class InteractionPayload {
    /**
     * Array containing mention types.
     * @type {MentionType[]}
     * @private
     */
    private readonly MENTIONS;
    /**
     * Default data structure for the interaction payload.
     * @type {unknown}
     * @private
     */
    private readonly Data;
    /**
     * Interaction payload data.
     * @type {APIInteraction}
     * @private
     */
    private d;
    /**
     * Files associated with the payload.
     * @type {any[]}
     * @private
     */
    private _files;
    /**
     * Additional file information.
     * @type {any[]}
     * @private
     */
    private f;
    /**
     * Creates an instance of InteractionPayload.
     * @param {any} [data={}] - Interaction payload data.
     * @param {any[]} [files=[]] - Files associated with the payload.
     */
    constructor(data: InteractionBodyRequest, files?: any[]);
    /**
     * Returns the interaction payload data.
     * @returns {unknown} The interaction payload data.
     */
    get payload(): unknown;
    /**
     * Returns the files associated with the payload.
     * @returns {any[]} The files associated with the payload.
     */
    get files(): any[];
}
