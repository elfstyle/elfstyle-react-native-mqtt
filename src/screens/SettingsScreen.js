import React from 'react'
import { View, StyleSheet, Text, FlatList, TextInput, Switch, ScrollView } from 'react-native'
import { Divider, Button } from 'react-native-elements'
import { Consumer } from '../ApplicationContext'
import SettingInput from '../components/SettingInput'
import ViewWithKeyboard from '../components/ViewWithKeyboard'


class SettingsScreen extends React.Component {
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
                        // //if this code is running first time, then init config state from context
                        // if (!this.state.config) {
                        //     this.state.config = state.currentConfig;
                        // }

                        // //attach saveConfig function to Settings screen
                        // this.saveConfig = actions.saveConfig;

                        // const configKeys = Object.keys(this.state.config);

                        return (
                            <ViewWithKeyboard>
                                <Text>SettingsScreen</Text>
                                {/* <FlatList
                                    data={configKeys}
                                    renderItem={({ item }) => (
                                        <View style={styles.row}>
                                            <Text style={styles.label}>{item}</Text>
                                            <SettingInput
                                                value={this.state.config[item]}
                                                onChangeText={
                                                    (newValue) => {
                                                        let newConfig = Object.assign({}, this.state.config);
                                                        newConfig[item] = newValue;
                                                        this.setState({ config: newConfig });
                                                    }
                                                } />
                                        </View>
                                    )}
                                    keyExtractor={item => item}
                                    ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'lightgray', width: StyleSheet.hairlineWidth }} />}
                                /> */}
                            </ViewWithKeyboard>
                        )
                    }
                }
            </Consumer>
        );
    }
}

export default SettingsScreen;

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgb(251,253,254)',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    label: {
        color: 'darkgrey',
        fontSize: 14,
    }
});
