export enum PresenceStatus {
    Online = "online",
    Idle = "idle",
    DND = "dnd",
    Invisible = "invisible",
    Offline = "offline"
};

export enum PresenceTypes {
    Game = 0,
    Streaming = 1,
    Listening = 2,
    Watching = 3,
    Custom = 4,
    Competing = 5
};

export enum PresencePlatforms {
    Desktop = "desktop",
    Web = "web",
    Mobile = "mobile"
};

export interface GatewayActivityPayload {
    name: string,
    type: PresenceTypes,
    url: string | null
}