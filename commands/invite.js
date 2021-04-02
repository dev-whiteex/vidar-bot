const {MessageEmbed} = require('discord.js-light');

module.exports = {
    name: 'invite',
    execute(message) {
        let inviteEmbed = new MessageEmbed()
            .setAuthor('INVITE')
            .setDescription(`Click [here](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot&permissions=8254) to add Vidar on another server!`)
            .setFooter(`requested by ${message.author.username}`, message.author.displayAvatarURL());
        message.channel.send(inviteEmbed).catch(console.error);
    }
}