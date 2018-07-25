import {
    debugLog,
    consoleLog,
} from '.'

//called when the connect request has failed or timed out. A single response object parameter is passed to the onFailure callback containing the following fields:
//      invocationContext as passed in to the onFailure method in the connectOptions.
//      errorCode a number indicating the nature of the error.
//      errorMessage text describing the error.
handleOnFailure = responseObject => {
    debugLog('handleOnFailure', responseObject.errorMessage);
    consoleLog('Failure', responseObject.errorMessage);
};

export default handleOnFailure;