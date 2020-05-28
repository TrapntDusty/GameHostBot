const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
var ms = require('./minestat');
client.login('TOKEN HERE');

let serverStats = {
    GuildID: 'ID TEXT OR VOICE CHANNEL',
};

ms.init('IP DEL SERVER', 00000 , function(result) { //00000 sera el port del servidor
    // console.log(" server status of " + ms.address + " on port " + ms.port + ":");
    if (ms.online) {
        console.log("Server is online \nversion " + ms.version + " \n" + ms.current_players + " out of " + ms.max_players + " players." + "\n" + "Latency: " + ms.latency + "ms");
    } else {
        console.log("Server is offline!");
    }
});

client.on('ready', () => { // Some fancy things i wanted to add 
    console.log("test");
    client.user.setActivity('some Jazz', { type: 'LISTENING' });
}); // you can remove it if you want

client.on("ready", () => {
    if (ms.online) {
        client.channels.cache.get(serverStats.GuildID).setName("Server Status: Online");
    } else {
        client.channels.cache.get(serverStats.GuildID).setName("Server Status: Offline ");
    }
    client.channels.cache.get(serverStats.GuildID).send({ embed: Embed });
})
let Active_Users = ms.current_players;
let Maxim_Users = ms.max_players;
let laten = ms.latency;
let vers = ms.version;
const Embed = {
    color: 0x0099ff,
    title: 'cool title',
    url: 'some url',
    author: {
        name: 'some name',
        icon_url: 'some icon',
        url: 'some url',
    },
    description: 'Some description here',
    thumbnail: {
        url: 'some url',
    },
    fields: [{
            name: 'some name',
            value: 'some description ',
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        },
        {
            name: 'something',
            value: `${vers}`, //not working properly , throwing undefined
            inline: true,
        },
        {
            name: 'something',
            value: `${Active_Users} of  ${Maxim_Users}`, //not working properly , throwing undefined
            inline: true,
        },
        {
            name: 'something',
            value: laten, //not working properly , throwing undefined
            inline: true,
        },
    ],
    image: {
        url: 'some url ',
    },
    timestamp: new Date(),
    footer: {
        text: 'foot text ',
        icon_url: 'foot url',
    },
};

//make it repeat itself from time to time
