import React from 'react'
import { View, StyleSheet, Text, FlatList, TextInput } from 'react-native'
import { Button, Icon, Divider, FormLabel, FormValidationMessage, FormInput } from 'react-native-elements'
import { Consumer } from '../ApplicationContext'

export default class extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            title: 'Settings',
            headerRight: <Button title='Save' onPress={params.handleSave} />
        };
    };
    
    constructor(props) {
        super(props)

        this.state = {
            config: null,
        }
    }

    componentDidMount() {
        //pass handleSave func to static method navigationOptions
        this.props.navigation.setParams({ handleSave: this.handleSave });
    }

    //handle press on Save Button
    handleSave = () => {
        if (this.saveConfig)
            this.saveConfig(this.state.config);
    }

    render() {
        return (
            <Consumer>
                {
                    ({ state, actions }) => {
                        //if this code is running first time, then init config state from context
                        if (!this.state.config) {
                            this.state.config = state.currentConfig;
                        }

                        //attach saveConfig function to Settings screen
                        this.saveConfig = actions.saveConfig;

                        const configKeys = Object.keys(this.state.config);

                        return (
                            <React.Fragment>
                                <FlatList
                                    data={configKeys}

                                    renderItem={({ item }) => (
                                        <React.Fragment>
                                            <Text>{item}</Text>
                                            <TextInput
                                                value={JSON.stringify(this.state.config[item])}
                                            />
                                        </React.Fragment>
                                    )}
                                    keyExtractor={item => item}
                                />
                                <Text>{JSON.stringify(this.state)}</Text>
                            </React.Fragment>
                        )
                    }
                }
            </Consumer>
        );
    }
}
