var irc    = require('twitch-irc');
var filename = process.argv[2];
var channel = process.argv[3];
var sayInterval = process.argv[4];
var markov = require('./markov')(filename);
var config = require('./config');

var client = new irc.client({
    channels: [channel],
    identity: config.identity,
    options: {
        debug: false
    }
});

client.connect();


function say_msg() {
    var msg = markov();
    console.log(msg)
    //client.say(channel, msg);
}

setInterval(say_msg, sayInterval * 1000);
