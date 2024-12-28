class DiscordAPIError extends Error {
    public status: number;
    public data: any;

    constructor(message: string, status: number, data: any) {
      super(message);
      this.name = "DiscordAPIError";
      this.status = status;
      this.data = data;
  
      Error.captureStackTrace(this, this.constructor);
    }
  
    toString() {
      return `${this.name}: ${this.message}\nStatus: ${this.status}\nData: ${JSON.stringify(this.data, null, 2)}`;
    }
  }
  
  class HTTPError extends Error {
    public status: number;
    public statusMessage: string;
  
    constructor(message: string, status: number, statusMessage: string) {
      super(message);
      this.name = "HTTPError";
      this.status = status;
      this.statusMessage = statusMessage;
  
      Error.captureStackTrace(this, this.constructor);
    }
  
    toString() {
      return `${this.name}: ${this.message}\nStatus: ${this.status}\nStatusMessage: ${this.statusMessage}`;
    }
  }
  
  class RateLimitError extends Error {
    public retryAfter: number;
    public global: boolean;
  
    constructor(message: string, retryAfter: number, global: boolean) {
      super(message);
      this.name = "RateLimitError";
      this.retryAfter = retryAfter;
      this.global = global;
  
      Error.captureStackTrace(this, this.constructor);
    }
  
    toString() {
      return `${this.name}: ${this.message}\nRetryAfter: ${this.retryAfter}ms\nGlobal: ${this.global}`;
    }
  }  

  export { RateLimitError, HTTPError, DiscordAPIError }