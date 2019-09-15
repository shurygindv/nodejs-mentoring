const ERROR_NAME = 'CustomError';

class CustomError extends Error {
    protected description?: string;

    public constructor (message?: string) {
        super(message);

        this.name = ERROR_NAME;

        Error.captureStackTrace(this, this.constructor);
    }
}

// not used yet
const generateCustomErrorClass = (token: string, desc?: string) => 
    class extends CustomError {
        constructor (message: string) {
            super(message);

            this.name = token;
            this.description = desc;
        }
}

export {
    generateCustomErrorClass,
    CustomError
};