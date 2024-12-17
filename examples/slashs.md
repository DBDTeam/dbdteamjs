# Slashs interactions!

Here we will show examples of how to use slash type interactions, we will see important functions, also the different types of slash interactions, among other things.

## Slash creation:
```ts
const commands: CommandsBody[] = [
  {
    name: "client",
    description: "View my client commands",
    options: [
      {
        name: "ping",
        description: "Check my latency!",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "info",
        description: "Get information about the bot",
        type: ApplicationCommandOptionType.Subcommand,
      },
    ],
  },
  {
    name: "config",
    description: "Configure you server",
    options: [
      {
        name: "channel",
        description: "Configure channels in your server",
        type: ApplicationCommandOptionType.SubcommandGroup,
        options: [
          {
            name: "set-welcome",
            description: "Set a config channel",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "channel",
                description: "The channel in question",
                type: ApplicationCommandOptionType.Channel,
                required: true,
              },
            ],
          },
          {
            name: "set-goodbye",
            description: "Set a config channel",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "channel",
                description: "The channel in question",
                type: ApplicationCommandOptionType.Channel,
                required: true,
              },
              {
                name: "embed",
                description: "If the bot sends a embed message",
                type: ApplicationCommandOptionType.Boolean,
                required: false,
              },
            ],
          },
        ],
      },
    ],
  }
];

client.application.commands.set(commands);
```

## Commands Body
To see information about CommandsBody, please see the [API documentation](https://discord-api-types.dev/api/discord-api-types-v10/interface/RESTPostAPIChatInputApplicationCommandsJSONBody)

## Code example
```ts
client.on("interactionCreate", async (int) => {
  // Check if the interaction is a slash command
  if (int.isSlash()) {
    // Handle different slash command names
    if (int.name === "client") {
      if (int.subcommand === "ping") { // if the subcommand of the slash name is 'ping'
        // Respond to the ping command
        await int.reply({ content: `Pong! Latency: ${int.client.ping}ms` });
      } else if (int.subcommand == "info") { // if the subcommand of the slash is 'info'
        await int.reply({
          embeds: [
            {
              title: "Viewing my information",
              fields: [
                {
                  name: "Servers",
                  value: `Im in **${client.guilds.cache.size}** servers`,
                },
                {
                  name: "Total channels (in cache)",
                  value: `I have **${client.channels.cache.size}** channels in cache.`,
                },
                {
                  name: "Users in cache",
                  value: `I have **${client.users.cache.size}** users in cache.`,
                },
              ],
              color: 16776960,
            },
          ],
        });
      }
    } else if (int.name === "config") { // if the slash name is config will execute this
      if (int.subcommand_group === "channel") { // if the subcommand group is channel
        if (int.subcommand === "set-welcome") { // if the subcommand is set-welcome
          const channelId = int.values.get("channel") as InteractionOptionValue; // gets the value
          const channel =
            int.guild.channels.cache.get(channelId.value as string) ||
            (await int.guild.channels.fetch(channelId.value as string)); // fetches the channel
          int.reply(`Configuration channel was set to ${channel?.toString()}`); // respond to the user what channel they selected.
        } else if (int.subcommand === "set-goodbye") {
          const channelId = int.values.get("channel") as InteractionOptionValue; // gets the value "channel"
          const wantsEmbed = int.values.get("embed") as InteractionOptionValue; // gets the value "embe"
          const channel =
            int.guild.channels.cache.get(channelId.value as string) ||
            (await int.guild.channels.fetch(channelId.value as string)); // fetches the channel

          if (wantsEmbed) { // if they want embed response, it will respond in embed message
            int.reply({
              embeds: [
                { title: "Embed message!!", description: channel?.toString() },
              ],
            }); // responses with a embed
          } else { // if they don't want a embed message, it will respond with a normal message
            int.reply(
              `Configuration channel was set to ${channel?.toString()}`
            ); // responds normally
          }
        }
      }
    }
  }
});```