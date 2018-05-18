import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Card, ListItem, Divider } from 'react-native-elements'

import { Consumer } from '../ApplicationContext'

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Consumer>
                {({ state }) => {
                    return (
                        <FlatList
                            data={state.console}
                            renderItem={({ item }) => (
                                <View style={styles.record}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.message}>{item.message}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => item.id.toString()}
                        />
                    )
                }}
            </Consumer>
        );
    }
}

const styles = StyleSheet.create({
    record: {
        backgroundColor: 'rgb(251,253,254)',
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#d6d7da',
        margin: 5,
        padding: 5
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 5
    },
    message: {
        color: 'gray',
        fontSize: 10
    },
});
