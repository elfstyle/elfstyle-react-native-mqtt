import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ConsoleMessage from './ConsoleMessage'

import { Consumer } from '../ApplicationContext'

export default class extends React.PureComponent {

    render() {
        return (
            <Consumer>
                {({ state }) => {
                    return (
                        <FlatList
                            data={state.console}
                            renderItem={({ item }) => (
                                <ConsoleMessage message={item} />
                            )}
                            keyExtractor={(item, index) => item.id.toString()}
                        />
                    )
                }}
            </Consumer>
        );
    }
}