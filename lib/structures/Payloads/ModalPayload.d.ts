/**
 * The Components of an Action Row.
 */
export interface ActionRow<T> {
    /**
     * The type (For action rows is 1)
     */
    type: 1;
    /**
     * The components that will be added in the action row.
     */
    components: T;
}
/**
 * The components of a modal.
 */
export interface ModalComponents {
    /**
     * The type (for TextInputs is 4)
     * @type {number}
     */
    type?: 4;
    /**
     * The customId of the option. (you also can use customId)
     * @type {string}
     */
    custom_id: string;
    /**
     * The label of the option.
     * @type {string}
     */
    label: string;
    /**
     * The style of the option. (1 for Short & 2 for Paragraph)
     * @type {1 | 2}
     */
    style?: 1 | 2;
    /**
     * Minimum input length for a text input; min 0, max 4000 (You can also use min)
     * @type {number}
     */
    min_length?: number;
    /**
     * Maximum input length for a text input; min 1, max 4000 (You can also use max)
     * @type {number}
     */
    max_length?: number;
    /**
     * Pre-filled value for this component; max 4000 characters
     * @type {string}
     */
    value?: string;
    /**
     * Custom placeholder text if the input is empty; max 100 characters
     * @type {string}
     */
    placeholder?: string;
}
/**
 * The ModalPayload data to submit modals.
 */
export interface ModalPayloadData {
    /**
     * The custom id of the Modal. (You can also use customId)
     */
    custom_id: string;
    /**
     * The title of the modals.
     */
    title: string;
    /**
     * The components of the modal.
     */
    components: ActionRow<ModalComponents[]>[];
}
export declare class InteractionModalPayload {
    #private;
    /**
     * Represents a InteractionModalPayload
     * @param {ModalPayloadData} data - The ModalPayloadData.
     */
    constructor(data: any);
    /**
     * Returns the clean payload.
     * @type {ModalPayloadData}
     */
    get payload(): any;
}
