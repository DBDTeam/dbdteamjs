"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REST = void 0;
const CDN_1 = require("./CDN");
const requestHandler_1 = require("./requestHandler");
const Endpoints = __importStar(require("./Endpoints"));
class REST extends requestHandler_1.RequestHandler {
    /**
     * The CDN handler for this client's requests
     */
    cdn;
    /**
     * The Endpoints used for client's requests.
     */
    endpoints;
    /**
     *  Create a new instance of the rest client.
     *
     * @param client - The client
     */
    constructor(client) {
        super(client);
        this.cdn = new CDN_1.CDN();
        this.endpoints = Endpoints;
    }
}
exports.REST = REST;
