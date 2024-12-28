import { ErrorEnum } from "./ErrorList";
import { ErrorMessages } from "./ErrorMessages";

class ClientError extends Error {
  public code: keyof typeof ErrorEnum;

  constructor(code: keyof typeof ErrorEnum, ...args: unknown[]) {
    const message = ClientError.formatMessage(code, args);
    super(message);
    this.code = code;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target); // Captura en la clase derivada
    }
  }

  static formatMessage(code: keyof typeof ErrorEnum, args: unknown[]): string {
    const msg = ErrorMessages[code];

    if (!msg) {
      throw new Error(`No message associated with error code: ${code}`);
    }

    if (typeof msg === "function") {
      return (msg as (...args: unknown[]) => string)(...args);
    }

    return msg;
  }

  get name() {
    return `ClientError [${this.code}]`;
  }
}

class ClientTypeError extends ClientError {
  get name() {
    return `ClientTypeError [${this.code}]`;
  }
}

class ClientRangeError extends ClientError {
  get name() {
    return `ClientRangeError [${this.code}]`;
  }
}

export { ClientError, ClientTypeError, ClientRangeError };
