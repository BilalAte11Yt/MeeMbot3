const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  Intents,
  Client,
} = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b),
});

client.once("ready", () => {
  console.log("MeeM Bot Hazır!!!");
  //Yapıyor Kısmı
  client.user.setActivity("discord.js", { type: "WATCHING" });
  //Durum
  client.user.setStatus("idle");
  //PP Ayarlama
  client.user
    .setAvatar("./avatar.png")
    .then((user) => console.log(`Avatar Ayarlandı!`))
    .catch(console.error);
});

//Events
const events = fs.readdirSync("./events");

//Config File
const { token } = require("./config.json");

//sa-as
client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "sa") {
    return message.channel.send("As❤️");
  }
});

//kayıt ol butons
client.on("messageCreate", (message) => {
  if (message.author.id == client.user.id) {
    return;
  }

  var embedMessage = new MessageEmbed()
    .setTitle("Kurallar")
    .setColor("DARK_RED")
    .setDescription("**:closed_book::closed_book: Kurallar :green_book::green_book:** \n \n :no_entry::no_entry:**ZORUNLU Kurallar**:no_entry::no_entry: \n \n **1=>** **Zorbalık Yasaktır :muscle::no_entry:** \n**2=>** **Özelden&Sunucu İçi Reklam, Küfür, Tehtit,Dolandırmak,Dilencilik vb. Şeyler Yasaktır:right_facing_fist::handshake:** \n**3=>** **Spam-Fazla CapsLock-Abartı Derecede Gif,Emoji,Tepki Eklemek Yasaktır :closed_book::green_book:** \n**4=>** **Herhangi Birine Saygısızlık Ve Aşağılamak Yasaktır :no_entry::no_entry: **\n**5=>** **Rol Dilenmek Kesinlikle Yasaktır :card_index::card_index: ** \n**6=>** **Spam Olarak Sadece Yazı Değil Tepki-Ses Kanalı-Ses-Bot Komutları Gibi Şeylerde Spam Sayılır (Fazlası):robot::robot: ** \n \n \n **------------------------------- Yapılma Seviyesine Göre Ceza Değişir -------------------------------** \n \n :white_check_mark::white_check_mark:**Yapabilceğiniz Şeyler**:white_check_mark::white_check_mark: \n \n **1=>** **Bu Kurallara Uyarsanız Hiç Bir Şekilde Ceza Yemezsiniz** :smile: \n \n**:arrow_down::arrow_down:Kayıt Olmak İçin ✅Kuralları Kabul Ediyorum! Butonuna Tıklayın**:arrow_down::arrow_down:");

  var row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("acceptRule")
      .setLabel("Kuralları Kabul Ediyorum!")
      .setStyle(1)
      // PRIMARY = MAVİ BUTON
      // SECONDARY = GRİ BUTON
      // SUCCESS = YEŞİL BUTON
      // DANGER = KIRMIZI BUTON
      .setEmoji("✅")
  );

  if (message.content.toLowerCase() === "+kurallar") {
    return message.channel.send({
      embeds: [embedMessage],
      components: [row],
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId == "acceptRule") {
    if (
      !interaction.guild.members.cache
        .get(interaction.user.id)
        .roles.cache.get("906902387464220703")
    ) {
      interaction.guild.members.cache
        .get(interaction.user.id)
        .roles.add("906902387464220703");
      await interaction.reply({
        content: "Başarı ile kuralları kabul ettiniz.",
        ephemeral: true,
      });
    } else {
      interaction.guild.members.cache
        .get(interaction.user.id)
        .roles.remove("906902387464220703");
      await interaction.reply({
        content: "Zaten önceden kuralları kabul etmişsiniz. Bu Yüzden Tekrar Kabul Etmelisin Üzgünüm",
        ephemeral: true,
      });
    }
  }
});

client.login(token);