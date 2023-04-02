const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_TOKEN,
});

const openai = new OpenAIApi(configuration);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if (message.author.bot) return;

    if (message.content.startsWith('!ask')) {
        const prompt = message.content.slice(5).trim();

        if (!prompt) {
            return message.reply('Please provide a prompt to ask OpenAI!');
        }

        try {
            const prompt2 = prompt;
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt2,
                max_tokens: 3000,
                temperature: 0,
            });
            message.channel.send(response.data.choices[0].text);
        } catch (error) {
            console.log(error.message);
            message.reply('An error occurred while processing your request.');
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN)
    .catch(error => {
        console.error(error);
    });


//api key openai : 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
