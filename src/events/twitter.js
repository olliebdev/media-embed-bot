module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const twitterRegex = /(twitter\.com\/\S+\/status\/\d+)/g;
    const content = message.content;

    if (
      twitterRegex.test(content) &&
      !/https:\/\/\S+twitter\.com\/\S+\/status\/\d+/.test(content)
    ) {
      let editedContent = content.replace(twitterRegex, "fx$1");
      if (!/\/photo\/\d+/.test(editedContent)) {
        editedContent += "/en";
      }
      message.delete().catch(console.error);
      message.channel.send(
        `${message.author} I've embedded your Twitter media for you!\n ${editedContent}`
      );
    }
  });
};
