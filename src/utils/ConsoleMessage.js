export default class ConsoleMessage {
    static currentId = 0;
    constructor(title, message = '') {
        ConsoleMessage.currentId++;
        this.id = ConsoleMessage.currentId;
        this.title = title;
        this.body = message;
        this.dateTime = new Date();
    }
}
