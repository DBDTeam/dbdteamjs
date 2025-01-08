export class Bucket {
  private limit: number;
  private remaining: number;
  private resetTime: number;
  private queue: Array<() => void>;
  private processing: boolean;

  constructor(limit: number) {
    this.limit = limit;
    this.remaining = limit;
    this.resetTime = Date.now() + 1000;
    this.queue = [];
    this.processing = false;
  }

  public addRequest(fn: () => void) {
    this.queue.push(fn);
    this.processQueue();
  }

  private async processQueue() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      if (this.remaining <= 0) {
        await this.waitUntilReset();
      }

      const nextRequest = this.queue.shift();
      if (nextRequest) {
        this.remaining--;
        nextRequest();
      }
    }

    this.processing = false;
  }

  private waitUntilReset(): Promise<void> {
    const delay = this.resetTime - Date.now();
    return new Promise((resolve) => {
      setTimeout(() => {
        this.reset();
        resolve();
      }, Math.max(delay, 0));
    });
  }

  private reset() {
    this.remaining = this.limit;
    this.resetTime = Date.now() + 1000;
  }
}
