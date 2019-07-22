
declare namespace Express {
    export interface Response<V> {
        context: {
            validated: V;
        };
    }
}