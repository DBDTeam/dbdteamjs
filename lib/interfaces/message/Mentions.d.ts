export declare enum MessageMentionParse {
    "Users" = "users",
    "Roles" = "Roles",
    "Everyone" = "everyone"
}
import { Collection } from "../../utils/Collection";
import { User } from "../../structures/User";
import { GuildRole } from "../../structures/Role";
import { Channel } from "../../structures/BaseChannel";
export interface MessageMentionsObject {
    users: Collection<string, User>;
    roles: Collection<string, GuildRole>;
    channels: Collection<string, Channel>;
}
