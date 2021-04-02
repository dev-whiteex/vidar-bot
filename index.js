const eclient = require('./core/client');
const client = new eclient({
    cacheGuilds: true,
    cacheChannels: false,
    cacheOverwrites: false,
    cacheRoles: false,
    cacheEmojis: false,
    cachePresences: false
});

const chandler = require('./core/chandler');
const config = require('dotenv').config();

const { readdirSync } = require('fs');
const { join } = require('path');

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(join(__dirname, 'commands', `${file}`));
    client.commands.set(command.name, command);
    console.log(`Vidar is loading: ${command.name}.js`);
};

client.on('ready', () => {
    console.log('Vidar is online.');
});

client.on('warn', error => 
    console.warn('WARNING', error)
);

client.on('error', error =>
    console.error('ERROR', error)
);

client.on('message', chandler);

client.login(process.env.TOKEN);