const TwitchChatBot =  require("./TwitchChatBot");
const TwitchCommands = require('./TwitchCommands');

let bot = new TwitchChatBot();

bot.connect();
bot.handleMessages();