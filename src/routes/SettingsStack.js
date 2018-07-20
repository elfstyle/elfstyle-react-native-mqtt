import React from 'react'
import { createStackNavigator } from 'react-navigation'

import {
    SettingsScreen, 
} from '../screens'

import HamburgerButton from '../components/HamburgerButton'

const SettingsStack = createStackNavigator(
    {
        SettingsStack: {
            screen: SettingsScreen,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <HamburgerButton navigation={navigation} />,
            })
        },
    }
);

export default SettingsStack;