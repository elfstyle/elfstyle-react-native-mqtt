import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, FlatList, TextInput, Switch, ScrollView } from 'react-native'
import { Divider, Button } from 'react-native-elements'
import SettingInput from '../components/SettingInput'
import ViewWithKeyboard from '../components/ViewWithKeyboard'
import { configSave } from '../store/actions/config'

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
            config: { ...this.props.config },
        }
    }

    componentDidMount() {
        //pass handleSave func to static method navigationOptions
        this.props.navigation.setParams({ handleSave: this.handleSave });
    }

    //handle press on Save Button
    handleSave = () => {
       this.props.configSave(this.state.config);
    }

    render() {

        const configKeys = Object.keys(this.state.config);

        return (
            <ViewWithKeyboard>
                <FlatList
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
                />
            </ViewWithKeyboard>
        )
    }
}

const mapStateToProps = state => {
    return {
        config: state.config,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        configSave: (config) => dispatch(configSave(config)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

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
