export declare enum PresenceStatus {
    Online = "online",
    Idle = "idle",
    DND = "dnd",
    Invisible = "invisible"
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
export interface ActivityPayload {
    name: string;
    type: PresenceTypes;
    url: string | null;
}
