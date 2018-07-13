import ConsoleMessage from '../classes/ConsoleMessage';

// writes message to console array
consoleLog = (title, message = "") => {
    //const consoleDepth = 50;
    //this.setState({ console: [new ConsoleMessage(title, message), ...(this.state.console.slice(0, consoleDepth - 1))] });
    console.log(`${title} - ${message}`);
}

export default consoleLog;