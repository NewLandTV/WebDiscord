// Require
const { Client, Collection, GatewayIntentBits, Message } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");
const { KeepAlive, SendMessage } = require("./server.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    client.user.setActivity("Web Discord", { type: "PLAYING" });

    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async message => {
    const msg = `${message.member.displayName} : ${message.content}`;

    SendMessage(msg);

    console.log(msg);
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        // Slash command execute
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true
        });
    }
});

KeepAlive();

client.login(token);