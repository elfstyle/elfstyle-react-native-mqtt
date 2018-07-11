import React from 'C:/Users/shiva/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react'
import { createStackNavigator, createMaterialTopTabNavigator, createDrawerNavigator } from 'C:/Users/shiva/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-navigation'

import SettingsScreen from '../screens/SettingsScreen'
import CommunicationScreen from '../screens/CommunicationScreen'
import NodesScreen from '../screens/NodesScreen'
import NodeParameterDetailsScreen from '../screens/NodeParameterDetailsScreen'
import NodeDetailsScreen from '../screens/NodeDetailsScreen'
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
                fontSize: 13,
                fontWeight: 'bold',
            },
            tabStyle: {
                paddingTop: 5,
                marginTop: 0,
            },
            style: {
                backgroundColor: 'rgb(26,82,118)',
                height: 40,
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
