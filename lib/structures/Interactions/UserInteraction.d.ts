import { Client } from "../../client";
import { Nullable } from "../../common";
import { Member } from "../Member";
import { User } from "../User";
import { InteractionBase } from "./BaseInteraction";
export declare class UserInteraction extends InteractionBase {
    #private;
    /**
     * The current target.
     */
    target: Nullable<{
        user: User;
        member: Member;
    }>;
    constructor(data: any, client: Client);
    patch(): Promise<void>;
}
