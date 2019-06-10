const readline = require('readline');

const ConsoleApi = require('./console-api').ConsoleApi;

const consoleApi = new ConsoleApi();

const withReversedString = callback => input => callback((input || '').reverse());

const bePolite = () => consoleApi.write("Hello 😇")
const listenStdin = () => consoleApi.listenStdin(withReversedString(consoleApi.write));

const init = () => {
    bePolite();
    listenStdin();
}

init();
