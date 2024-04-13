import { type Client } from "../../client/Client";
import { ErrorResponseFromApi, ResponseFromApi } from "../../interfaces/rest/requestHandler";
import { type Message } from "../Message";
interface RemoveEmojiPayload {
    emojis: Array<string>;
    user?: string | null | undefined | "@me";
}
declare class MessageReactions {
    readonly client: Client;
    readonly messageId: string;
    readonly channelId: string;
    readonly guildId?: string;
    reactions: Array<any>;
    constructor(client: Client, msgObj: Message, reacts: Array<any>);
    get count(): number;
    remove(removeData: RemoveEmojiPayload): Promise<(ResponseFromApi | null)[] | undefined>;
    add(...emojis: string[]): Promise<Array<ResponseFromApi | ErrorResponseFromApi | null>>;
    removeAll(): Promise<ResponseFromApi | ErrorResponseFromApi | null>;
}
export { MessageReactions };
