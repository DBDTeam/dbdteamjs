import { type Client } from "./Client";
/**
 * Represents the Client Application
 */
declare class ClientApplication {
    readonly client: Client;
    commands: any;
    constructor(client: Client);
}
export { ClientApplication };
