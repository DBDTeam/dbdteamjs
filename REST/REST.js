const RequestHandler = require("./RequestHandler")
const { CDN } = require("./CDNEndpoints")

class REST extends RequestHandler {
    constructor(client) {
        super(client)
        this.cdn = new CDN()
    }
}

module.exports = { REST }