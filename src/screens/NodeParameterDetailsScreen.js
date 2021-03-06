import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import NodeParameterControl from '../components/NodeParameterControl'
import nodesLib from '../core/nodesLib'

class NodeParameterDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const deviceName = navigation.getParam('deviceName', '');
        const parameterName = navigation.getParam('parameterName', '');
        return {
            title: `${deviceName}: ${parameterName}`,
        };
    };

    render() {
        const devEUI = this.props.navigation.getParam('devEUI', '');
        const parameter = this.props.navigation.getParam('parameter', '');

        const {
            getDeviceName,
            getParameterName,
            getParameterValue,
            getParameterUnits,
            getParameterControlEnabled,
        } = nodesLib({ nodes: this.props.nodes, nodeDetails: this.props.nodeDetails });

        const nodeElapsedTime = this.props.nodesElapsedTime[devEUI] || '';

        const deviceName = getDeviceName(devEUI);
        const parameterName = getParameterName(devEUI, parameter);
        const parameterValue = getParameterValue(devEUI, parameter);
        const parameterUnits = getParameterUnits(devEUI, parameter);

        const controlComponent = getParameterControlEnabled(devEUI, parameter) ?
            <NodeParameterControl devEUI={devEUI} parameter={parameter} />
            :
            null;

        return (
            <React.Fragment>
                <View style={styles.Container}>
                    <View>
                        <Text style={styles.elapsedTime}>{nodeElapsedTime}</Text>
                    </View>
                    <View>
                        <Text style={styles.value}>
                            {parameterValue}
                            <Text style={styles.parameterUnit}>
                                {parameterUnits}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>Device name:</Text>
                        <Text style={styles.description}>{deviceName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>Parameter:</Text>
                        <Text style={styles.description}>{parameterName}</Text>
                    </View>
                </View>
                {controlComponent}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        nodes: state.nodes,
        nodeDetails: state.nodeDetails,
        nodesElapsedTime: state.nodesElapsedTime,
    }
};

export default connect(mapStateToProps, null)(withNavigation(NodeParameterDetailsScreen));

const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'white',
        padding: 4,
        margin: 4,
        borderRadius: 10,
        elevation: 1,
    },
    elapsedTime: {
        color: 'gray',
        fontSize: 12,
        textAlign: 'right',
        paddingHorizontal: 5,
        height: 20,
    },
    value: {
        color: 'black',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    parameterUnit: {
        color: 'lightgrey',
        fontSize: 24,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    title: {
        color: 'gray',
        fontSize: 14,
        textAlign: 'right',
        width: '50%',
        padding: 5,
    },
    description: {
        color: 'black',
        fontSize: 18,
        textAlign: 'left',
        padding: 5,
    },

});
