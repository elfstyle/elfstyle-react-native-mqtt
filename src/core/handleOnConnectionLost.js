import {
    debugLog,
    consoleLog,
} from '.'

//fires when Connection lost
handleOnConnectionLost = responseObject => {
    debugLog('handleOnConnectionLost', responseObject.errorMessage);
    consoleLog('Connection Lost', responseObject.errorMessage);
};

export default handleOnConnectionLost;

