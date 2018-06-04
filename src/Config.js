export default class Config {
    constructor() {
        this.hostA = '127.0.0.1';
        this.portA = '8083';
        this.hostB = '127.0.0.1';
        this.portB = '8083';
        this.userName = '';
        this.password = '';
        this.cleanSession = true;
        this.useSSL = false;
        this.reconnect = false;
        this.timeout = '10';
        this.keepAliveInterval = '60';
    }
}

/*
timeout	            number	    If the connect has not succeeded within this number of seconds, it is deemed to have failed. The default is 30 seconds.
userName	        string	    Authentication username for this connection.
password	        string	    Authentication password for this connection.
willMessage	        Paho.MQTT.Message	sent by the server when the client disconnects abnormally.
keepAliveInterval	number	    the server disconnects this client if there is no activity for this number of seconds. 
                                The default value of 60 seconds is assumed if not set.
cleanSession	    boolean	    if true(default) the client and server persistent state is deleted on successful connect.
useSSL	            boolean	    if present and true, use an SSL Websocket connection.
invocationContext	object	    passed to the onSuccess callback or onFailure callback.
onSuccess	        function	called when the connect acknowledgement has been received from the server. 
                                A single response object parameter is passed to the onSuccess callback containing the following fields:
                                invocationContext as passed in to the onSuccess method in the connectOptions.
onFailure	        function	called when the connect request has failed or timed out. A single response 
                                object parameter is passed to the onFailure callback containing the following fields:
                                invocationContext as passed in to the onFailure method in the connectOptions.
errorCode           number      indicating the nature of the error.
errorMessage        text        describing the error.
hosts	            array	    If present this contains either a set of hostnames or fully qualified WebSocket URIs 
                                (ws://iot.eclipse.org:80/ws), that are tried in order in place of the host and port paramater on the construtor. 
                                The hosts are tried one at at time in order until one of then succeeds.
ports	            array	    If present the set of ports matching the hosts. If hosts contains URIs, this property is not used.
reconnect	        boolean	    Sets whether the client will automatically attempt to reconnect to the server if the connection is lost.
                                If set to false, the client will not attempt to automatically reconnect to the server in the event that the connection is lost.
                                If set to true, in the event that the connection is lost, the client will attempt to reconnect to the server. 
                                It will initially wait 1 second before it attempts to reconnect, 
                                for every failed reconnect attempt, the delay will double until it is at 2 minutes at 
                                which point the delay will stay at 2 minutes.
mqttVersion	        number	    The version of MQTT to use to connect to the MQTT Broker.
                                3 - MQTT V3.1
                                4 - MQTT V3.1.1
mqttVersionExplicit	boolean	    If set to true, will force the connection to use the selected MQTT Version or will fail to connect.
uris	            array	    If present, should contain a list of fully qualified WebSocket uris 
                                (e.g. ws://iot.eclipse.org:80/ws), that are tried in order in place of the host and port 
                                parameter of the construtor. The uris are tried one at a time in order until one of them succeeds. 
                                Do not use this in conjunction with hosts as the hosts array will be 
                                converted to uris and will overwrite this property.
*/