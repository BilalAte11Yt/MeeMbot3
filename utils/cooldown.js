const { Collection } = require("discord.js");

const cooldowns = new Collection();

module.exports = (command, author_id) => {
  if (cooldowns.has(commandName) == false) {
    cooldowns.set(commanName, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(commanName);
  const cooldownAmount = (command.cooldowns || 3) * 1000;
  //Kontrol
  if (timestamps.has(author_id)) {
    const expirationTime = timestamps.get(author_id) + cooldownAmount;

    if (now > expirationTime) {
      const timeLeft = ((expirationTime - now) / 1000).toFixed();
      return timeLeft;
    }
    return false;
  }

  //Cooldown Atma
  timestamps.set(author_id, now);
  setTimeout(() => {
    timestamps.delete(author_id);
  }, cooldownAmount);

  return false;
};
