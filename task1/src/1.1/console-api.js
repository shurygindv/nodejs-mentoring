const DATA = 'data';

export class ConsoleApi {
    async read (callback) {
        return new Promise(resolver => process.stdin.once(resolver));
    }

    write(message, separator = '\n') {
        process.stdout.write(`${message}${separator}`); // analogue as console.log
    }

    listenStdin(listener) {
        process.stdin.on(DATA, listener);
    }

    listenStdinOnce(listener) {
        process.stdin.once(DATA, listener);
    }
}