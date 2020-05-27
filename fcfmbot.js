const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
var ms = require('./minestat');
client.login('TOKEN HERE');

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
    client.channels.cache.get(serverStats.GuildID).send({ embed: Embed });
})

const Embed = {
    color: 0x0099ff,
    title: 'Minecraft FCFM Server',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    author: {
        name: 'play.fcfm.site:25620',
        icon_url: 'https://i.imgur.com/M4zPwW7.jpg',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    description: 'Some description here',
    thumbnail: {
        url: 'https://i.imgur.com/M4zPwW7.jpg',
    },
    fields: [{
            name: 'Servidor De Minecraft Java',
            value: 'Servidor de Minecraft Official del Discord de FCFM\nLink del Discord de FCFM : ',
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        },
        {
            name: 'Version del Servidor',
            value: `${ms.version}`,
            inline: true,
        },
        {
            name: 'Current and Max Players',
            value: `${ms.current_players} of  ${ms.max_players}`,
            inline: true,
        },
        {
            name: 'Latency',
            value: ms.latency,
            inline: true,
        },
    ],
    image: {
        url: 'https://i.imgur.com/M4zPwW7.jpg',
    },
    timestamp: new Date(),
    footer: {
        text: 'Open Code Github:  https://github.com/TrapntDusty/GameHostBot ',
        icon_url: 'https://i.imgur.com/JFGp2jg.jpg',
    },
};
