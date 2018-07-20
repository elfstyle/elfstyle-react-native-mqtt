import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux'

import { SearchBar } from 'react-native-elements'
import ConsoleMessage from './ConsoleMessage'

class Console extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: ''
        }
    }

    render() {
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
                    removeClippedSubviews={true}
                    data={this.props.console.filter(
                        (message) => {
                            return JSON.stringify(message).toUpperCase().includes(this.state.search.toUpperCase())
                        }
                    )}
                    renderItem={({ item }) => (
                        <ConsoleMessage message={item} />
                    )}
                    keyExtractor={(item, index) => item.id.toString()}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        console: state.console,
    }
};

export default connect(mapStateToProps, null)(Console);