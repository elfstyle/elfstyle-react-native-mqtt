import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation';
import JSONTree from 'react-native-json-tree'
import nodesLib from '../core/nodesLib'

class NodeDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const deviceName = navigation.getParam('deviceName', '');
        return {
            title: `${deviceName}`,
        };
    };

    render() {
        const devEUI = this.props.navigation.getParam('devEUI', '');
        
        const { getNodeObject } = nodesLib({ nodes: this.props.nodes });

        return (
            <ScrollView>
                <JSONTree data={getNodeObject(devEUI)} theme={theme} isLightTheme={false} />
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        nodes: state.nodes,
    }
};

export default connect(mapStateToProps, null)(withNavigation(NodeDetailsScreen));

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
};
