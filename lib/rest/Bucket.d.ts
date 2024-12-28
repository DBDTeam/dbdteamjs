/**
 * A class representing a rate limiting bucket.
 * This class simulates a rate limiting mechanism by limiting the number of requests that can be made within a certain time frame.
 */
export declare class Bucket {
    /**
     * The maximum number of requests allowed within a certain time frame.
     */
    private limit;
    /**
     * The remaining number of requests that can be made before reaching the limit.
     */
    private remaining;
    /**
     * The timestamp at which the remaining requests will be reset.
     */
    private resetTime;
    /**
     * An array of functions representing the requests that are waiting to be processed.
     */
    private queue;
    /**
     * A boolean flag indicating whether the queue is currently being processed.
     */
    private processing;
    /**
     * Initializes a new instance of the Bucket class with the given limit.
     * @param limit The maximum number of requests allowed within a certain time frame.
     */
    constructor(limit: number);
    /**
     * Adds a new request function to the queue and starts processing the queue if it's not already being processed.
     * @param fn The function representing the request to be added to the queue.
     */
    addRequest(fn: () => void): void;
    /**
     * Processes the queue by executing requests at a fixed interval.
     * If there are remaining requests and the queue is not empty, it dequeues a request, decrements the remaining count, and executes the request.
     * If the queue is empty or the current timestamp is greater than or equal to the reset time, it clears the interval and resets the bucket.
     */
    private processQueue;
    /**
     * Resets the bucket by setting the remaining count to the limit, updating the reset time to the current timestamp plus one second, and setting the processing flag to false.
     */
    private reset;
}
