import {
  Client,
  IntegrationTypes,
  Intents,
  IntentsBitFields,
  InteractionContexts,
  PresenceStatus,
  PresenceTypes,
} from "../src";
import { ApplicationCommandType } from "discord-api-types/v10";

const $Intents = new IntentsBitFields(
  Intents.Guilds,
  Intents.GuildMembers,
  Intents.GuildMessages,
  Intents.MessageContent
);

const client = new Client({
  token:
    "",
  intents: $Intents.intents,
  gateway: {
    mobilePlatform: true,
    totalShards: 1
  }
});

client.on("ready", ({ username }) => {
  console.log(`I have successfully logged on to ${username}`);

  client.presence.update({
    activities: [{ name: `Hello world!`, type: PresenceTypes.Competing }],
    since: 0,
    status: PresenceStatus.DND,
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
  interaction.reply({ content: `ABC` })
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith("!hello!"))
    return msg.channel?.createMessage({ content: "A" });
  if (msg.content.startsWith("!pollTEST")) {
    msg.reply({
      content: `A`,
      poll: {
        question: { text: "¿ABC es BCA?" },
        answers: [{ poll_media: { text: "ABC" } }],
        duration: 140,
        allow_multiselect: true,
        layout_type: 1,
      },
    });
  }
  if(msg.content.startsWith("!helA")) {
    msg.channel.send({ content: `ABC` })
  }
});

// client.on("error", console.error);

// client.on("debug", console.log);

client.connect();