import {
  ActivityType,
  ApplicationCommandType,
  PresenceUpdateStatus,
} from "discord-api-types/v10";

import {
  Client,
  IntegrationTypes,
  Intents,
  IntentsBitFields,
  InteractionContexts,
} from "../src";

const $Intents = new IntentsBitFields(
  Intents.Guilds,
  Intents.GuildMembers,
  Intents.GuildMessages,
  Intents.MessageContent
);

const client = new Client({
  token: "",
  intents: $Intents.intents,
  gateway: {
    mobilePlatform: false,
  },
});

client.on("ready", ({ username }) => {
  console.log(`I have successfully logged on to ${username}`);

  client.presence.update({
    activities: [{ name: `Hello world!`, type: ActivityType.Playing }],
    since: 0,
    status: PresenceUpdateStatus.DoNotDisturb,
  });

  client.application?.commands.set([
    {
      name: "ping",
      description: "Pong!",
      options: [],
      type: ApplicationCommandType.ChatInput,
      integrations_types: [
        IntegrationTypes.USER_INSTALL,
        IntegrationTypes.GUILD_INSTALL,
      ],
      contexts: [InteractionContexts.GUILD, InteractionContexts.BOT_DM],
    },
  ]);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isSlash) {
    // @ts-ignore
    if (interaction.name === "ping") {
      interaction.makeReply({ content: "a" });
    }
  }
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if(msg.content.startsWith("!hello!")) return msg.channel?.createMessage({ content: "A" })
});

client.connect();
