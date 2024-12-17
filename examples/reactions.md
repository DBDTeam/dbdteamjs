# Reactions!
This is an example of how reactions can be used, as we see, we have 3 fundamental methods, which are:
## Add reactions:
```typescript
/**
 * Adds reactions to the message.
 * @param {...string} emojis - The emojis to add as reactions.
 * @returns {Promise<Nullable<EmojisEmptyAnswer[]>>} - The result of the add reactions operation.
 */
    <Message>.reactions.add(...emojis: string[])
```

## Remove reactions:
```typescript
/**
   * Removes specific reactions from the message.
   * @param {RemoveEmojiPayload} removeData - The data containing emojis and optional user to remove.
   * @returns {Promise<Nullable<EmojisEmptyAnswer[]>>} - The result of the removal operation.
   */
  <Message>.reactions.remove(removeData: RemoveEmojiPayload)
```

## Remove all reactions:
```typescript
/**
   * Removes all reactions from the message.
   * @returns {Promise<ResponseFromApi | ErrorResponseFromApi | null>} - The result of the removal operation.
   */
  <Message>.reactions.removeAll()
```

### Interfaces
```typescript
/**
 * The remove emoji inner payload
 */
interface RemoveEmojiPayload {
    /**
     * The emojis to remove.
     */
    emojis: string[];
    /**
     * The user that will be removed they emoji.
     */
    user?: Nullable<string | "@me">;
  }
  
/**
 * The answer when a emoji is added or removed.
 */
 interface EmojisEmptyAnswer {
    /**
     * If the operation was successfully executed.
     */
    success: boolean,
    /**
     * The emoji that has been removed/added (if property 'success' is true)
     */
    emoji: string
  }
```

# Example of all methods.

```typescript
client.on("messageCreate", async(message) => {
    // Check if the message was sent by a bot and return if it is
    if(message.author.bot) return;

    // Check if the message contains the command "!emojis"
    if(message.content === "!emojis") {
        // Define an asynchronous function to wait for a specific amount of time
        async function wait(time: number) {
            return new Promise<void>((resolve) => setTimeout(resolve, time));
        }        

        // Send a reply message to the channel and store it in the 'msg' variable
        const msg = await message.reply(`Hello, ${message.author.username}! How are you?`) as Message;

        // Add a reaction to the message
        await msg.reactions.add("✅")

        // Wait for 500 milliseconds
        await wait(500)

        // Add multiple reactions to the message
        await msg.reactions.add("😙", "😌")

        // Log the number of reactions to the console
        console.log(`1. Reactions:`, msg.reactions.count)

        // Wait for 200 milliseconds
        await wait(200)

        // Remove a specific reaction from the message
        await msg.reactions.remove({
            emojis: ["✅"], //The emojis that will be removed
            user: "@me" // The user that will be removed they emojis (@me is for the client.)
        })

        // Log the number of reactions to the console
        console.log(`2. Reactions:`, msg.reactions.count)

        // Wait for 300 milliseconds
        await wait(300)

        // Remove all reactions from the message
        await msg.reactions.removeAll()

        // Log the number of reactions to the console
        console.log(`3. Reactions`, msg.reactions.count)
    }
});```