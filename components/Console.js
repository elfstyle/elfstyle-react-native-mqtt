import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements'

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
                        <Card title="Console">
                            <FlatList
                                data={state.console}
                                renderItem={({ item }) => <ListItem
                                    title={item.title}
                                    subtitle={item.message}
                                />}
                                keyExtractor={(item, index) => item.id.toString()}
                            />
                            <Text>{JSON.stringify(state.console)}</Text>
                        </Card>
                    )
                }}
            </Consumer>
        );
    }
}

/*
title={item.title}
                                            subtitle={item.message}

                                            */