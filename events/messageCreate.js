const { CommandInteraction } = require("discord.js");
const { prefix } = require("../config.json");
const cooldown = require("../utils/cooldown");
module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.content.startsWith(prefix) == false) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shifts().toLowerCase();

    const command = client.commands.get(commandName);
    if (command == undefined) return;
    //cooldown kontrol
    const isCooldown = cooldown(command, message.author_id);
    if (cooldownTime)
      return message.channel.send({
        content:
          "Lütfen Bu Komutu Kullanmak İçin ${cooldownTime} Saniye Bekleyiniz ",
      });
  });
};
