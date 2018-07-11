import { SET_CONFIG, GET_CONFIG } from './types'
import { AsyncStorage } from 'react-native';

export const getConfig = () => dispath => {

    let storedConfig = {};
    // try {
    //     const storedConfigString = await AsyncStorage.getItem('Config');
    //     if (storedConfigString) {
    //         storedConfig = JSON.parse(storedConfigString);
    //     }
    // } catch (error) {
    //     this.consoleLog('Could not find stored config',
    //         `Client will use default values for connect:  ${JSON.stringify(defaultConfig)}`);
    // }

    dispatch(
        {
            type: GET_CONFIG,
            payload: {}
        }
    );

}
