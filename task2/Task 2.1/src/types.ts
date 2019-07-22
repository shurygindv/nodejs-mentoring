export type MaybeNull<T> = T | null;

export type MaybeUndefined<T> = T | undefined;

export interface ResponseResult<T = null> {
    Data: MaybeNull<T>;
    Success: boolean;
    ErrorDescription: MaybeNull<string>;
    ErrorCode: MaybeNull<number>;
}