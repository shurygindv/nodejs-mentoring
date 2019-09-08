import * as express from 'express';
import {
    interfaces,
} from 'inversify-express-utils';

export declare global {

    export namespace App {
        export interface Request extends express.Request {};
        export interface Response extends express.Response {};

        export interface IController extends interfaces.Controller {};
        export interface ICrudController<T> extends interfaces.Controller {
            create (...args: unknown[]): T;
            getById(id: string): T;
            getAll(): T[]
            updateById(id: string): T;
            deleteById(id: string): T;
        };

        export interface NextFn extends express.NextFunction {};
    }


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