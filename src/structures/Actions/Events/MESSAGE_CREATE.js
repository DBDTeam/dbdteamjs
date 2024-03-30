const { Message } = require("../../../structures/Message.js");
const { Member } = require("../../Member.js");

// export class async (client, d, id) => {
//   var message = await new Message(d, client);
//   message?.channel?.messages?.cache?.set(d.id, message);
//   if (d.member && !message?.guild?.members.cache.get(d.author.id)) {
//     message?.guild?.members?.cache.set(
//       d.author.id,
//       new Member({ ...d.member, id: d.author.id }, message.guild, client)
//     );
//   }

//   client.emit("messageCreate", message);

//   return { message };
// };
