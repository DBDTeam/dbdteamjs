import { Nullable } from "../..";

/**
 * The remove emoji inner payload
 */
export interface RemoveReactionPayload {
    /**
     * The emojis to remove.
     */
    reactions: string[];
    /**
     * The user that will be removed they reactions.
     */
    user?: Nullable<string |"@me">;
  }
/**
 * The answer when a reaction is added or removed.
 */
  export interface ReactionEmptyAnswer {
    /**
     * If the operation was successfully executed.
     */
    success: boolean,
    /**
     * The reaction that has been removed/added (if property 'success' is true)
     */
    reaction?: string
  }