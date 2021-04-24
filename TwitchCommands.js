
class TwitchCommands {
    constructor() {
        this.commands = [];
    }

    addCommand(command, message) {
        this.commands[command] = message;
    }

    removeCommand(command) {
        delete this.commands[command];
    }

    getCommands(){
        return this.commands;
    }
}

module.exports = new TwitchCommands();