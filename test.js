const {
  Client,
  IntentsBitFields,
  Presence,
  InteractionTypes,
  Contexts,
} = require("./src/package");
const { Message } = require("./src/structures/Message");

const Intents = new IntentsBitFields();

Intents.add("Guilds");
Intents.add("GuildMembers");
Intents.add("GuildMessages");
Intents.add("MessageContent");

/**
 * @type {Client}
 */
const client = new Client({
  token: `...`,
  intents: Intents.intents,
  gateway: {
    mobilePlatform: false,
  },
});

// console.log(client);

client.on("ready", () => {
  console.log(`I have successfully logged on to ${client.user.username}`);
  client.presence.update({
    activities: [{ name: `Hello world!`, type: Presence.Types.Game }],
    since: 0,
    status: Presence.Status.DND,
  });

  client.application.commands.set([
    {
      name: "ping",
      description: "Pong!",
      options: [],
      type: InteractionTypes.Slash,
      integrations_types: [Contexts.Channel, Contexts.DM],
      contexts: [Contexts.Channel, Contexts.DM],
    },
  ]);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isSlash) {
    if (interaction.name === "ping") {
      interaction.makeReply({ content: `Pong!\nLatency: ${client.ping}` });
    }
  }
});


client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;
    if (msg.content.startsWith("!eval")) {
      const as = Date.now();

      async function evalAsync(userCode) {
        return await eval(`(async () => { ${userCode} })()`);
      }

      const args = msg.content.split(" ").slice(1);
      var code = args.join(" ");
      var result;
      try {
        result = await evalAsync(code);
      } catch (error) {
        return msg.reply({
          embeds: [
            {
              title: "Evaled without success",
              description: `* Error found:\n\`${error?.message}\`\n\n* Stack:\n\`\`\`js\n${error?.stack}\`\`\``,
              timestamp: new Date(),
              footer: {
                text: "Imagine being so dumb",
                icon_url: client.user.avatarUrl(),
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
      var files = [];
      if (sq != result?.toString()) {
        files.push({
          url: Buffer.from(result?.toString()),
          name: "result.txt",
        });
      }
      // TODO: Move the 'createMessage' to 'DefaultChannel' and put its missing properties on it
      msg.channel.createMessage({
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
  }
);

client.connect();
