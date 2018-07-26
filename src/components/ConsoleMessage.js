import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Animated,
} from 'react-native'

class ConsoleMessage extends Component {
    constructor(props) {
        super(props)

        this.fadeAnim = new Animated.Value(1);
    }

    componentDidMount() {
        Animated.timing(
            this.fadeAnim,
            {
                toValue: 0.5,
                duration: 15000,
            }
        ).start();
    }

    render() {
        const { dateTime, title, body } = this.props.message;
        const dateTimeString = dateTime.toISOString().replace(/[A-Z]/g, " ");

        return (
            <Animated.View
                style={{
                    opacity: this.fadeAnim,
                }}>

                <Text style={styles.date}>{dateTimeString}</Text>
                <View style={styles.record}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{body}</Text>
                </View>

            </Animated.View>
        )
    }
}

export default ConsoleMessage;

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
        textAlign: 'right',
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
