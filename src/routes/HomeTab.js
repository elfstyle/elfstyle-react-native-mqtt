import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'

import {
    CommunicationScreen, 
    NodesScreen, 
    ConsoleScreen,
} from '../screens'

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
                backgroundColor: 'black',
                height: 40,
            },
        },
    }
);

export default HomeTab;