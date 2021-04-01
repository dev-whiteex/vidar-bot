const {Client, Collection} = require('discord.js-light');

class client extends Client {
    constructor() {
        super({});

        this.commands = new Collection();
        this.queue = new Map();
    }
};

module.exports = client;