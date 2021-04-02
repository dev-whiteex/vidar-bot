module.exports = async function (message) {
    const prefix = '!';
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();
    const command = message.client.commands.get(cmdName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

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
};