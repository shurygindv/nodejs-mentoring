import {R} from '@libs/ramda'
import { RequestHandler, NextFunction } from "express";

export const useAsync =
    (asyncCb: RequestHandler): RequestHandler =>
        (...args): Promise<unknown> => {
            return asyncCb(...args)
                .catch(R.last(args) as NextFunction);
        }