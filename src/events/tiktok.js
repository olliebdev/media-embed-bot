module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const ttRegex = /(tiktok\.com\/\S+\/+)/g;
    const ttcontent = message.content;

    if (
      ttRegex.test(ttcontent) &&
      !ttcontent.includes("https://vm.vxtiktok.com")
    ) {
      const editedttContent = ttcontent.replace(ttRegex, "vx$1");
      message.delete().catch(console.error);
      message.channel.send(
        `${message.author} I've embedded your Tiktok media for you!\n ${editedttContent}`
      );
    }
  });
};
