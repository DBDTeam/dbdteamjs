const Status = {
    Online: "online",
    Idle: "idle",
    DND: "dnd",
    Invisible: "invisible"
};

const Types = {
    Game: 0,
    Streaming: 1,
    Listening: 2,
    Watching: 3,
    Custom: 4,
    Competing: 5
};

const Platforms = {
    Desktop: "desktop",
    Web: "web",
    Mobile: "mobile"
};

module.exports = { Presence: { Types, Status, Platforms } };