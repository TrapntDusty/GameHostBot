const NUM_FIELDS = 6; // number of values expected from server
const DEFAULT_TIMEOUT = 5; // default TCP timeout in seconds
const fs = require('fs');
test = [];
address = null;
port = null;
online = null; // online or offline?
version = null; // server version
motd = null; // message of the day
current_players = null; // current number of players online
max_players = null; // maximum player capacity
latency = null; // ping time to server in milliseconds
module.exports = {
    init(address, port, timeout, callback) {

        this.address = address;
        this.port = port;
        if (typeof(timeout) === typeof(Function())) {
            callback = timeout;
            timeout = DEFAULT_TIMEOUT;
        }

        const net = require('net');
        var start_time = new Date();
        const client = net.connect(port, address, () => {
            this.latency = Math.round(new Date() - start_time);
            var buff = Buffer.from([0xFE, 0x01]);
            client.write(buff);
        });

        client.setTimeout(timeout * 1000);

        client.on('data', async(data) => {
            if (data != null && data != '') {
                var server_info = data.toString().split("\x00\x00\x00");
                si(server_info);
            }
            callback();
            client.end();
        });

        client.on('timeout', () => {
            console.log("timeout")
            callback();
            client.end();
            process.exit();
        });

        client.on('end', async() => {
            return;
        });

        client.on('error', (err) => {
            callback();
        });
    }
};

function si(server_info) {
    if (server_info != null && server_info.length >= NUM_FIELDS) {
        online = true;
        version = server_info[2].replace(/\u0000/g, '');
        motd = server_info[3].replace(/\u0000/g, '');
        current_players = server_info[4].replace(/\u0000/g, '');
        max_players = server_info[5].replace(/\u0000/g, '');
    } else {
        this.online = false;
    }
    array = {
        array: [online, version, current_players, max_players]
    };
    fs.writeFileSync("./data.json", JSON.stringify(array, null, 4));
}
