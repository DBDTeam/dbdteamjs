# Select menus!
Let's see an example of how select menus are used...

## Example code
```typescript
// Event handler for when a message is created
client.on("messageCreate", async (message) => {
  // Ignore messages sent by bots
  if (message.author.bot) return;

  // If the message content is "!select-menu", send a message with a string select menu
  if (message.content === "!select-menu") {
    message.reply({
      content: "Select menu!",
      components: [
        {
          type: ComponentType.ActionRow, // Type of action row (1)
          components: [
            {
              type: ComponentType.StringSelect, // Type of string select (3)
              custom_id: "string_select_menu", // The custom id of the select menu
              placeholder: "Select an option", // The place holder
              min_values: 1, // The minimum amount of values that can be selected
              max_values: 1, // The maximum amount of values that can be selected.
              options: [ // The options of the String Select Menu
                {
                  label: "Option 1", // The label of the first option
                  value: "Value1", // The value of the first option
                  emoji: { // The emoji of the first option
                    name: "🔥", 
                  },
                },
                {
                  label: "Option 2",
                  value: "2",
                  emoji: { // The emoji of the first option (server emoji)
                    name: "111_ZdoMoney",
                    id: "1192482750565974166",
                  },
                },
                {
                  label: "Option 3",
                  value: "3",
                  emoji: {
                    name: "✅",
                  },
                },
                //...
                // Remember that StringSelectMenus can only have a maximum of 25 options.
              ],
            },
          ],
        },
      ],
    });
  }

  // If the message content is "!user-selectmenu", send a message with a user select menu
  if (message.content === "!user-selectmenu") {
    message.reply({
      content: "UserSelect menu!",
      components: [
        {
          type: ComponentType.ActionRow, // Type of ActionRow (1)
          components: [
            {
              type: ComponentType.UserSelect, // Type of UserSelect (5)
              custom_id: "user_select_menu",
              placeholder: "Select a user",
              min_values: 1,
              max_values: 1,
            },
          ],
        },
      ],
    });
  }
});
```