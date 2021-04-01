const eclient = require('./core/client');
const client = new eclient();

const { readdirSync } = require('fs');
const { join } = require('path');

const config = require('dotenv').config();

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(join(__dirname, 'commands', `${file}`));
    client.commands.set(command.name, command);
    console.log(`Vidar is loading: ${command.name}.js`);
};

client.on('ready', () => {
    console.warn('Vidar is online.');
});

client.on('warn', error => 
    console.warn('WARNING', error)
);

client.on('error', error =>
    console.error('ERROR', error)
);

client.on('message', async (message) => {
    const prefix = '!';
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();
    const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if(!command) return;
    if(command.args && !args.length) {
        let reply = `${message.author}, you did not provide any arguments!`;
        if(command.usage) reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        return message.channel.send(reply);
    };

    try {
        command.execute(message, args);
    } catch(error) {
        console.error(error);
        message.channel.send(`\`${message.author}\` there was an error trying to execute that command!`);
    };
});

client.login(process.env.TOKEN);