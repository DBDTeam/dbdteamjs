# @dbdteam.js
✨ Introducing a compact JavaScript library ([NodeJS](https://nodejs.org/en) module) designed to streamline the development of Discord bots using the [Discord API](https://discord.com/developers/docs/intro). While it's in its initial stages, your feedback is invaluable. Should you encounter any bugs, please do not hesitate to notify us. Join our [official Discord server](https://www.dbdteam.xyz/discord) (alternative [link here](https://discord.gg/FTtVXfj)), where you can open a forum in the "support-projects" channel. Our team is committed to providing immediate assistance, ensuring your concerns are promptly addressed (or at least acknowledged). Visit [our documentation here](https://dbdteam.github.io/jsdocs.github.io/).

### NPM:
![](https://img.shields.io/npm/v/dbdteamjs) ![](https://img.shields.io/npm/dt/dbdteamjs)
### GitHub:
![](https://img.shields.io/github/stars/DBDTeam/dbdteamjs) ![](https://img.shields.io/github/forks/DBDTeam/dbdteamjs)
# Installation
🚀 To integrate this compact package seamlessly into your project, adhere to the following installation procedures tailored for NPM, Yarn, and PNPM package managers under.

**NPM**
``` 
npm i dbdteamjs 
``` 
or 
```
npm i github:DBDTeam/dbdteamjs#0.0.3
```
**YARN**
```
yarn add @dbdteamjs
```
**PNPM** 
```
pnpm i dbdteamjs
```

# Starting to create the bot
🎒 Firstly, it is suggested that you please have knowledge of how to create Discord Applications in [Discord Developers Applications](https://discord.com/developers/applications), once you have your application created, follow the following steps (this will be simple, so you should know about Discord Intents too):

1. Get your app token.
2. Invite your bot to a server.

Once you have that done, it's time to start creating the robot using the package. See under.

# Example using MessageContent Intent
```javascript
const { Client, Presence, IntentBitFields } = require("./package.js")

const Intents = new IntentsBitFields()

Intents.add("Guilds")
Intents.add("GuildMembers")
Intents.add("GuildMessages")
Intents.add("MessageContent")

const client = new Client({
   token: `HERE GOES THE ROBOT TOKEN`,
   intents: Intents.intents,
   gateway: {
     mobilePlatform: false // Only this if you want the robot to have the online icon on a mobile device.
   }
})

client.on("ready", () => {
   console.log(`I have successfully logged on to ${client.user.username}`)
   client.presence.update({
     activities: [{ name: `Hello world!`, type: Presence.Types.Game }],
     since: 0,
     status: Presence.Status.DND
   })
})

client.on("messageCreate", async(message) => {
   if(message.user.bot) return; // The user is a robot
   if(message.content.startsWith("!greet")){
     message.channel.createMessage(`Hello, ${message.user.username}!`)
   }
})

client.connect() // Will establish the connection between the robot and the WS.
```
# Example using Interactions
```javascript
const { Client, Presence, IntentBitFields, SlashTypes } = require("./pacakge.js")

const Intents = new IntentBitFields()

Intents.add("Guilds")
Intents.add("GuildMembers")

const client = new Client({
   token: `HERE GOES THE ROBOT TOKEN`,
   intents: Intents.intents,
   gateway: {
     mobilePlatform: false // Only this if you want the robot to have the online icon on a mobile device.
   }
})

client.on("ready", () => {
   console.log(`I have successfully logged on to ${client.user.username}`)
   client.presence.update({
     activities: [{ name: `Hello world!`, type: Presence.Types.Game }],
     since: 0,
     status: Presence.Status.DND
   })

   client.application.commands.set(
    [
      {
        name: "ping",
        description: "Pong!",
        options: [],
        type: SlashTypes.InteractionTypes
      }, //You can add more application commands adding it in the object.
    ]
   )
})

client.on("interactionCreate", async(interaction) => {
   if(interaction.isSlash){
    if(interaction.name === "ping"){
      interaction.makeReply({ content: `Pong!\nLatency: ${client.ping}` })
    }
   }
})

client.connect() // Will establish the connection between the robot and the WS.
```
