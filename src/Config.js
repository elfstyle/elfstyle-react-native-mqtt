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
    }
}