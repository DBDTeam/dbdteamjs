export interface SnowflakeInformation {
    stamp: number;
    unix: number;
    date: Date;
}
/**
 * Interface for fetching members with limit and after parameters.
 */
export interface FetchWithLimitAndAfter {
    limit?: number;
    after?: number;
}
/**
 * Interface for fetching members with limit, after, and before parameters.
 */
export interface FetchWithLimitAfterAndBefore extends FetchWithLimitAndAfter {
    before?: string;
}
