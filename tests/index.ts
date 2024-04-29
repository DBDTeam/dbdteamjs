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
import { SlashInteraction } from "../src/structures/Interactions/SlashInteraction";
import { ComponentInteraction } from "../src/structures/Interactions/ComponentInteraction";
import { InteractionModal } from "../src/structures/Interactions/InteractionModal";

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
    interaction = interaction as SlashInteraction;
    if (interaction.name === "ping") {
      interaction.reply({
        content: "A",
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: "A",
                custom_id: "a",
                style: 1,
              },
            ],
          },
        ],
      });
    }
  } else if (interaction.isComponent) {
    interaction = interaction as ComponentInteraction;

    if (interaction.isButton) {
      interaction.modal({
        title: "a",
        custom_id: "BCCC",
        components: [
          {
            type: 1,
            components: [
              {
                custom_id: "A",
                label: "A",
              },
            ],
          },
        ],
      });
    } else {
      const int = interaction as InteractionModal
    }
  }
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith("!hello!"))
    return msg.channel?.createMessage({ content: "A" });
});

client.on("error", (err: any) => {
  console.error(err.d.error._misc, err.d.data.headers);
});

client.connect();
