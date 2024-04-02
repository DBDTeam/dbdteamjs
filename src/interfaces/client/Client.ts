import { PresenceStatus, ActivityPayload } from "../../types/Presences";

export interface ClientOptions {
  token: string;
  intents: number;
  gateway: GatewayConfig;
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