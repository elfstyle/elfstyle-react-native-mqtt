import React from 'C:/Users/shiva/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react'
import { Text, TextInput, Switch, StyleSheet } from 'react-native'

export default class SettingInput extends React.Component {
    render() {

        switch (typeof (this.props.value)) {
            case 'boolean':
                return <Switch value={this.props.value} onValueChange={this.props.onChangeText} />;
                break;
            default:
                return (
                    <TextInput
                        style={styles.input}
                        value={this.props.value.toString()}
                        onChangeText={this.props.onChangeText}
                    />
                );
        }
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgb(254,255,254)',
        width: 200,
        height: 30,
        padding: 5,
        fontSize: 16,
        borderRadius: 4,
    },
});
