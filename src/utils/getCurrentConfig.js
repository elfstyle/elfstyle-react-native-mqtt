import { AsyncStorage } from 'react-native';
import DefaultConfig from '../classes/Config'
import { debugLog } from '../utils'

//tries to receive current config from AsyncStorage and combine it with 
//default config object
function getCurrentConfig() {
    return new Promise((resolve, reject) => {
        debugLog('getCurrentConfig');
        //default configuration
        let defaultConfig = new DefaultConfig();

        let storedConfig = {};

        try {
            const storedConfigString = AsyncStorage.getItem('Config');
            if (storedConfigString) {
                storedConfig = JSON.parse(storedConfigString);
            }
        } catch (error) {
            resolve(defaultConfig);
        }

        let currentConfig = Object.assign(defaultConfig, storedConfig);

        resolve(currentConfig);
    });
}

export default getCurrentConfig;