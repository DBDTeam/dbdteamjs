import { type Client } from "../../client";
import { Collection } from "../../utils/Collection";
import { type Guild } from "../Guild";
import { FetchWithLimitAfterAndBefore } from "./ThreadMemberManager";
import { Nullable } from "../../common";
import { User } from "../User";
import { Member } from "../Member";
export declare class GuildBanManager {
    readonly client: Client;
    cache: Collection<string, Record<string, any>>;
    id: string;
    constructor(guild: Guild, client: Client);
    get guild(): Guild;
    fetch(target: Nullable<string>, options?: FetchWithLimitAfterAndBefore): Promise<Record<any, any> | import("../../interfaces/rest/requestHandler").ResponseFromApi | null>;
    create(userId: User | string | Member, reason?: string): Promise<boolean>;
    remove(userId: User | string | Member, reason?: string): Promise<boolean>;
}
