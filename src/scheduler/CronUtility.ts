import exp from 'constants';

// cronTime string specify startTime of the cronJob
export function getCronTime(timestamp) {
    const date = new Date(timestamp);

    // Extract the year, month, day, hour, and minute values from the Date object
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Month is zero-indexed, so add 1
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();

    // Create the cronTime string using the extracted values
    return `${minute} ${hour} ${day} ${month} *`;
}
