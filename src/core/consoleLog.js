import ConsoleRecord from '../classes/ConsoleRecord';
import { consoleAddRecord } from '../store/actions/console'
import store from '../store'

// writes message to console array
consoleLog = (title, message = "") => {
    const newRecord = new ConsoleRecord(title, message);
    store.dispatch(consoleAddRecord(newRecord));
    console.log(`${title} - ${message}`);
}

export default consoleLog;