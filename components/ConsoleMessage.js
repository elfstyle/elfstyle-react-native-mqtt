import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Badge } from 'react-native-elements'

export default class extends React.PureComponent {
    render() {
        const { dateTime, title, body } = this.props.message;
        const dateTimeString = dateTime.toISOString().replace(/[A-Z]/g, " ");
        return (

            <React.Fragment>
                <Text style={styles.date}>{dateTimeString}</Text>
                <View style={styles.record}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{body}</Text>
                </View>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    record: {
        backgroundColor: 'rgb(251,253,254)',
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(239,221,222,0.7)',
        margin: 5,
        padding: 5
    },
    date: {
        textAlign:'right',
        color: 'black',       
        fontSize: 12,
        marginTop: 5
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5
    },
    message: {
        color: 'gray',
        fontSize: 12
    },
});
