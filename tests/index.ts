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
      interaction.makeReply({ content: `Pong!\nLatency: ${client.ping}` });
    }
  }
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith("!eval")) {
    const as = Date.now();

    async function evalAsync(userCode: string) {
      return await eval(`(async () => { ${userCode} })()`);
    }

    const args = msg.content.split(" ").slice(1);
    var code = args.join(" ");
    var result;
    try {
      result = await evalAsync(code);
    } catch (error: any) {
      return msg.reply({
        embeds: [
          {
            title: "Evaled without success",
            description: `* Error found:\n\`${error?.message}\`\n\n* Stack:\n\`\`\`js\n${error?.stack}\`\`\``,
            timestamp: new Date().toISOString(),
            footer: {
              text: "Imagine being so dumb",
              icon_url: client.user?.avatarUrl(),
            },
          },
        ],
      });
    }
    var _typeof = typeof result;
    _typeof === "object" &&
      (result = require("util").inspect(result, { depth: 0 }));
    result === void 0 && (result = "undefined");
    var sq = result?.toString()?.substr(0, 1000);
    var files: any[] = [];
    if (sq != result?.toString()) {
      files.push({
        url: Buffer.from(result?.toString()),
        name: "result.txt",
      });
    }

    // TODO:
    // @ts-ignore
    msg.channel?.createMessage({
      embeds: [
        {
          title: "Evaled correctly with 0 errors!",
          fields: [
            {
              name: "Typeof:",
              value: _typeof,
            },
            {
              name: "Result:",
              value: "```js\n" + sq + "```",
            },
            {
              name: "Evaled in:",
              value: "`" + (Date.now() - as) + "`",
            },
          ],
        },
      ],
      files,
    });
  }
});

client.connect();
