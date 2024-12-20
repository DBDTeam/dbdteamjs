# Buttons!
Here we will show a small example of how to handle the different types of buttons, including how to make buttons by author only.

## Code example
```typescript
// Event handler for when a message is created
client.on("messageCreate", async (message) => {
  // Check if the author of the message is a bot
  if (message.author.bot) return;

  // Check if the message content is "!buttons"
  if (message.content === "!buttons") {
    // Send a reply message with buttons
    message.reply({
      content: "Hi!",
      components: [
        {
          type: ComponentType.ActionRow, //Type of ActionRow (1)
          components: [
            {
              type: ComponentType.Button, //Type of Button (2)
              label: "Button 1", // The text that shows to the user when sees the message.
              style: ButtonStyle.Primary, //Style of button primary (1)
              custom_id: "primary_button", // The custom id of the button
            },
            {
              type: ComponentType.Button,
              label: "Button 2",
              style: ButtonStyle.Secondary, //Style of button secondary (2)
              custom_id: "secondary_button",
            },
            {
              type: ComponentType.Button,
              label: "Button 3",
              style: ButtonStyle.Success, //Style of button success (3)
              custom_id: "success_button",
            },
            {
              type: ComponentType.Button,
              label: "Button 4",
              style: ButtonStyle.Danger, //Style of button danger (4)
              custom_id: "danger_button",
            },
            {
              type: ComponentType.Button,
              label: "Button 5",
              style: ButtonStyle.Link, //Style of button link (5)
              url: "https://npmjs.org/package/dbdteamjs", //The url of the button
            }
          ],
        }, //Remember that ActionRows can only have 5 buttons and 1 select menu.
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.Button,
              label: "Disabled button",
              style: ButtonStyle.Secondary,
              disabled: true, // This disables the button
              custom_id: "disabled_button",
            },
            {
              type: ComponentType.Button,
              label: "Author only button",
              style: ButtonStyle.Primary,
              custom_id: "author_"+message.author.id, // This a way to make an author only button using the customId.
            }
          ]
        }
      ],
    });
  }
});

client.on("interactionCreate", async (int) => {
  // Check if the interaction is a component (button or selectmenu)
  if (int.isComponent()) {
    // Check if the component is a button
    if (int.isButton()) {
      // If the custom_id of the button ends with "_button"
      if(int.customId.endsWith("_button")) {
        // Send a reply to the interaction with the clicked button's custom_id
        int.reply({ content: `You clicked the button with custom_id: ${int.customId}` })
      } else {
        // Extract the author's ID from the custom_id
        const authorId = int.customId.split("_")[1]

        // If the user who interacted is not the author of the button
        if(authorId !== int.user.id) {
          // Send an ephemeral reply to the interaction, informing the user they're not the author
          int.reply({ content: "You're not the author of the button", ephemeral: true })
        } else {
          // Send a reply to the interaction, allowing the author to use the button
          int.reply("You can use this button.")
        }
      }
    }
  }
});
```