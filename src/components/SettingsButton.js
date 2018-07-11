import React, { Component } from 'react'
import { Icon } from 'react-native-elements'

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