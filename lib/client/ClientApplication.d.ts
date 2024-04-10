import { type Client } from "./Client";
import { ApplicationCommandManager } from "../structures/Managers/ApplicationCommandsManager";
/**
 * Represents the Client Application
 */
declare class ClientApplication {
    readonly client: Client;
    commands: ApplicationCommandManager;
    constructor(client: Client);
}
export { ClientApplication };
