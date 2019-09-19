
enum ProcessExceptions {
    UncaughtException = "uncaughtException",
    UnhandledRejection = "unhandledRejection",
    RejectionHandled = "rejectionHandled",
    Warning = "warning",
}

export default class Process {
    static listenUncaughtExceptions (fn: NodeJS.UncaughtExceptionListener): void {
        process.on(ProcessExceptions.UncaughtException, fn);
    }

    static listenUncaughtRejections (fn: NodeJS.UnhandledRejectionListener): void {
        process.on(ProcessExceptions.UnhandledRejection, fn);
    }

    static listenRejectionHandled (fn: NodeJS.RejectionHandledListener): void {
        process.on(ProcessExceptions.RejectionHandled, fn);
    }

    static listenWarnings (fn: NodeJS.WarningListener): void {
        process.on(ProcessExceptions.Warning, fn);
    }

    static exit (code?: number): void {
        process.exit(code);
    }
}
