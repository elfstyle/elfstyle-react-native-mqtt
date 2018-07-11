import React from 'C:/Users/shiva/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react'
import { View, Keyboard } from 'react-native'

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            marginBottom: 0,
        }
    }

    componentDidMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardDidShow = (event) => {
        this.setState({ marginBottom: event.endCoordinates.height });
    }

    keyboardDidHide = (event) => {
        this.setState({ marginBottom: 0 });
    }

    render() {
        return (
            <View style={{ marginBottom: this.state.marginBottom }}>
                {this.props.children}
            </View>
        );
    }
}

