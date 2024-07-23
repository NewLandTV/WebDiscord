const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("connect")
        .setDescription("Connect to discord server."),
    async execute(interaction) {
        await interaction.reply("정상 동작 중.");
    }
};