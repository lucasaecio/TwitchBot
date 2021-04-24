const TwitchCommands = require('./TwitchCommands');
const tmi = require('tmi.js');


class TwitchChatBot {

    constructor(data) {
      this.channel = data.channel;
        this.client = new tmi.Client({
            identity: {
              username: data.username,
              password: data.password
            },
            connection: {
              secure: true,
              reconnect: true
            },
            channels: [ data.channel ]
          });

        this.chatCommands = data.channelCommands;
    }

    connect() {
        this.client.connect();
    }
    
    handleMessages(){
        this.client.on('message', (channel, tags, message, self) => {
          console.log(`${tags['display-name']}: ${message}`);
          this.handleCommand(message);
        });
    }

    handleCommand(message) {
      if(this.chatCommands[message]) {
        this.client.say(this.channel, this.chatCommands[message]);
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