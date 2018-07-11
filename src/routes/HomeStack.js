import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HomeTab from './HomeTab'

import {
    SettingsScreen,
    NodeParameterDetailsScreen,
    NodeDetailsScreen,
} from '../screens'

import SettingsButton from '../components/SettingsButton'
import HamburgerButton from '../components/HamburgerButton'

const HomeStack = createStackNavigator(
    {
        HomeTab: {
            screen: HomeTab,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <HamburgerButton navigation={navigation} />,
                headerRight: <SettingsButton navigation={navigation} />,
            })
        },
        NodeParameterDetails: {
            screen: NodeParameterDetailsScreen,
        },
        NodeDetails: {
            screen: NodeDetailsScreen,
        },
        ClientDetails: {
            screen: HomeTab,
        },
        GatewayDetails: {
            screen: HomeTab,
        },
        Settings: {
            screen: SettingsScreen,
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            title: 'Elfstyle MQTT Client',
        })
    }
)

export default HomeStack;