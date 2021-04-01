module.exports = {
    name: 'ping',
    execute (message) {
        message.reply(`Average ping: ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
    }
};