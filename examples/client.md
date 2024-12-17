# Starting to create the bot
🎒 Firstly, it is suggested that you please have knowledge of how to create Discord Applications in [Discord Developers Applications](https://discord.com/developers/applications), once you have your application created, follow the following steps (this will be simple, so you should know about Discord Intents too):

1. Get your app token.
2. Invite your bot to a server.

Once you have that done, it's time to start creating the robot using the package. See under.

# Example using MessageContent Intent
```typescript
// Import necessary classes from the dbdteamjs library
import { Client, IntegrationTypes, Intents, IntentsBitFields, PresenceStatus, PresenceTypes } from "dbdteamjs";

// Create an instance of IntentsBitFields to specify which intents the bot should listen for
const Ints = new IntentsBitFields()
    .add(Intents.Guilds)
    .add(Intents.GuildMessages)
    .add(Intents.MessageContent);

// Create a Client instance with the authentication token and specified intents
const client = new Client({
    token: "",
    intents: Ints.intents,
});

// Event handler for when the client is ready and connected to Discord.
client.on("ready", () => {
    console.log(`Logged in as ${client.user.username}!`); // Log the bot's username in the console
    client.presence.update({ // Update the bot's presence
        status: PresenceStatus.Online, // Set the presence status to "Online"
        activities: [{ // Add an activity to the bot's list of activities
            name: "dbdteamjs is beautiful!", // The activity's name
            type: PresenceTypes.Game, // The activity's type (Game)
        }]
    });
});

// Event handler for when a message is created in the server
client.on("messageCreate", async(message) => {
    if(message.author.bot) return; // Ignore messages from other bots
    if(message.content === "!hi") { // If the message contains "!hi"
        message.reply(`Hello, ${message.author.username}! How are you?`); // Reply with a personalized message
    }
    if(message.content === "!embed") { // If the message contains "!embed"
        message.reply({ // Reply with an embedded message
            embeds: [
                {
                    title: "This is an Embed!", // The embedded message's title
                    description: "An embedded message.", // The embedded message's description
                    color: 0x0099ff, // The embedded message's color
                    fields: [
                        {
                            name: "Field 1", // The name of the first field
                            value: "Some value", // The value of the first field
                            inline: true // Indicates if the field should be displayed inline
                        },
                        {
                            name: "Field 2", // The name of the second field
                            value: "Another value", // The value of the second field
                            inline: true // Indicates if the field should be displayed inline
                        }
                    ],
                    timestamp: (new Date()).toISOString(), // Add the current timestamp to the embedded message
                    footer: {
                        text: " My Cool Guild" // The footer text of the embedded message
                    }
                }
            ]
        });
    }
});

// Connect the bot to the Discord server
client.connect();
```
# Example using Interactions
```typescript
// Import necessary classes from the dbdteamjs library
import { Client, CommandsBody, Intents, IntentsBitFields, InteractionOptionValue, PresenceStatus, PresenceTypes } from "dbdteamjs";

// Create an instance of IntentsBitFields to specify which intents the bot should listen for
const Ints = new IntentsBitFields()
    .add(Intents.Guilds)

// Create a Client instance with the authentication token and specified intents
const client = new Client({
    token: "",
    intents: Ints.intents,
});

// Define an array of commands for the bot
const commands: CommandsBody[] = [{
    name: "ping",
    description: "Replies with 'Pong!'",
    options: []
}, {
    name: "options",
    description: "Has options!",
    options: [{
        name: "color",
        description: "Choose your favorite color!",
        type: 3,
        required: true,
        choices: [{
            name: "Red",
            value: "RED"
        }, {
            name: "Blue",
            value: "BLUE"
        }, {
            name: "Green",
            value: "GREEN"
        }]
    }]
}]

// Event handler for when the client is ready and connected to Discord.
client.on("ready", () => {
    console.log(`Logged in as ${client.user.username}!`); // Log the bot's username in the console
    client.presence.update({ // Update the bot's presence
        status: PresenceStatus.Online, // Set the presence status to "Online"
        activities: [{ // Add an activity to the bot's list of activities
            name: "dbdteamjs is beautiful!", // The activity's name
            type: PresenceTypes.Game, // The activity's type (Game)
        }]
    });

    // Set the bot's commands
    client.application.commands.set(commands)
});

// Event handler for when an interaction (command) is created
client.on("interactionCreate", async(int) => {
    // Check if the interaction is a slash command
    if(int.isSlash()) {
        // Handle different slash command names
        if(int.name === "ping") {
            // Reply with "Pong!"
            int.makeReply("Pong!")
        } else if(int.name === "options") {
            // Get the selected color option value
            const choice = int.values.get("color") as InteractionOptionValue
            // Reply with the selected color
            int.makeReply(`Options: ${choice.value}`)
        }
    }
})

// Connect the bot to Discord
client.connect();
```