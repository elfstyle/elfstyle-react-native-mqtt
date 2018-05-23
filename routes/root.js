import React from 'react'
import { createStackNavigator, createMaterialTopTabNavigator, createDrawerNavigator } from 'react-navigation'
import { Button, Icon } from 'react-native-elements'

import SettingsScreen from '../screens/SettingsScreen'
import CommunicationScreen from '../screens/CommunicationScreen'
import MQTTClientsScreen from '../screens/MQTTClientsScreen'
import GatewaysScreen from '../screens/GatewaysScreen'
import NodesScreen from '../screens/NodesScreen'
import ConsoleScreen from '../screens/ConsoleScreen'
import SettingsButton from '../components/SettingsButton'
import HamburgerButton from '../components/HamburgerButton'

const HomeTab = createMaterialTopTabNavigator(
    {
        Communication: {
            screen: CommunicationScreen
        },

        Nodes: {
            screen: NodesScreen
        },

        Console: {
            screen: ConsoleScreen
        }
    },
    {
        initialRouteName: 'Nodes',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: "white",
            inactiveTintColor: "gray",
            scrollEnabled: true,
            labelStyle: {
                fontSize: 10,
            },
            tabStyle: {
                paddingTop: 0,
                marginTop: 0,
            },
            style: {
                backgroundColor: 'black',
                height: 30,
            },
        },
    }
);

const HomeStack = createStackNavigator(
    {
        HomeTab: {
            screen: HomeTab,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <HamburgerButton navigation={navigation} />,
                headerRight: <SettingsButton navigation={navigation} />,
    
            })
    
        },
        NodeDetails: {
            screen: HomeTab,
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

const SettingsStack = createStackNavigator(
    {
        SettingsStack: {
            screen: SettingsScreen,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <HamburgerButton navigation={navigation} />,
            })
        },
    }
)

const Drawer = createDrawerNavigator(
    {
        Home: HomeStack,
    }
)
export default Drawer;
