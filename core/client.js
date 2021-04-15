const {Client, Collection} = require('discord.js');

class client extends Client {
    constructor() {
        super({});

        this.commands = new Collection();
        this.queue = new Map();
    }
};

module.exports = client;