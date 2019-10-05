import * as express from 'express';
import {v4String} from 'uuid/interfaces';

export declare global {
    type guidV4 = string; //v4String;

    export namespace App {
        export interface Request<B = {}> extends express.Request {
            body: B;
        }

        export interface Response extends express.Response {}

        export interface IController extends interfaces.Controller {}
        export interface ICrudController<T> extends interfaces.Controller {
            create(...args: unknown[]): T;
            getById(id: string): T;
            getAll(): T[];
            updateById(id: string): T;
            deleteById(id: string): T;
        }

        export interface NextFn extends express.NextFunction {}
    }

    export namespace Api {
        type Nope = null;

        export interface Response<T = Nope> {
            Data: MaybeNull<>;
            Success: true;
            ErrorDescription: Nope;
            ErrorCode: Nope;
        }

        export interface FailureResponse {
            Success: false;
            ErrorDescription: string;
            ErrorCode: number;
        }

        export enum ErrorCode {
            AuthError = '0',
        }
    }

    export namespace TS {
        export type Class<T, Args = any[]> = {new (...args: Args): T};
        export type MaybeNull<T> = T | Nope;
        export type MaybeUndefined<T> = T | undefined;
    }
}
