    //called when the connect request has failed or timed out. A single response object parameter is passed to the onFailure callback containing the following fields:
    //      invocationContext as passed in to the onFailure method in the connectOptions.
    //      errorCode a number indicating the nature of the error.
    //      errorMessage text describing the error.
    function handleOnFailure (object) {
        // this.consoleLog(
        //     "Connection failure",
        //     `
        //     ${JSON.stringify(this.state.currentConfig)}
            
        //     invocationContext: ${JSON.stringify(object.invocationContext)}
        //     errorCode: ${object.errorCode.toString()}
        //     errorMessage: ${object.errorMessage}           
        //     `
        // );
    };

    export default handleOnFailure;