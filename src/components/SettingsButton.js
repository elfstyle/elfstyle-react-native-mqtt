import React, { Component } from 'C:/Users/shiva/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react'
import { Button, Icon } from 'react-native-elements'
import { withNavigation } from 'C:/Users/shiva/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-navigation';

class SettingsButton extends Component {
    render() {
        return (
            <Icon
                name='cog'
                type='font-awesome'
                color='rgb(100,100,100)'
                size={25}
                containerStyle={{ padding: 10 }}
                onPress={() => this.props.navigation.navigate('Settings')}
            />
        )
    }
}

export default SettingsButton;