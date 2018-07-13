//calculation elpsed time from the last message for each Node 
calcElapsedTime = () => {
    const nodeKeys = Object.keys(this.state.nodes);
    nodeKeys.forEach(nodeID => {
        try {
            const nodeMessageTime = new Date(this.state.nodes[nodeID].rxInfo[0].time);
            const timeDiff = Date.now() - nodeMessageTime.getTime();
            const timeDiffString = timeDiff > 0 ? elapsedTimeToString(timeDiff) : '';
            const newNodesElapsedTime = Object.assign({}, this.state.nodesElapsedTime);
            newNodesElapsedTime[nodeID] = timeDiffString;
            this.setState({ nodesElapsedTime: newNodesElapsedTime });
        }
        catch (e) {

        }
    });
}

export default calcElapsedTime;