export default function nodesLib({
    nodes = {},
    nodeDetails = {}
}) {

    let getNodesDevEUIArray = () => {
        return Object.keys(nodes);
    }

    let getDeviceName = (devEUI) => {
        let deviceName = '';
        try {
            if (devEUI in nodeDetails) {
                deviceName = nodeDetails[devEUI].deviceName;
            }
            else if (devEUI in nodes) {
                deviceName = nodes[devEUI].deviceName;
            }
        }
        catch (e) { }
        return deviceName;
    }

    let getParameters = (devEUI) => {
        let parameters = [];
        try {
            if (devEUI in nodes) {
                parameters = Object.keys(nodes[devEUI].object);
            }
        }
        catch (e) { }
        return parameters;
    }

    let getParameterName = (devEUI, parameter) => {
        let parameterName = parameter;
        try {
            parameterName = nodeDetails[devEUI].config[parameter].name;
        }
        catch (e) { }
        return parameterName;
    }

    let getParameterValueRaw = (devEUI, parameter) => {
        try {
            return nodes[devEUI].object[parameter];
        }
        catch (e) { }
        return null;
    }

    //returns string representation of the parameter value or empty string if parameter is undefined
    let getParameterValue = (devEUI, parameter) => {
        let parameterValue = '';
        try {
            value = nodes[devEUI].object[parameter];
            try {
                const parameterConfig = nodeDetails[devEUI].config[parameter];
                switch (parameterConfig.type) {
                    case 'boolean':
                        value = value ? parameterConfig.states[1] : parameterConfig.states[0];
                        break;
                    case 'number':
                        value = value.toString();
                        break;
                }
            }
            catch (e) { }
            parameterValue = value.toString();
        }
        catch (e) { }
        return parameterValue;
    }

    let getParameterUnits = (devEUI, parameter) => {
        let parameterUnits;
        try {
            parameterUnits = nodeDetails[devEUI].config[parameter].units;
        }
        catch (e) { }
        return parameterUnits;
    }

    let getNodes = () => {
        let nodes = [];
        try {
            nodes = Object.keys(nodes);
        }
        catch (e) { }
        return nodes;
    }

    let getNodeObject = (devEUI) => {
        let node = {};
        try {
            node = nodes[devEUI];
        }
        catch (e) { }
        return node;
    }

    let getParameterControlEnabled = (devEUI, parameter) => {
        let enabled = false;
        try {
            if (parameter in nodeDetails[devEUI].control) {
                enabled = true;
            }
        }
        catch (e) { }
        return enabled;
    }

    let getParameterControlStates = (devEUI, parameter) => {
        let controlStates = ['Off', 'On'];
        try {
            controlStates = nodeDetails[devEUI].control[parameter];
        }
        catch (e) { }
        return controlStates;
    }

    return {
        getNodesDevEUIArray,
        getDeviceName,
        getParameters,
        getParameterName,
        getParameterValueRaw,
        getParameterValue,
        getParameterUnits,
        getNodes,
        getNodeObject,
        getParameterControlEnabled,
        getParameterControlStates,
    };
}