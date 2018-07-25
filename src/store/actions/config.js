import { CONFIG_SET } from '../types'
import DefaultConfig from '../../classes/Config'
import { AsyncStorage } from 'react-native';

export const configSet = (config) => {
    return {
        type: CONFIG_SET,
        payload: config
    }
}

export const configLoad = () => dispatch => {
    const defaultConfig = new DefaultConfig();
    AsyncStorage.getItem('Config')
        .then(storedConfigString => {

            if (storedConfigString) {
                storedConfig = JSON.parse(storedConfigString);
            }
            let currentConfig = Object.assign(defaultConfig, storedConfig);

            dispatch(configSet(currentConfig));
        })
        .catch(() => dispatch(configSet(defaultConfig)));
}

export const configSave = (config) => dispatch => {
    const defaultConfig = new DefaultConfig();
    AsyncStorage.setItem('Config', JSON.stringify(config))
        .then(() => {
            dispatch(configSet(config));
        })
        .catch(() => dispatch(configSet(config)));
}
