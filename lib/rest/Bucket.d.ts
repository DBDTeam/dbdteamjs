export declare class Bucket {
    private limit;
    private remaining;
    private resetTime;
    private queue;
    private processing;
    constructor(limit: number);
    addRequest(fn: () => void): void;
    private processQueue;
    private waitUntilReset;
    private reset;
}
