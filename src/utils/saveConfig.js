import { AsyncStorage } from 'react-native';

//tries to save current config to AsyncStorage
function saveConfig(config) {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.setItem('Config', JSON.stringify(config));
            resolve(config);
        } catch (error) {
            reject(defaultConfig);
        }
    });
}

export default saveConfig;