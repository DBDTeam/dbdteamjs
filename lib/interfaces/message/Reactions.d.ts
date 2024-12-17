import { Nullable } from "../../common";
/**
 * The remove emoji inner payload
 */
export interface RemoveEmojiPayload {
    /**
     * The emojis to remove.
     */
    emojis: string[];
    /**
     * The user that will be removed they emoji.
     */
    user?: Nullable<string | "@me">;
}
/**
 * The answer when a emoji is added or removed.
 */
export interface EmojisEmptyAnswer {
    /**
     * If the operation was successfully executed.
     */
    success: boolean;
    /**
     * The emoji that has been removed/added (if property 'success' is true)
     */
    emoji: string;
}
