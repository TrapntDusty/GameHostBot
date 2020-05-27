const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
var ms = require('./minestat');
client.login('your token here');

let serverStats = {
    GuildID: '715216913160208445',
};

ms.init('104.129.46.132', 25620, function(result) {
    // console.log(" server status of " + ms.address + " on port " + ms.port + ":");
    if (ms.online) {
        console.log("Server is online \nversion " + ms.version + " \n" + ms.current_players + " out of " + ms.max_players + " players." + "\n" + "Latency: " + ms.latency + "ms");
    } else {
        console.log("Server is offline!");
    }
});

client.on('ready', () => {
    console.log("test");
    client.user.setActivity('some Jazz', { type: 'LISTENING' });
});

client.on("ready", () => {
    if (ms.online) {
        client.channels.cache.get(serverStats.GuildID).setName("Server Status: Online");
    } else {
        client.channels.cache.get(serverStats.GuildID).setName("Server Status: Offline ");
    }
    client.channels.cache.get(serverStats.GuildID).send({ embed: exampleEmbed });
})

const exampleEmbed = {
    color: 0x0099ff,
    title: 'Minecraft FCFM Server',
    url: 'https://www.facebook.com/photo/?fbid=2115096305189212&set=a.207529222612606',
    author: {
        name: 'play.fcfm.site:25620',
        icon_url: 'https://i.imgur.com/M4zPwW7.jpg',
        url: 'https://discord.js.org',
    },
    description: 'Some description here',
    thumbnail: {
        url: 'https://i.imgur.com/M4zPwW7.jpg',
    },
    fields: [{
            name: 'Regular field title',
            value: 'Some value here',
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        },
        {
            name: 'Server Status',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
    ],
    image: {
        url: 'https://i.imgur.com/M4zPwW7.jpg',
    },
    timestamp: new Date(),
    footer: {
        text: 'Open Code Github: ',
        icon_url: 'https://i.imgur.com/M4zPwW7.jpg',
    },
};
