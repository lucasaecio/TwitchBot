const channelCommands = require("./channelData.json");

class TwitchCommands {
    constructor() {
        this.commands = channelCommands.channelCommands;
    }

    addCommand(command, message) {
        this.commands.push({
            "command": command,
            "message": message.toString(),
            "disabled": false
        });
    }

    removeCommand(command) {
        const findCommand = (value) => value.command === command;
        const indexOfCommand = this.commands.findIndex(findCommand);

        if(indexOfCommand === -1) return false;

        this.commands.splice(indexOfCommand, 1);
        return true;
    }

    getCommands(){
        return this.commands;
    }
}

module.exports = new TwitchCommands();