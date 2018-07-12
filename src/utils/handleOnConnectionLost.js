import { debugLog } from '../utils'

//fires when Connection lost
handleOnConnectionLost = responseObject => {
    debugLog('handleOnConnectionLost');
    // this.setState({ connected: false });
    // this.consoleLog("Disconnected", responseObject.errorMessage);
};

export default handleOnConnectionLost;

