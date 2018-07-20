import { elapsedTimeToString } from '.'
//calculation elpsed time from the last message for each Node 
calcElapsedTime = (nodes) => {
    const nodeKeys = Object.keys(nodes);
    const nodesElapsedTime = {};
    nodeKeys.forEach(nodeID => {
        try {
            const nodeMessageTime = new Date(nodes[nodeID].rxInfo[0].time);
            const timeDiff = Date.now() - nodeMessageTime.getTime();
            const timeDiffString = timeDiff > 0 ? elapsedTimeToString(timeDiff) : '';
            nodesElapsedTime[nodeID] = timeDiffString;
        }
        catch (e) { }
    });
    return nodesElapsedTime;
}

export default calcElapsedTime;