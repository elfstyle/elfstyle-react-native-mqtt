import React, { Component } from 'react'
import { Icon } from 'react-native-elements'

class HamburgerButton extends Component {
    render() {
        return (
            <Icon
                name='bars'
                type='font-awesome'
                color='rgb(100,100,100)'
                size={25}
                containerStyle={{ padding: 10 }}
                onPress={() => this.props.navigation.openDrawer()}
            />
        )
    }
}

export default HamburgerButton;