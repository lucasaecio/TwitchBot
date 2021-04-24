const TwitchCommands = require('./TwitchCommands');
const channelData = require('./channelData.json');
const tmi = require('tmi.js');


class TwitchChatBot {

    constructor() {
      this.channel = channelData.channel;
        this.client = new tmi.Client({
            identity: {
              username: channelData.username,
              password: channelData.password
            },
            connection: {
              secure: true,
              reconnect: true
            },
            channels: [ channelData.channel ]
          });

        this.chatCommands = TwitchCommands.getCommands();
    }

    connect() {
        this.client.connect();
    }
    
    handleMessages(){
        this.client.on('message', (channel, tags, message, self) => {
          this.handleCommand(message);
        });
    }

    handleCommand(message) {
      const findCommand = (value) => value.command === message;
      const commandObject = this.chatCommands.find(findCommand);

      if(commandObject && !commandObject.disabled) {
        this.client.say(this.channel, commandObject.message);
      }

      if(message.includes("!addCommand")) {
        let hasCommandCreated = this.creatingCommand(message);

        if(hasCommandCreated) {
          this.client.say(this.channel, `Comando criado com sucesso!`);
        } else {
          this.client.say(this.channel, `Erro ao criar comando: addCommand <command> <message>`);
        }
      }
    }

    creatingCommand(message) {
      let splittedMessage = message.split(" ");
      if(splittedMessage.length < 3) return false;

      let indexOfMessage = message.indexOf(" ", 13);
      let commandMessage = message.substring(indexOfMessage+1);

      TwitchCommands.addCommand(`!${splittedMessage[1]}`, commandMessage);
      return true;

    }
}

module.exports = TwitchChatBot;