import { ActivityType } from "discord-api-types/v10";
export declare enum PresenceStatus {
    Online = "online",
    Idle = "idle",
    DND = "dnd",
    Invisible = "invisible",
    Offline = "offline"
}
export declare enum PresenceTypes {
    Game = 0,
    Streaming = 1,
    Listening = 2,
    Watching = 3,
    Custom = 4,
    Competing = 5
}
export declare enum PresencePlatforms {
    Desktop = "desktop",
    Web = "web",
    Mobile = "mobile"
}
export interface GatewayActivityPayload {
    name: string;
    type: PresenceTypes | ActivityType;
    url?: string | null;
}
