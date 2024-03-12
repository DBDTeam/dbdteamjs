const { Collection } = require("../../Utils/Collection");
const { InteractionBase } = require("./BaseInteraction");

class SlashInteraction extends InteractionBase {
    constructor(data, client) {
        super(data, client)
        this.name = data.data.name;
        this.options = new Collection();

        for(var i of data.data.options){
            this.options.set(i.name, i)
        }
    }
}

module.exports = { SlashInteraction }