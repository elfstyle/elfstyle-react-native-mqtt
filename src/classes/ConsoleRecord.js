export default class ConsoleRecord {
    static currentId = 0;
    constructor(title, message = '') {
        ConsoleRecord.currentId++;
        this.id = ConsoleRecord.currentId;
        this.title = title;
        this.body = message;
        this.dateTime = new Date();
    }
}