import { AsyncStorage } from 'react-native';
import DefaultConfig from '../classes/Config'
import { debugLog } from '../utils'

//tries to receive current config from AsyncStorage and combine it with 
//default config object

function getCurrentConfig() {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('Config')
            .then(storedConfigString => {

                if (storedConfigString) {
                    storedConfig = JSON.parse(storedConfigString);
                }
                let currentConfig = Object.assign(new DefaultConfig(), storedConfig);

                resolve(currentConfig);
            })
            .catch(() => resolve(new DefaultConfig()));
    });
}

export default getCurrentConfig;