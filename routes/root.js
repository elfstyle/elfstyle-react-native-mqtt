import { createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import MQTTClientsScreen from '../screens/MQTTClientsScreen'
import GatewaysScreen from '../screens/GatewaysScreen'
import NodesScreen from '../screens/NodesScreen'
import ConsoleScreen from '../screens/ConsoleScreen'

export default createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },

        MQTTClients: {
            screen: MQTTClientsScreen
        },

        Gateways: {
            screen: GatewaysScreen
        },

        Nodes: {
            screen: NodesScreen
        },

        Console: {
            screen: ConsoleScreen
        }
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);
