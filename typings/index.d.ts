export declare global {
   export type OmitInsert<T, K extends keyof T, I> = I extends [] ? Omit<T, K> & I[number] : Omit<T, K> & I;
   
}