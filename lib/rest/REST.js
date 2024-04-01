"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REST = void 0;
const CDN_1 = require("./CDN");
const requestHandler_1 = require("./requestHandler");
class REST extends requestHandler_1.RequestHandler {
    /**
     * The CDN handler for this client's requests
     */
    cdn;
    /**
     *  Create a new instance of the rest client.
     *
     * @param client - The client
     */
    constructor(client) {
        super(client);
        this.cdn = new CDN_1.CDN();
    }
}
exports.REST = REST;
