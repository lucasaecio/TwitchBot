const TwitchChatBot =  require("./TwitchChatBot");
const TwitchCommands = require('./TwitchCommands');

const channelData = {
    "channel": "Lukkhz",
    "username": "Lukkhz",
    "password": "oauth:p4f92x8udvr8hbc54k1ani6tf2h6kn",
    "channelCommands": TwitchCommands.getCommands()
}

let bot = new TwitchChatBot(channelData);

bot.connect();
bot.handleMessages();