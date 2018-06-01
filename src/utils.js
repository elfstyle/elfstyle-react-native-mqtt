elapsedTimeToString = (ms) => {
    try {
        const sec = Math.floor(ms / 1000);
        // Calculate the number of days left
        const hours = Math.floor(sec / 3600)
        // After days and hours , how many minutes are left
        const minutes = Math.floor((sec - (hours * 3600)) / 60)
        // Finally how many seconds left after removing days, hours and minutes.
        const secs = Math.floor((sec - (hours * 3600) - (minutes * 60)))

        return `${hours}:${minutes > 9 ? minutes : '0' + minutes}:${secs > 9 ? secs : '0' + secs}`;
    }
    catch (e) {
        return `oops`;
    }
}

export {
    elapsedTimeToString
}