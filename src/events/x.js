module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const xRegex = /(x\.com\/\S+\/status\/\d+)/g;
    const xcontent = message.content;

    if (
      xRegex.test(xcontent) &&
      !/https:\/\/\S+x\.com\/\S+\/status\/\d+/.test(xcontent)
    ) {
      let editedxContent = xcontent.replace(xRegex, "fixup$1");
      if (!/\/photo\/\d+/.test(editedxContent)) {
        editedxContent += "/en";
      }
      message.delete().catch(console.error);
      message.channel.send(
        `${message.author} I've embedded your X media for you!\n ${editedxContent}`
      );
    }
  });
};
