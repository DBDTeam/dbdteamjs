import {
  Client,
  IntegrationTypes,
  Intents,
  IntentsBitFields,
  InteractionContexts,
  PresenceStatus,
  PresenceTypes,
} from "../src";
import { SlashInteraction } from "../src/structures/Interactions/SlashInteraction";
import { ComponentInteraction } from "../src/structures/Interactions/ComponentInteraction";
import { InteractionModal } from "../src/structures/Interactions/InteractionModal";
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
    mobilePlatform: false,
  },
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
      const int = interaction as InteractionModal;
    }
  }
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith("!hello!"))
    return msg.channel?.createMessage({ content: "A" });
  if (msg.content.startsWith("!pollTEST")) {
    /*client.rest.request("POST", `/channels/${msg.channel?.id}/messages`, true, {
      data: {
        content: "ABC",
        poll: {
          question: { text: "¿ABC es BCA?" },
          answers: [{ poll_media: { text: "ABC" } }],
          duration: 140,
          allow_multiselect: false,
          layout_type: 1,
        },
      },
    });*/

    msg.channel?.createMessage({
      content: `A`,
      message_reference: { message_id: msg.id },
      poll: {
        question: { text: "¿ABC es BCA?" },
        answers: [{ poll_media: { text: "ABC" } }],
        duration: 140,
        allow_multiselect: true,
        layout_type: 1,
      },
    });
  }
});

// client.on("error", console.error);

// client.on("debug", console.log);

client.connect();