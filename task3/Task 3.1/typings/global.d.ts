
export declare global {
    export namespace $APIHelpers {
        type Nope = null;
    
        export interface Response<T = Nope> {
            Data: MaybeNull<T>;
            Success: true;
            ErrorDescription: Nope;
            ErrorCode: Nope;
        }    
    
        export interface FailureResponse {
            Success: false;
            ErrorDescription: string;
            ErrorCode: number;
        }
    }
    
    export namespace $UtilityTypes {
        export type MaybeNull<T> = T | Nope;
        export type MaybeUndefined<T> = T | undefined;
    }
}