import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { SearchBar } from 'react-native-elements'
import ConsoleMessage from './ConsoleMessage'

import { Consumer } from '../ApplicationContext'

export default class extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            search: ''
        }
    }

    render() {
        return (
            <Consumer>
                {({ state }) => {
                    return (
                        <React.Fragment>
                            <SearchBar
                                lightTheme
                                onChangeText={(e) => { this.setState({ search: e }) }}
                                onClearText={() => { this.setState({ search: '' }) }}
                                icon={{ type: 'font-awesome', name: 'search' }}
                                clearIcon={{ type: 'font-awesome', name: 'times' }}
                                placeholder='Type Here...' />
                            <FlatList
                                data={state.console.filter(
                                    (message)=>{
                                        return JSON.stringify(message).toUpperCase().includes(this.state.search.toUpperCase())
                                    }
                                )}
                                renderItem={({ item }) => (
                                    <ConsoleMessage message={item} />
                                )}
                                keyExtractor={(item, index) => item.id.toString()}
                            />
                        </React.Fragment>
                    )
                }}
            </Consumer>
        );
    }
}