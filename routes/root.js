import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import CommunicationScreen from '../screens/CommunicationScreen'
import MQTTClientsScreen from '../screens/MQTTClientsScreen'
import GatewaysScreen from '../screens/GatewaysScreen'
import NodesScreen from '../screens/NodesScreen'
import ConsoleScreen from '../screens/ConsoleScreen'

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

export default createStackNavigator(
    {
        Home: {
            screen: HomeTab,
            navigationOptions: {
                title: 'Elfstyle Mqtt Client',
            },
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
    }
)

