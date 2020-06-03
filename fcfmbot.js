const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
var ms = require('./minestat');
client.login('YOUR BOT TOKEN HERE');
async function GetFreshData() {
    await ms.init('IP HERE', PORT HERE , function(result) {});
    return GetData();
}
client.on('ready', () => {
    client.user.setActivity('something fancy ', { type: 'LISTENING' });
});

let serverStats = {
    GuildID: 'ID LOBBY OR VOICE CHAT',
};

function GetData() {
    return JSON.parse(fs.readFileSync("./data.json", "UTF-8"));
}

async function repetitivething(msg) {
    data = await GetFreshData();
    if (data.array[0] == true) {
        client.channels.cache.get(serverStats.GuildID).setName("Server Status: Online");
    } else {
        client.channels.cache.get(serverStats.GuildID).setName("Server Status: Offline ");
    }
    msg.edit({ embed: getembed() });
}


client.on("ready", async() => {
    channel = client.channels.cache.get(serverStats.GuildID)
    msg = await channel.send({ embed: getembed() });
    setInterval(function() {
        repetitivething(msg)
    }, 10000)
});

function getembed() {
    data = GetData();
    return {
        color: 0x0099ff,
        title: 'TITLE',
        url: 'URL',
        author: {
            name: 'NAME',
            icon_url: 'ICON',
            url: 'URL',
        },
        description: 'DESCRIPTION',
        thumbnail: {
            url: 'URL',
        },
        fields: [{
                name: 'NAME',
                value: 'VALUE',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'VERSION',
                value: data.array[1],
                inline: true,
            },
            {
                name: 'Current and Max Players',
                value: data.array[2] + " of " + data.array[3],
                inline: true,
            },
        ],
        image: {
            url: 'URL',
        },
        timestamp: new Date(),
        footer: {
            text: 'Open Code Github:  https://github.com/TrapntDusty/GameHostBot ',
            icon_url: 'https://i.imgur.com/JFGp2jg.jpg',
        },
    };
}

//A lot of thanks to Pwall to help me through everything on this bot, without your help i would still be stuck 
