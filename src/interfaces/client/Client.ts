import { ActivityPayload, PresenceStatus } from "../../types/Presences";

export interface ClientOptions {
  token: string;
  intents: number;
  gateway: any;
}

export interface GatewayConfig {
  url: string;
  mobilePlatform: boolean;
  totalShards: number | undefined;
  agent: string;
}

export interface ClientPresencePayload {
  activities: Array<ActivityPayload>;
  status: PresenceStatus;
  afk: boolean;
  since: number;
}

export interface EditClientUserPayload {
  username?: string;
  avatar?: string;
}
