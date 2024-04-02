export enum Methods {
    get = "GET",
    post = "POST",
    delete = "DELETE",
    patch = "PATCH",
    put = "PUT",
  }
  
  export interface ResponseFromApi {
    data?: Record<any, any>;
    status: number;
    error: boolean;
  }
  
  export interface ErrorResponseFromApi extends ResponseFromApi {
    d?: Record<string, any>;
    shard: number | string | undefined | null;
    type: string;
    time: number;
  }